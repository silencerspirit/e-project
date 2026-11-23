import { GalleryItemScheme } from '../../shared/gallery-item';
import { ImageResponseSchema } from '../../shared/image';
import { SeoSchema } from '../../shared/seo';
import { array, nullish, object, string } from 'valibot';

export const GalleryPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  items: nullish(array(GalleryItemScheme), []),
  seo: SeoSchema,
});

export const GalleryPageResponseSchema = /*#__PURE__*/ object({
  ...GalleryPageSchema.entries,
  items: array(
    object({
      ...GalleryItemScheme.entries,
      image: ImageResponseSchema,
    }),
  ),
});
