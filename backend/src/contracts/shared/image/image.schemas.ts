import { nullish, object, pipe, string, transform } from 'valibot';

export const ImageScheme = /*#__PURE__*/ pipe(
  object({
    url: string(),
    alternativeText: nullish(string(), ''),
    formats: nullish(
      object({
        large: nullish(object({ url: string() }), null),
        medium: nullish(object({ url: string() }), null),
        small: nullish(object({ url: string() }), null),
        thumbnail: nullish(object({ url: string() }), null),
      }),
      null,
    ),
  }),
  transform((img) => ({
    url: img.url,
    alternativeText: img.alternativeText,
    formats: {
      large: img.formats?.large?.url ?? img.url,
      medium: img.formats?.medium?.url ?? img.url,
      small: img.formats?.small?.url ?? img.url,
      thumbnail: img.formats?.thumbnail?.url ?? img.url,
    },
  })),
);

export const ImageTransformScheme = /*#__PURE__*/ pipe(
  object({
    image: ImageScheme,
  }),
  transform((v) => v.image),
);
