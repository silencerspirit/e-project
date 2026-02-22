import { PropertyListingPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

export default factories.createCoreController('api::property-listing-page.property-listing-page', ({ strapi }) => ({
  async getPropertyListingPage() {
    try {
      const propertyListingPage = await strapi.documents('api::property-listing-page.property-listing-page').findFirst({
        status: 'published',
      });

      return parse(PropertyListingPageSchema, propertyListingPage);
    } catch (error) {
      return error;
    }
  },
}));
