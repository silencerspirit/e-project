import { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/site-config',
      handler: 'site-config.siteConfig',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
