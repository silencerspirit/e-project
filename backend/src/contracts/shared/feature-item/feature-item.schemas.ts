import { nullish, object, string } from 'valibot';

export const FeatureItemScheme = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  additional: nullish(string(), undefined),
  url: nullish(string(), undefined),
});
