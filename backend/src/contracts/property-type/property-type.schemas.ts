import { object, string } from 'valibot';

export const PropertyTypeSchema = /*#__PURE__*/ object({
  name: string(),
  slug: string(),
});
