import { FeatureBannerScheme, HeroBannerScheme, SeoSchema, ShowcaseBannerScheme } from '../../shared';
import { array, nullish, number, object, pipe, string, trim } from 'valibot';

export const MainPageSchema = /*#__PURE__*/ object({
  heroBanner: HeroBannerScheme,
  featureBanner: FeatureBannerScheme,
  advantagesBanner: FeatureBannerScheme,
  showcaseBanner: ShowcaseBannerScheme,
  seo: SeoSchema,
});

export const MainPagePageFacetSchema = /*#__PURE__*/ object({
  name: pipe(string(), trim()),
  slug: pipe(string(), trim()),
});

export const MainPagePageFormSchema = /*#__PURE__*/ object({
  propertyTypes: nullish(array(MainPagePageFacetSchema), []),
  cities: nullish(array(MainPagePageFacetSchema), []),
  maxPrice: number(),
});
