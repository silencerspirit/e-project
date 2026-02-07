export default {
  routes: [
    {
      method: 'GET',
      path: '/site-config',
      handler: 'site-config.siteConfig',
      config: {
        auth: false,
      },
    },
  ],
};
