import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/menu',
      handler: 'navigation-item.getMenu',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
