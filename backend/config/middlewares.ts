export default ({ env }: { env: EnvFn }) => {
  const cspHosts = new Set(['market-assets.strapi.io', ...env.array('S3_CSP_HOSTS', [])]);

  const addHost = (value?: string) => {
    if (!value) {
      return;
    }

    try {
      cspHosts.add(new URL(value).hostname);
    } catch {
      cspHosts.add(value);
    }
  };

  addHost(env('S3_ENDPOINT', undefined));
  addHost(env('S3_BASE_URL', undefined));

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', ...cspHosts],
            'media-src': ["'self'", 'data:', 'blob:', ...cspHosts],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
