import { HttpStatus } from '../../constants/http.enums';
import {
  SMARTCAPTCHA_MESSAGES,
  SMARTCAPTCHA_NETWORK_ERROR_CODE_PATTERN,
  SMARTCAPTCHA_TIMEOUT_ERROR_NAME,
  SMARTCAPTCHA_VALIDATE_TIMEOUT_MS,
  SMARTCAPTCHA_VALIDATE_URL,
} from './smartcaptcha.constants';
import { SmartCaptchaErrorReason, SmartCaptchaStatus } from './smartcaptcha.enums';
import { SmartCaptchaError } from './smartcaptcha.errors';
import type { ISmartCaptchaConfig, ISmartCaptchaDiagnostics } from './smartcaptcha.types';

function createUnavailableError(diagnostics: ISmartCaptchaDiagnostics): SmartCaptchaError {
  return new SmartCaptchaError(HttpStatus.ServiceUnavailable, SMARTCAPTCHA_MESSAGES.unavailable, diagnostics);
}

/** В диагностику допускаются только системные коды соединения, без текста ошибки и данных запроса. */
function getNetworkErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object' || !('cause' in error)) return;

  const cause = error.cause;
  if (!cause || typeof cause !== 'object' || !('code' in cause) || typeof cause.code !== 'string') return;
  if (SMARTCAPTCHA_NETWORK_ERROR_CODE_PATTERN.test(cause.code)) return cause.code;
}

/**
 * Проверяет одноразовый токен до отправки письма. IP должен поступать из серверного контекста,
 * а список разрешённых хостов — из конфигурации Strapi, а не из тела запроса клиента.
 */
export async function verifySmartCaptcha(token: string, ip: string, config: ISmartCaptchaConfig) {
  const allowedHosts = config.allowedHosts.map((host) => host.trim().toLowerCase()).filter(Boolean);

  if (!config.secretKey) throw createUnavailableError({ reason: SmartCaptchaErrorReason.MissingSecretKey });
  if (!allowedHosts.length) throw createUnavailableError({ reason: SmartCaptchaErrorReason.MissingAllowedHosts });

  const startedAt = Date.now();
  let result: unknown;
  let upstreamStatus: number | undefined;

  try {
    const body = new URLSearchParams({ secret: config.secretKey, token });
    if (ip) {
      body.set('ip', ip);
    }

    const response = await fetch(SMARTCAPTCHA_VALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(SMARTCAPTCHA_VALIDATE_TIMEOUT_MS),
      redirect: 'error',
    });
    upstreamStatus = response.status;

    if (response.status !== HttpStatus.Ok) {
      throw createUnavailableError({
        reason: SmartCaptchaErrorReason.UnexpectedHttpStatus,
        upstreamStatus,
        elapsedMs: Date.now() - startedAt,
      });
    }
    result = await response.json();
  } catch (error) {
    if (error instanceof SmartCaptchaError) throw error;

    let reason = SmartCaptchaErrorReason.RequestFailed;
    if (error instanceof Error && error.name === SMARTCAPTCHA_TIMEOUT_ERROR_NAME) {
      reason = SmartCaptchaErrorReason.RequestTimeout;
    } else if (error instanceof SyntaxError) {
      reason = SmartCaptchaErrorReason.InvalidResponse;
    }

    // При сбое сети или API заявка не проходит без подтверждённой проверки.
    throw createUnavailableError({
      reason,
      upstreamStatus,
      elapsedMs: Date.now() - startedAt,
      networkCode: getNetworkErrorCode(error),
    });
  }

  if (!result || typeof result !== 'object' || !('status' in result)) {
    throw createUnavailableError({
      reason: SmartCaptchaErrorReason.InvalidResponse,
      upstreamStatus,
      elapsedMs: Date.now() - startedAt,
    });
  }

  if (result.status === SmartCaptchaStatus.Failed) {
    throw new SmartCaptchaError(HttpStatus.BadRequest, SMARTCAPTCHA_MESSAGES.failed);
  }

  if (result.status !== SmartCaptchaStatus.Ok) {
    throw createUnavailableError({
      reason: SmartCaptchaErrorReason.InvalidResponse,
      upstreamStatus,
      elapsedMs: Date.now() - startedAt,
    });
  }

  // Пустой host возможен и при блокировке облачного аккаунта, поэтому принимать его небезопасно.
  if (!('host' in result) || typeof result.host !== 'string' || !allowedHosts.includes(result.host.toLowerCase())) {
    throw new SmartCaptchaError(HttpStatus.BadRequest, SMARTCAPTCHA_MESSAGES.failed);
  }
}
