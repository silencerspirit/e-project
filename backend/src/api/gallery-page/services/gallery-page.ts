import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::gallery-page.gallery-page', ({ strapi }) => ({
  async getGalleryPage() {
    return strapi.documents('api::gallery-page.gallery-page').findFirst({
      status: 'published',
      fields: ['title', 'description'],
      populate: {
        seo: true,
        items: {
          populate: {
            image: true,
          },
        },
      },
    });
  },
}));
