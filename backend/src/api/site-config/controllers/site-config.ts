import { factories } from '@strapi/strapi';
import { SiteConfigSchema } from '@/contracts';
import type { Context } from 'koa';
import { parse } from 'valibot';

export default factories.createCoreController('api::site-config.site-config', ({ strapi }) => ({
  async siteConfig(context: Context) {
    try {
      const [config] = await strapi.documents('api::site-config.site-config').findMany({
        fields: ['email', 'phone'],
      });

      return parse(SiteConfigSchema, config);
    } catch (error) {
      return context.badRequest('Invalid menu schema', { error });
    }
  },
}));
