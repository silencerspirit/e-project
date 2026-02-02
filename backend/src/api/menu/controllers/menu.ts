import { parse } from 'valibot';
import type { Context } from 'koa';
import { MenuPosition, MenuSchema } from '@/contracts';

function getTree(position: MenuPosition) {
  return strapi.documents('api::navigation-item.navigation-item').findMany({
    status: 'published',
    filters: { position, visible: true, parent: { id: { $null: true } } },
    populate: {
      children: {
        sort: ['order:asc'],
        populate: {
          children: {
            sort: ['order:asc'],
          },
        },
      },
    },
  });
}

export default {
  async find(ctx: Context) {
    const [header, footer] = await Promise.all([getTree(MenuPosition.Header), getTree(MenuPosition.Footer)]);
    ctx.body = parse(MenuSchema, { header, footer });
  },
};
