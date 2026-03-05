import { parse } from 'valibot';
import { PropertyTypeSchema, type TMainPageFacet } from '@/contracts';
import { CitySchema } from '@/contracts/city';
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::main-page.main-page', ({ strapi }) => ({
  async getMainPage() {
    return strapi.documents('api::main-page.main-page').findFirst({
      status: 'published',
      populate: {
        seo: true,
        heroBanner: {
          populate: {
            metrics: true,
            backgroundImage: { populate: { image: true } },
          },
        },
        featureBanner: {
          populate: {
            features: true,
          },
        },
        advantagesBanner: {
          populate: {
            features: true,
          },
        },
        showcaseBanner: {
          populate: {
            properties: {
              populate: {
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
              },
            },
          },
        },
      },
    });
  },

  async getMainPageForm() {
    const list = await strapi.documents('api::property.property').findMany({
      status: 'published',
      fields: ['priceFrom'],
      populate: {
        city: {
          fields: ['slug', 'name'],
        },
        propertyType: {
          fields: ['slug', 'name'],
        },
      },
    });

    const cityMap = new Map<TMainPageFacet['slug'], TMainPageFacet>();
    const propertyMap = new Map<TMainPageFacet['slug'], TMainPageFacet>();
    let maxPrice = 0;

    list.forEach((property) => {
      const city = parse(CitySchema, property.city);
      const propertyType = parse(PropertyTypeSchema, property.propertyType);
      maxPrice = Math.max(maxPrice, Number(property.priceFrom));

      if (city && !cityMap.get(city.slug)) cityMap.set(city.slug, city);
      if (propertyType && !propertyMap.get(propertyType.slug)) propertyMap.set(propertyType.slug, propertyType);
    });

    return {
      maxPrice,
      cities: [...cityMap.values()],
      propertyTypes: [...propertyMap.values()],
    };
  },
}));
