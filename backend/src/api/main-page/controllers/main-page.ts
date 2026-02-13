import { parse } from 'valibot';
import { factories } from '@strapi/strapi';
import { MainPageSchema } from '@/contracts';

export default factories.createCoreController('api::main-page.main-page', ({ strapi }) => ({
  async getMainPage() {
    try {
      const mainPage = await strapi.documents('api::main-page.main-page').findFirst({
        populate: {
          seo: true,
          heroBanner: {
            populate: {
              metrics: true,
              backgroundImage: { populate: { image: true } },
            },
          },
          featureBanner: {
            populate: {
              features: true,
            },
          },
          advantagesBanner: {
            populate: {
              features: true,
            },
          },
        },
      });

      return parse(MainPageSchema, mainPage);
    } catch (error) {
      return error;
    }
  },
}));
