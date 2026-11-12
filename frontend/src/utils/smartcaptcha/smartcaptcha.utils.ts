import {
  SMARTCAPTCHA_CALLBACK_PREFIX,
  SMARTCAPTCHA_CHALLENGE_TIMEOUT_MS,
  SMARTCAPTCHA_LANGUAGE,
  SMARTCAPTCHA_LOAD_TIMEOUT_MS,
  SMARTCAPTCHA_MESSAGES,
  SMARTCAPTCHA_SCRIPT_URL,
} from './smartcaptcha.constants';
import { SmartCaptchaEvent } from './smartcaptcha.enums';
import { SmartCaptchaClientError } from './smartcaptcha.errors';
import type { ISmartCaptchaApi, TSmartCaptchaCallbackName } from './smartcaptcha.types';

let scriptPromise: Promise<ISmartCaptchaApi> | undefined;
let loadAttempt = 0;

/** Скрипт запрашивается только при отправке формы; параллельные формы ожидают общую загрузку. */
function loadSmartCaptcha(): Promise<ISmartCaptchaApi> {
  if (scriptPromise) return scriptPromise;
  if (window.smartCaptcha) return Promise.resolve(window.smartCaptcha);

  scriptPromise = new Promise<ISmartCaptchaApi>((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName: TSmartCaptchaCallbackName = `${SMARTCAPTCHA_CALLBACK_PREFIX}${++loadAttempt}`;
    const timeout = window.setTimeout(onLoadError, SMARTCAPTCHA_LOAD_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.onerror = null;
    }

    function onLoadError() {
      cleanup();
      script.remove();
      reject(new SmartCaptchaClientError(SMARTCAPTCHA_MESSAGES.unavailable));
    }

    function onLoad() {
      if (!window.smartCaptcha) return onLoadError();
      cleanup();
      resolve(window.smartCaptcha);
    }

    const scriptUrl = new URL(SMARTCAPTCHA_SCRIPT_URL);
    scriptUrl.searchParams.set('render', 'onload');
    scriptUrl.searchParams.set('onload', callbackName);

    window[callbackName] = onLoad;
    script.src = scriptUrl.href;
    script.async = true;
    script.onerror = onLoadError;
    document.head.append(script);
  }).catch((error: unknown) => {
    scriptPromise = undefined;
    throw error;
  });

  return scriptPromise;
}

/**
 * Получает свежий одноразовый токен и удаляет виджет при завершении, ошибке или отмене формы.
 * signal связан с жизненным циклом формы: после её размонтирования виджет создаваться не должен.
 */
export async function getSmartCaptchaToken(sitekey: string, signal: AbortSignal): Promise<string> {
  signal.throwIfAborted();
  if (!sitekey.trim()) throw new SmartCaptchaClientError(SMARTCAPTCHA_MESSAGES.notConfigured);

  const captcha = await loadSmartCaptcha();
  signal.throwIfAborted();

  const container = document.createElement('div');
  document.body.append(container);

  let widgetId: number | undefined;
  let timeout: number | undefined;
  let closeTimeout: number | undefined;
  let onAbort: (() => void) | undefined;
  const subscriptions: (() => void)[] = [];

  try {
    return await new Promise<string>((resolve, reject) => {
      function fail(message: string) {
        reject(new SmartCaptchaClientError(message));
      }

      function onSuccess(token: string) {
        if (!token) return fail(SMARTCAPTCHA_MESSAGES.incomplete);
        resolve(token);
      }

      function onVerificationError() {
        fail(SMARTCAPTCHA_MESSAGES.unavailable);
      }

      function onTokenExpired() {
        fail(SMARTCAPTCHA_MESSAGES.expired);
      }

      onAbort = () => reject(signal.reason);
      signal.addEventListener('abort', onAbort, { once: true });
      timeout = window.setTimeout(onTokenExpired, SMARTCAPTCHA_CHALLENGE_TIMEOUT_MS);

      const currentWidgetId = captcha.render(container, {
        sitekey,
        invisible: true,
        hl: SMARTCAPTCHA_LANGUAGE,
        callback: onSuccess,
      });
      widgetId = currentWidgetId;

      function onChallengeClosed() {
        // Закрытие задания может предшествовать обработчику успеха в той же очереди событий.
        window.clearTimeout(closeTimeout);
        closeTimeout = window.setTimeout(checkClosedChallenge, 0);
      }

      function checkClosedChallenge() {
        const token = captcha.getResponse(currentWidgetId);
        if (!token) return fail(SMARTCAPTCHA_MESSAGES.cancelled);
        onSuccess(token);
      }

      subscriptions.push(
        captcha.subscribe(currentWidgetId, SmartCaptchaEvent.NetworkError, onVerificationError),
        captcha.subscribe(currentWidgetId, SmartCaptchaEvent.JavascriptError, onVerificationError),
        captcha.subscribe(currentWidgetId, SmartCaptchaEvent.TokenExpired, onTokenExpired),
        captcha.subscribe(currentWidgetId, SmartCaptchaEvent.ChallengeHidden, onChallengeClosed),
      );

      captcha.execute(currentWidgetId);
    });
  } finally {
    window.clearTimeout(timeout);
    window.clearTimeout(closeTimeout);
    if (onAbort) {
      signal.removeEventListener('abort', onAbort);
    }
    for (const unsubscribe of subscriptions) {
      unsubscribe();
    }
    try {
      if (widgetId !== undefined) {
        captcha.destroy(widgetId);
      }
    } finally {
      container.remove();
    }
  }
}
