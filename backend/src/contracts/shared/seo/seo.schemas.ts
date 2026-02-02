import { nullish, string, object } from 'valibot';

export const SeoSchema = nullish(
  object({
    metaTitle: string(),
    metaDescription: string(),
  }),
);
