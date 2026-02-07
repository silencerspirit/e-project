import { DEFAULT_PAGINATE_LIMIT } from '@/utils';
import { imagesPopulate, seoPopulate } from '@/populate';

const baseQuery = {
  status: 'published',
  filters: { visible: true },
} as const;

const listFields = ['title', 'shortDescription', 'slug', 'publishedDate', 'visible'] as const;

export default ({ strapi }) => ({
  async getList(page: number, limit = DEFAULT_PAGINATE_LIMIT) {
    const start = (Number(page) - 1) * limit;

    const [list, total] = await Promise.all([
      strapi.documents('api::news-item.news-item').findMany({
        ...baseQuery,
        sort: ['publishedDate:asc'],
        start,
        limit,
        fields: listFields,
        populate: { ...seoPopulate, ...imagesPopulate },
      }),
      strapi.documents('api::news-item.news-item').count(baseQuery),
    ]);

    return { list, total };
  },

  async getNewest(limit = 2) {
    return strapi.documents('api::news-item.news-item').findMany({
      ...baseQuery,
      sort: ['publishedDate:desc'],
      start: 0,
      limit,
      fields: listFields,
      populate: { ...imagesPopulate },
    });
  },

  async getBySlug(slug: string) {
    const [item] = await strapi.documents('api::news-item.news-item').findMany({
      ...baseQuery,
      limit: 1,
      filters: {
        slug,
      },
      populate: { ...seoPopulate, ...imagesPopulate },
    });

    return item;
  },
});
