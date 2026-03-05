import { nullish, object, string } from 'valibot';

export const CitySchema = /*#__PURE__*/ nullish(
  object({
    name: string(),
    slug: string(),
  }),
  null,
);
