export default {
  routes: [
    {
      method: 'GET',
      path: '/news',
      handler: 'news.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/news/:slug',
      handler: 'news.findOneBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
