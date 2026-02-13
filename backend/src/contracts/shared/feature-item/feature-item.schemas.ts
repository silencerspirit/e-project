import { nullish, object, string } from 'valibot';

export const FeatureItemScheme = object({
  title: string(),
  description: string(),
  additional: nullish(string(), undefined),
  url: nullish(string(), undefined),
});
