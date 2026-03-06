import { parse } from 'valibot';
import { MenuPosition, MenuSchema } from '@/contracts';
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::navigation-item.navigation-item', ({ strapi }) => ({
  async getMenu() {
    try {
      const items = await strapi.documents('api::navigation-item.navigation-item').findMany({
        status: 'published',
        filters: { visible: true },
        sort: 'order:asc',
      });

      const positionMap: Record<MenuPosition, unknown[]> = {
        [MenuPosition.Header]: [],
        [MenuPosition.FooterFirstColumn]: [],
        [MenuPosition.FooterSecondColumn]: [],
      };

      items.forEach((item) => {
        if (item.position) positionMap[item.position].push(item);
      });

      return parse(MenuSchema, positionMap);
    } catch (error) {
      return error;
    }
  },
}));
