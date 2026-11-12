export const SMARTCAPTCHA_SCRIPT_URL = 'https://smartcaptcha.cloud.yandex.ru/captcha.js';
export const SMARTCAPTCHA_CALLBACK_PREFIX = '__alfaSmartCaptchaLoaded';
export const SMARTCAPTCHA_LOAD_TIMEOUT_MS = 12_000;
export const SMARTCAPTCHA_CHALLENGE_TIMEOUT_MS = 180_000;
export const SMARTCAPTCHA_LANGUAGE = 'ru';

export const SMARTCAPTCHA_MESSAGES = {
  unavailable: 'Не удалось загрузить проверку. Проверьте соединение и попробуйте ещё раз.',
  notConfigured: 'Проверка временно недоступна. Пожалуйста, попробуйте позже.',
  incomplete: 'Проверка не завершена. Попробуйте ещё раз.',
  expired: 'Время проверки истекло. Отправьте форму ещё раз.',
  cancelled: 'Проверка отменена. Чтобы отправить заявку, пройдите её ещё раз.',
} as const;
