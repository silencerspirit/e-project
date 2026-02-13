import { array, parse } from 'valibot';
import { Context } from 'koa';
import {
  NewsQuerySchema,
  NewsListItemCollectionSchema,
  NewsListItemSchema,
  NewsSlugSchema,
  NewsFullItemSchema,
} from '@/contracts/news-item';
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::news-item.news-item', ({ strapi }) => ({
  async find(context: Context) {
    try {
      const { page } = parse(NewsQuerySchema, context.request.query);

      const { list, total } = await strapi.service('api::news-item.news-item').getList(page);

      return parse(NewsListItemCollectionSchema, {
        list,
        paginate: { page, total },
      });
    } catch (error) {
      return error;
    }
  },

  async findNewest() {
    const list = await strapi.service('api::news-item.news-item').getNewest();
    try {
      return {
        list: parse(array(NewsListItemSchema), list),
      };
    } catch (error) {
      return error;
    }
  },

  async findOneBySlug(context: Context) {
    try {
      const { slug } = parse(NewsSlugSchema, context.params);

      if (!slug) return context.badRequest('Slug is required');

      const item = await strapi.service('api::news-item.news-item').getBySlug(slug);

      return parse(NewsFullItemSchema, item);
    } catch (error) {
      return error;
    }
  },
}));
