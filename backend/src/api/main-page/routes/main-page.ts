import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/main-page',
      handler: 'main-page.getMainPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
