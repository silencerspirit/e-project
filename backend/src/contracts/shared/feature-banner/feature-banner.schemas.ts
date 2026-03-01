import { array, object, string } from 'valibot';
import { FeatureItemScheme } from '../feature-item';

export const FeatureBannerScheme = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  features: array(FeatureItemScheme),
});
