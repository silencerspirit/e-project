import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/news/page',
      handler: 'news-page.getPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
