import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/contacts-page',
      handler: 'contacts-page.getContactsPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
