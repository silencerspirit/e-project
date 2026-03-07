import { PersonalDataPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

export default factories.createCoreController('api::personal-data-page.personal-data-page', ({ strapi }) => ({
  async getPersonalDataPage() {
    try {
      const page = await strapi.documents('api::personal-data-page.personal-data-page').findFirst({
        status: 'published',
        populate: {
          seo: true,
        },
      });

      return parse(PersonalDataPageSchema, page);
    } catch (error) {
      return error;
    }
  },
}));
