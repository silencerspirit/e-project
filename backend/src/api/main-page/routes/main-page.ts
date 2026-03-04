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
    {
      method: 'GET',
      path: '/main-page-form',
      handler: 'main-page.getMainPageForm',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
