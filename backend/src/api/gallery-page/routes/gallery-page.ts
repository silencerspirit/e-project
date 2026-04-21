import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/gallery-page',
      handler: 'gallery-page.getGalleryPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
