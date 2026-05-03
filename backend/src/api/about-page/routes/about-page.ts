import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/about-page',
      handler: 'about-page.getAboutPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
