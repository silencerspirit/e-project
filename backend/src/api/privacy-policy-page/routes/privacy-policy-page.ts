import type { Core } from '@strapi/strapi';

const config: Core.RouterConfig = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/privacy-policy-page',
      handler: 'privacy-policy-page.getPrivacyPolicyPage',
      config: {
        auth: false,
      },
    },
  ],
};

export default config;
