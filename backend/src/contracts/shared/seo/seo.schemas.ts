import { nullish, string, object } from 'valibot';

export const SeoSchema = /*#__PURE__*/ nullish(
  object({
    metaTitle: string(),
    metaDescription: string(),
  }),
);
