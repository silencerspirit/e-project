import { PrivacyPolicyPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

export default factories.createCoreController('api::privacy-policy-page.privacy-policy-page', ({ strapi }) => ({
  async getPrivacyPolicyPage() {
    try {
      const page = await strapi.documents('api::privacy-policy-page.privacy-policy-page').findFirst({
        status: 'published',
        populate: {
          seo: true,
        },
      });

      return parse(PrivacyPolicyPageSchema, page);
    } catch (error) {
      return error;
    }
  },
}));
