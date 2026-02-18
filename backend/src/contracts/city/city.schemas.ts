import { object, string } from 'valibot';

export const CitySchema = object({
  name: string(),
  slug: string(),
});
