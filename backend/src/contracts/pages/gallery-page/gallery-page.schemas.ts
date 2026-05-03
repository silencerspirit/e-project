import { GalleryItemScheme } from '../../shared/gallery-item';
import { SeoSchema } from '../../shared/seo';
import { array, nullish, object, string } from 'valibot';

export const GalleryPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  items: nullish(array(GalleryItemScheme), []),
  seo: SeoSchema,
});
