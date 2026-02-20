export default () => ({
  'webp-converter': {
    enabled: true,
    config: {
      mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      options: {
        quality: 80,
      },
    },
  },
});
