import { parse } from 'valibot';
import { factories } from '@strapi/strapi';
import { MainPagePageFormSchema, MainPageSchema } from '@/contracts';

export default factories.createCoreController('api::main-page.main-page', ({ strapi }) => ({
  async getMainPage() {
    try {
      const mainPage = await strapi.service('api::main-page.main-page').getMainPage();

      return parse(MainPageSchema, mainPage);
    } catch (error) {
      return error;
    }
  },

  async getMainPageForm() {
    try {
      const { maxPrice, cities, propertyTypes } = await strapi.service('api::main-page.main-page').getMainPageForm();

      return parse(MainPagePageFormSchema, {
        maxPrice,
        cities,
        propertyTypes,
      });
    } catch (error) {
      return error;
    }
  },
}));
