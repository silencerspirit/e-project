import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/property/:slug((?!page$)[a-z0-9-]+)',
      handler: 'property.findOneBySlug',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
