import { SeoSchema } from '../../shared/seo';
import { nullish, object, string } from 'valibot';

export const PersonalDataPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: nullish(string(), ''),
  content: string(),
  seo: SeoSchema,
});
