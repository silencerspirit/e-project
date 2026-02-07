import { parse } from 'valibot';
import { MenuPosition, MenuSchema } from '@/contracts';
import { factories } from '@strapi/strapi';

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

export default factories.createCoreController('api::navigation-item.navigation-item', () => ({
  async getMenu() {
    const [header, footer] = await Promise.all([getTree(MenuPosition.Header), getTree(MenuPosition.Footer)]);

    try {
      return parse(MenuSchema, { header, footer });
    } catch (error) {
      return error;
    }
  },
}));
