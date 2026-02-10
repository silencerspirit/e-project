import { parse } from 'valibot';
import { factories } from '@strapi/strapi';
import { SeoSchema, IPage } from '@/contracts';

export default factories.createCoreController('api::news-page.news-page', ({ strapi }) => ({
  async getPage(): Promise<IPage> {
    try {
      const newsPage = await strapi.documents('api::news-page.news-page').findFirst({
        populate: ['seo'],
      });

      return {
        seo: parse(SeoSchema, newsPage.seo),
      };
    } catch (error) {
      return error;
    }
  },
}));
