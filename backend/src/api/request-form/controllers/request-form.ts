import { parse } from 'valibot';
import type { Core } from '@strapi/strapi';
import { RequestFormSchema } from '@/contracts';
import type { Context } from 'koa';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async sendForm(context: Context & { request: { body: unknown } }) {
    try {
      const { phone, name, pageUrl } = parse(RequestFormSchema, context.request.body);

      await strapi.service('api::request-form.request-form').sendForm({
        phone,
        name,
        pageUrl,
      });

      return {};
    } catch (error) {
      return error;
    }
  },
});
