import { DEFAULT_PAGINATE_LIMIT } from '@/contracts';
import { factories } from '@strapi/strapi';

const baseQuery = {
  status: 'published',
  filters: { visible: true },
} as const;

const NEWEST_NEWS_COUNT = 2;

export default factories.createCoreService('api::news-item.news-item', ({ strapi }) => ({
  async getList(page: number, limit = DEFAULT_PAGINATE_LIMIT) {
    const start = (Number(page) - 1) * limit;

    const [list, total] = await Promise.all([
      strapi.documents('api::news-item.news-item').findMany({
        ...baseQuery,
        sort: ['publishedDate:asc'],
        start,
        limit,
        fields: ['title', 'shortDescription', 'slug', 'publishedDate', 'visible'],
        populate: {
          seo: true,
          image: {
            populate: {
              image: true,
            },
          },
        },
      }),
      strapi.documents('api::news-item.news-item').count(baseQuery),
    ]);

    return { list, total };
  },

  async getNewest() {
    return strapi.documents('api::news-item.news-item').findMany({
      ...baseQuery,
      sort: ['publishedDate:desc'],
      start: 0,
      limit: NEWEST_NEWS_COUNT,
      fields: ['title', 'shortDescription', 'slug', 'publishedDate', 'visible'],
      populate: {
        image: {
          populate: {
            image: true,
          },
        },
      },
    });
  },

  async getBySlug(slug: string) {
    const [item] = await strapi.documents('api::news-item.news-item').findMany({
      ...baseQuery,
      limit: 1,
      filters: {
        slug,
      },
      populate: {
        seo: true,
        image: {
          populate: {
            image: true,
          },
        },
      },
    });

    return item;
  },
}));
