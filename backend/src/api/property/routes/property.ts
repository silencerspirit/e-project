import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/property/slugs',
      handler: 'property.findSlugs',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/property/:slug((?!page$|slugs$)[a-z0-9-]+)',
      handler: 'property.findOneBySlug',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/property/similar/:slug((?!page$)[a-z0-9-]+)',
      handler: 'property.findSimilarBySlug',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
