import { nullish, object, string } from 'valibot';

export const PropertyTypeSchema = /*#__PURE__*/ nullish(
  object({
    name: string(),
    slug: string(),
  }),
  null,
);
