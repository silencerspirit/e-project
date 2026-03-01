import { FeatureBannerScheme, HeroBannerScheme, SeoSchema, ShowcaseBannerScheme } from '../../shared';
import { object } from 'valibot';

export const MainPageSchema = /*#__PURE__*/ object({
  heroBanner: HeroBannerScheme,
  featureBanner: FeatureBannerScheme,
  advantagesBanner: FeatureBannerScheme,
  showcaseBanner: ShowcaseBannerScheme,
  seo: SeoSchema,
});
