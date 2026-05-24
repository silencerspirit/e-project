import { ContactsPageSchema } from '@/contracts';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

export default factories.createCoreController('api::contacts-page.contacts-page', ({ strapi }) => ({
  async getContactsPage() {
    try {
      const contactsPage = await strapi.service('api::contacts-page.contacts-page').getContactsPage();

      return parse(ContactsPageSchema, contactsPage);
    } catch (error) {
      return error;
    }
  },
}));
