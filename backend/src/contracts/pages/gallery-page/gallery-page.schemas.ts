import { GalleryItemScheme, SeoSchema } from '../../shared';
import { array, nullish, object, string } from 'valibot';

export const GalleryPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  items: nullish(array(GalleryItemScheme), []),
  seo: SeoSchema,
});
