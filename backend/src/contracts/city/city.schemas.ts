import { object, string } from 'valibot';

export const CitySchema = /*#__PURE__*/ object({
  name: string(),
  slug: string(),
});
