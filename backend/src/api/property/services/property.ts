import { factories } from '@strapi/strapi';

const SIMILAR_PROPERTIES_COUNT = 3;

const cardPopulate = {
  badges: true,
  specifications: true,
  city: {
    populate: {
      properties: true,
    },
  },
  propertyType: {
    populate: {
      properties: true,
    },
  },
  previewImage: {
    populate: {
      image: true,
    },
  },
} as const;

export default factories.createCoreService('api::property.property', ({ strapi }) => ({
  async getSlugs() {
    const list = await strapi.documents('api::property.property').findMany({
      status: 'published',
      sort: ['slug:asc'],
      fields: ['slug', 'updatedAt', 'publishedAt'],
    });

    return list
      .map((item) => ({
        slug: item.slug,
        lastModified:
          (typeof item.updatedAt === 'string' && item.updatedAt) ||
          (typeof item.publishedAt === 'string' && item.publishedAt) ||
          '',
      }))
      .filter((item): item is { slug: string; lastModified: string } => Boolean(item.slug));
  },

  async getBySlug(slug: string) {
    const item = await strapi.documents('api::property.property').findFirst({
      status: 'published',
      limit: 1,
      filters: {
        slug,
      },
      populate: {
        ...cardPopulate,
        activityTypes: true,
        infrastructure: true,
        techSpecifications: true,
        seo: true,
        images: {
          populate: {
            image: true,
          },
        },
      },
    });

    return item;
  },

  async getSimilarBySlug(slug: string, limit = SIMILAR_PROPERTIES_COUNT) {
    const baseQuery = {
      status: 'published',
      filters: {
        slug: {
          $ne: slug,
        },
      },
    } as const;

    const total = await strapi.documents('api::property.property').count(baseQuery);

    if (!total) return [];

    const queryCount = Math.min(limit, total);
    const randomOffsets = new Set<number>();

    while (randomOffsets.size < queryCount) {
      randomOffsets.add(Math.floor(Math.random() * total));
    }

    const list = await Promise.all(
      [...randomOffsets].map((start) =>
        strapi
          .documents('api::property.property')
          .findMany({
            ...baseQuery,
            sort: ['slug:asc'],
            start,
            limit: 1,
            fields: ['title', 'slug', 'address', 'shortDescription', 'priceFrom', 'pricePerM2'],
            populate: cardPopulate,
          })
          .then(([item]) => item),
      ),
    );

    return list.filter(Boolean);
  },
}));
