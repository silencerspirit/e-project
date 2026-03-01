import { array, object, optional, string } from 'valibot';
import { ImageTransformScheme } from '../image';
import { MetricItemScheme } from '../metric-item/metric-item.schemas';

export const HeroBannerScheme = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  backgroundImage: ImageTransformScheme,
  metrics: optional(array(MetricItemScheme), []),
});
