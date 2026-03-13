export default ({ env }: { env: EnvFn }) => {
  const hasS3Credentials = Boolean(
    env('S3_ENDPOINT') && env('S3_BUCKET') && env('S3_ACCESS_KEY_ID') && env('S3_SECRET_ACCESS_KEY'),
  );

  const isS3UploadEnabled = env.bool('S3_UPLOAD_ENABLED', hasS3Credentials);
  const s3Acl = env('S3_ACL');

  const s3Params: Record<string, string | number> = {
    Bucket: env('S3_BUCKET'),
    signedUrlExpires: env.int('S3_SIGNED_URL_EXPIRES', 15 * 60),
  };

  if (s3Acl) {
    s3Params.ACL = s3Acl;
  }

  return {
    ...(isS3UploadEnabled
      ? {
          upload: {
            config: {
              provider: 'aws-s3',
              providerOptions: {
                baseUrl: env('S3_BASE_URL'),
                rootPath: env('S3_ROOT_PATH'),
                s3Options: {
                  credentials: {
                    accessKeyId: env('S3_ACCESS_KEY_ID'),
                    secretAccessKey: env('S3_SECRET_ACCESS_KEY'),
                  },
                  endpoint: env('S3_ENDPOINT'),
                  forcePathStyle: env.bool('S3_FORCE_PATH_STYLE', true),
                  region: env('S3_REGION', 'ru-1'),
                  params: s3Params,
                },
              },
              actionOptions: {
                delete: {},
                upload: {},
                uploadStream: {},
              },
            },
          },
        }
      : {}),
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
  };
};
