import { HeroBannerScheme, SeoSchema } from '../../shared';
import { object } from 'valibot';

export const MainPageSchema = object({
  heroBanner: HeroBannerScheme,
  seo: SeoSchema,
});
