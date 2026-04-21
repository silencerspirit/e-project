import { nullish, object, string } from 'valibot';
import { ImageScheme } from '../image';

export const GalleryItemScheme = /*#__PURE__*/ object({
  group: nullish(string(), ''),
  description: nullish(string(), ''),
  image: ImageScheme,
});
