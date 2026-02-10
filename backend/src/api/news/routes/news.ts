import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/news/list',
      handler: 'news.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/news/newest',
      handler: 'news.findNewest',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/news/:slug((?!page$)[a-z0-9-]+)',
      handler: 'news.findOneBySlug',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
