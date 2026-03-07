import { SeoSchema } from '../../shared';
import { nullish, object, string } from 'valibot';

export const PrivacyPolicyPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: nullish(string(), ''),
  content: string(),
  seo: SeoSchema,
});
