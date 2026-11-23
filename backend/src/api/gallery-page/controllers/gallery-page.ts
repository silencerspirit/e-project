import { GalleryPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';
import type { Context } from 'koa';

export default factories.createCoreController('api::gallery-page.gallery-page', ({ strapi }) => ({
  async getGalleryPage(context: Context) {
    try {
      const galleryPage = await strapi.service('api::gallery-page.gallery-page').getGalleryPage();

      if (!galleryPage) {
        return context.notFound('Страница фотогалереи не найдена.');
      }

      return parse(GalleryPageSchema, galleryPage);
    } catch (error) {
      strapi.log.error('Failed to load gallery page', error);
      return context.internalServerError('Не удалось загрузить фотогалерею.');
    }
  },
}));
