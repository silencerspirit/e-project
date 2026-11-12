export const REQUEST_FORM_MESSAGES = {
  invalid: 'Проверьте заполнение формы и повторите проверку от спама.',
  failed: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.',
} as const;

export const REQUEST_FORM_LOG_MESSAGES = {
  captchaUnavailable: 'Форма заявки: проверка SmartCaptcha недоступна.',
  emailFailed: 'Форма заявки: не удалось отправить письмо.',
} as const;
