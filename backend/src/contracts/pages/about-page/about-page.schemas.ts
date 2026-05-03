import { RequestBannerScheme } from '../../request-banner';
import { FeatureItemScheme } from '../../shared/feature-item';
import { ImageScheme } from '../../shared/image';
import { MetricItemScheme } from '../../shared/metric-item/metric-item.schemas';
import { SeoSchema } from '../../shared/seo';
import { array, nullish, object, omit, string } from 'valibot';

const AboutPageDescriptionSectionSchema = /*#__PURE__*/ object({
  title: string(),
  image: ImageScheme,
  content: nullish(string(), ''),
  advantage: nullish(MetricItemScheme, null),
});

const AboutPageFactsSectionSchema = /*#__PURE__*/ object({
  title: string(),
  features: nullish(array(omit(FeatureItemScheme, ['url'])), []),
});

const AboutPagePathSectionSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  paths: nullish(array(omit(FeatureItemScheme, ['url'])), []),
});

const AboutPageValuesSectionSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  image: ImageScheme,
  features: nullish(array(omit(FeatureItemScheme, ['url'])), []),
});

export const AboutPageTeamItemSchema = /*#__PURE__*/ object({
  name: string(),
  position: string(),
  description: nullish(string(), ''),
  photo: ImageScheme,
  phone: nullish(string(), ''),
  email: nullish(string(), ''),
});

const AboutPageTeamSectionSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  team: nullish(array(AboutPageTeamItemSchema), []),
});

export const AboutPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  descriptionSection: nullish(AboutPageDescriptionSectionSchema, null),
  factsSection: nullish(AboutPageFactsSectionSchema, null),
  pathSection: nullish(AboutPagePathSectionSchema, null),
  valuesSection: nullish(AboutPageValuesSectionSchema, null),
  teamSection: nullish(AboutPageTeamSectionSchema, null),

  requestBanner: nullish(RequestBannerScheme, null),
  seo: SeoSchema,
});
