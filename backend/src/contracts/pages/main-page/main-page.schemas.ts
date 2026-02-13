import { FeatureBannerScheme, HeroBannerScheme, SeoSchema } from '../../shared';
import { object } from 'valibot';

export const MainPageSchema = object({
  heroBanner: HeroBannerScheme,
  featureBanner: FeatureBannerScheme,
  advantagesBanner: FeatureBannerScheme,
  seo: SeoSchema,
});
