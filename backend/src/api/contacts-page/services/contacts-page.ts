import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::contacts-page.contacts-page', ({ strapi }) => ({
  async getContactsPage() {
    return strapi.documents('api::contacts-page.contacts-page').findFirst({
      status: 'published',
      fields: ['title', 'description'],
      populate: {
        seo: true,
        contactsBlockSection: true,
        contactsFormSection: {
          populate: {
            features: true,
          },
        },
        contactsMapSection: {
          populate: {
            offices: true,
          },
        },
      },
    });
  },
}));
