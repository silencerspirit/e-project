export default {
  routes: [
    {
      method: 'GET',
      path: '/menu',
      handler: 'menu.find',
      config: {
        auth: false,
      },
    },
  ],
};
