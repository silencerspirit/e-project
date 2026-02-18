import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::property.property', ({ strapi }) => ({
  async getBySlug(slug: string) {
    const item = await strapi.documents('api::property.property').findFirst({
      status: 'published',
      limit: 1,
      filters: {
        slug,
      },
      populate: {
        badges: true,
        activityTypes: true,
        specifications: true,
        infrastructure: true,
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
        images: {
          populate: {
            image: true,
          },
        },
      },
    });

    return item;
  },
}));
