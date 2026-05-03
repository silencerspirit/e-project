import { AboutPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

export default factories.createCoreController('api::about-page.about-page', ({ strapi }) => ({
  async getAboutPage() {
    try {
      const aboutPage = await strapi.service('api::about-page.about-page').getAboutPage();

      return parse(AboutPageSchema, aboutPage);
    } catch (error) {
      return error;
    }
  },
}));
