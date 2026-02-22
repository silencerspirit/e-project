import { object, string } from 'valibot';

export const PropertyListingPageSchema = object({
  title: string(),
  description: string(),
});
