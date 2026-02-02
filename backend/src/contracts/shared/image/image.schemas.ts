import { nullish, object, pipe, string, transform } from 'valibot';

export const ImageScheme = object({
  url: string(),
  alternativeText: nullish(string(), ''),
});

export const ImageTransformScheme = pipe(
  object({
    image: ImageScheme,
  }),
  transform((v) => v.image),
);
