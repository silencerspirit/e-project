import { nullish, number, object, string } from 'valibot';

export const PropertyTypeSchema = /*#__PURE__*/ nullish(
  object({
    name: string(),
    slug: string(),
    order: nullish(number(), 1),
  }),
  null,
);
