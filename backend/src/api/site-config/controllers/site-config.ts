import { factories } from '@strapi/strapi';
import { SiteConfigSchema } from '@/contracts';
import { parse } from 'valibot';

export default factories.createCoreController('api::site-config.site-config', ({ strapi }) => ({
  async siteConfig() {
    try {
      const config = await strapi.documents('api::site-config.site-config').findFirst({
        fields: ['email', 'phone'],
      });

      return parse(SiteConfigSchema, config);
    } catch (error) {
      return error;
    }
  },
}));
