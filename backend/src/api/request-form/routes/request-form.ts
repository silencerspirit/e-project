import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/request-form',
      handler: 'request-form.sendForm',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
