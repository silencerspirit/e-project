import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/news/list',
      handler: 'news-item.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/news/newest',
      handler: 'news-item.findNewest',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/news/:slug((?!page$)[a-z0-9-]+)',
      handler: 'news-item.findOneBySlug',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
