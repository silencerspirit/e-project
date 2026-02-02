import { parse } from 'valibot';
import { Context } from 'koa';
import { DEFAULT_PAGINATE_LIMIT } from '@/utils';
import { NewsQuerySchema, NewsListItemCollectionSchema } from '@/contracts/news';

const baseQuery = {
  status: 'published',
  filters: { visible: true },
} as const;

export default {
  async find(context: Context) {
    const { page } = parse(NewsQuerySchema, context.request.query);
    const start = (Number(page) - 1) * DEFAULT_PAGINATE_LIMIT;

    const [list, total] = await Promise.all([
      strapi.documents('api::news-item.news-item').findMany({
        ...baseQuery,
        sort: ['publishedDate:asc'],
        start,
        limit: DEFAULT_PAGINATE_LIMIT,
        fields: ['title', 'description', 'slug', 'publishedDate', 'visible'],
        populate: {
          seo: {
            fields: ['metaTitle', 'metaDescription'],
          },
          images: {
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
            },
          },
        },
      }),
      strapi.documents('api::news-item.news-item').count(baseQuery),
    ]);

    context.body = parse(NewsListItemCollectionSchema, {
      list,
      paginate: { page, total },
    });
  },
  async findOneBySlug() {},
};
