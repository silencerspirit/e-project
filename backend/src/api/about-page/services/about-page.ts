import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::about-page.about-page', ({ strapi }) => ({
  async getAboutPage() {
    const [aboutPage, requestBanner] = await Promise.all([
      strapi.documents('api::about-page.about-page').findFirst({
        status: 'published',
        fields: ['title', 'description'],
        populate: {
          seo: true,
          descriptionSection: {
            populate: {
              image: true,
              advantage: true,
            },
          },
          factsSection: {
            populate: {
              features: true,
            },
          },
          pathSection: {
            populate: {
              paths: true,
            },
          },
          valuesSection: {
            populate: {
              image: true,
              features: true,
            },
          },
          teamSection: {
            populate: {
              team: {
                populate: {
                  photo: true,
                },
              },
            },
          },
        },
      }),
      strapi.documents('api::request-banner.request-banner').findFirst({
        status: 'published',
        fields: ['title', 'description'],
        populate: {
          advantages: true,
        },
      }),
    ]);
    return {
      ...aboutPage,
      requestBanner,
    };
  },
}));
