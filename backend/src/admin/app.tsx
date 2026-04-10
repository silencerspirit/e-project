import { Globe } from '@strapi/icons';
import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['ru'],
  },
  register(app: StrapiApp) {
    app.addMenuLink({
      to: 'https://alfa-realting.ru/',
      target: '_blank',
      icon: Globe,
      intlLabel: {
        id: 'app.main-site',
        defaultMessage: 'Сайт',
      },
      position: 9,
      permissions: [],
      Component: async () => {
        return { default: () => null };
      },
    });
  },
  bootstrap() {},
};
