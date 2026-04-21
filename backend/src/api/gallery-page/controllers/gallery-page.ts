import { GalleryPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

export default factories.createCoreController('api::gallery-page.gallery-page', ({ strapi }) => ({
  async getGalleryPage() {
    try {
      const galleryPage = await strapi.service('api::gallery-page.gallery-page').getGalleryPage();

      return parse(GalleryPageSchema, galleryPage);
    } catch (error) {
      return error;
    }
  },
}));
