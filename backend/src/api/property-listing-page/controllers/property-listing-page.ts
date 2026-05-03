import {
  PropertyListingPageCountSchema,
  PropertyListingPageListSchema,
  PropertyListingPageQuerySchema,
  PropertyListingPageRequestSchema,
  PropertyListingPageSchema,
} from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';
import { Context } from 'koa';

export default factories.createCoreController('api::property-listing-page.property-listing-page', ({ strapi }) => ({
  async getPropertyListingPage() {
    try {
      const propertyListingPage = await strapi.documents('api::property-listing-page.property-listing-page').findFirst({
        status: 'published',
        populate: {
          seo: true,
        },
      });

      return parse(PropertyListingPageSchema, propertyListingPage);
    } catch (error) {
      return error;
    }
  },

  async getPropertyListingPageList(context: Context) {
    try {
      const request = parse(PropertyListingPageRequestSchema, context.request.query);
      const query = parse(PropertyListingPageQuerySchema, context.request.query);
      const { total, list, filters } = await strapi
        .service('api::property-listing-page.property-listing-page')
        .getPropertyListingPageList(request);

      return parse(PropertyListingPageListSchema, {
        filters,
        list,
        paginate: { page: query.page, total },
      });
    } catch (error) {
      return error;
    }
  },

  async getPropertyListingPageCount(context: Context) {
    try {
      const request = parse(PropertyListingPageRequestSchema, context.request.query);
      const { total, filters } = await strapi
        .service('api::property-listing-page.property-listing-page')
        .getPropertyListingPageCount(request);

      return parse(PropertyListingPageCountSchema, {
        total,
        filters,
      });
    } catch (error) {
      return error;
    }
  },
}));
