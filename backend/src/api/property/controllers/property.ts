import { array, parse } from 'valibot';
import { factories } from '@strapi/strapi';
import {
  PropertyFullItemSchema,
  PropertyListItemSchema,
  PropertySlugListSchema,
  PropertySlugSchema,
} from '@/contracts';
import { Context } from 'koa';

export default factories.createCoreController('api::property.property', ({ strapi }) => ({
  async findSlugs() {
    try {
      const list = await strapi.service('api::property.property').getSlugs();

      return parse(PropertySlugListSchema, { list });
    } catch (error) {
      return error;
    }
  },

  async findOneBySlug(context: Context) {
    try {
      const { slug } = parse(PropertySlugSchema, context.params);

      if (!slug) return context.badRequest('Slug is required');

      const item = await strapi.service('api::property.property').getBySlug(slug);

      return parse(PropertyFullItemSchema, item);
    } catch (error) {
      return error;
    }
  },

  async findSimilarBySlug(context: Context) {
    try {
      const { slug } = parse(PropertySlugSchema, context.params);

      if (!slug) return context.badRequest('Slug is required');

      const list = await strapi.service('api::property.property').getSimilarBySlug(slug);

      return {
        list: parse(array(PropertyListItemSchema), list),
      };
    } catch (error) {
      return error;
    }
  },
}));
