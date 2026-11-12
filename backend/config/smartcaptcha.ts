export default ({ env }: { env: EnvFn }) => ({
  secretKey: env('SMARTCAPTCHA_SECRET_KEY', ''),
  // Точное значение host из ответа Яндекса, включая порт при локальной разработке.
  allowedHosts: env.array('SMARTCAPTCHA_ALLOWED_HOSTS', []),
});
