import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/personal-data-page',
      handler: 'personal-data-page.getPersonalDataPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
