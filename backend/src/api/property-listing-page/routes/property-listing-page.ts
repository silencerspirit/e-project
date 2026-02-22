import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/property-listing-page',
      handler: 'property-listing-page.getPropertyListingPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
