export const SMARTCAPTCHA_VALIDATE_URL = 'https://smartcaptcha.cloud.yandex.ru/validate';
export const SMARTCAPTCHA_VALIDATE_TIMEOUT_MS = 3_000;

export const SMARTCAPTCHA_MESSAGES = {
  unavailable: 'Проверка временно недоступна. Попробуйте отправить заявку позже.',
  failed: 'Проверка не пройдена. Пожалуйста, отправьте форму ещё раз.',
} as const;
