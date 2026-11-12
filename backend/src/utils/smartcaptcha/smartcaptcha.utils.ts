import { HttpStatus } from '../../constants/http.enums';
import {
  SMARTCAPTCHA_MESSAGES,
  SMARTCAPTCHA_VALIDATE_TIMEOUT_MS,
  SMARTCAPTCHA_VALIDATE_URL,
} from './smartcaptcha.constants';
import { SmartCaptchaStatus } from './smartcaptcha.enums';
import { SmartCaptchaError } from './smartcaptcha.errors';
import type { ISmartCaptchaConfig } from './smartcaptcha.types';

/**
 * Проверяет одноразовый токен до отправки письма. IP должен поступать из серверного контекста,
 * а список разрешённых хостов — из конфигурации Strapi, а не из тела запроса клиента.
 */
export async function verifySmartCaptcha(token: string, ip: string, config: ISmartCaptchaConfig) {
  const allowedHosts = config.allowedHosts.map((host) => host.trim().toLowerCase()).filter(Boolean);

  if (!config.secretKey || !allowedHosts.length) {
    throw new SmartCaptchaError(HttpStatus.ServiceUnavailable, SMARTCAPTCHA_MESSAGES.unavailable);
  }

  let result: unknown;

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

    if (response.status !== HttpStatus.Ok) {
      throw new SmartCaptchaError(HttpStatus.ServiceUnavailable, SMARTCAPTCHA_MESSAGES.unavailable);
    }
    result = await response.json();
  } catch {
    // При сбое сети или API заявка не проходит без подтверждённой проверки.
    throw new SmartCaptchaError(HttpStatus.ServiceUnavailable, SMARTCAPTCHA_MESSAGES.unavailable);
  }

  if (!result || typeof result !== 'object' || !('status' in result)) {
    throw new SmartCaptchaError(HttpStatus.ServiceUnavailable, SMARTCAPTCHA_MESSAGES.unavailable);
  }

  if (result.status === SmartCaptchaStatus.Failed) {
    throw new SmartCaptchaError(HttpStatus.BadRequest, SMARTCAPTCHA_MESSAGES.failed);
  }

  if (result.status !== SmartCaptchaStatus.Ok) {
    throw new SmartCaptchaError(HttpStatus.ServiceUnavailable, SMARTCAPTCHA_MESSAGES.unavailable);
  }

  // Пустой host возможен и при блокировке облачного аккаунта, поэтому принимать его небезопасно.
  if (!('host' in result) || typeof result.host !== 'string' || !allowedHosts.includes(result.host.toLowerCase())) {
    throw new SmartCaptchaError(HttpStatus.BadRequest, SMARTCAPTCHA_MESSAGES.failed);
  }
}
