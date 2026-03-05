export default ({ env }: { env: EnvFn }) => ({
  'webp-converter': {
    enabled: true,
    config: {
      mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      options: {
        quality: 80,
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.hosting.reg.ru'),
        port: env.int('SMTP_PORT', 465),
        secure: env.bool('SMTP_SECURE', true),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        connectionTimeout: env.int('SMTP_CONNECTION_TIMEOUT', 10_000),
      },
      settings: {
        defaultFrom: env('SMTP_DEFAULT_FROM', env('SMTP_USERNAME')),
        defaultReplyTo: env('SMTP_DEFAULT_REPLY_TO', env('SMTP_USERNAME')),
      },
    },
  },
});
