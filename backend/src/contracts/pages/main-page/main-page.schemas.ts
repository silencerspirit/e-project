import {
  FeatureBannerScheme,
  HeroBannerScheme,
  RequestBannerScheme,
  SeoSchema,
  ShowcaseBannerScheme,
} from '../../shared';
import { array, nullish, number, object, pipe, string, trim } from 'valibot';

export const MainPageSchema = /*#__PURE__*/ object({
  heroBanner: nullish(HeroBannerScheme, null),
  featureBanner: nullish(FeatureBannerScheme, null),
  advantagesBanner: nullish(FeatureBannerScheme, null),
  showcaseBanner: nullish(ShowcaseBannerScheme, null),
  requestBanner: nullish(RequestBannerScheme, null),
  seo: SeoSchema,
});

export const MainPagePageFacetSchema = /*#__PURE__*/ object({
  name: pipe(string(), trim()),
  slug: pipe(string(), trim()),
  order: nullish(number(), 1),
});

export const MainPagePageFormSchema = /*#__PURE__*/ object({
  propertyTypes: nullish(array(MainPagePageFacetSchema), []),
  cities: nullish(array(MainPagePageFacetSchema), []),
  maxPrice: number(),
});
