import { object, string } from 'valibot';

export const PropertyTypeSchema = object({
  name: string(),
  slug: string(),
});
