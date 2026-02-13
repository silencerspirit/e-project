import { array, object, optional, pipe, string, transform } from 'valibot';
import { ImageScheme } from '../image';
import { MetricItemScheme } from '../metric-item/metric-item.schemas';

export const HeroBannerScheme = object({
  title: string(),
  description: string(),
  backgroundImage: pipe(
    object({
      image: ImageScheme,
    }),
    transform((image) => ({ ...image.image })),
  ),
  metrics: optional(array(MetricItemScheme), []),
});
