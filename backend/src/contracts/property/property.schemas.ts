import { array, nullish, number, object, string } from 'valibot';
import { BadgeSchema, ImageTransformScheme, SeoSchema, SpecItemSchema } from '../shared';
import { PropertyTypeSchema } from '../property-type';
import { CitySchema } from '../city';

export const PropertySlugSchema = /*#__PURE__*/ object({
  slug: string(),
});

export const PropertySlugListItemSchema = /*#__PURE__*/ object({
  slug: string(),
  lastModified: nullish(string(), ''),
});

export const PropertySlugListSchema = /*#__PURE__*/ object({
  list: nullish(array(PropertySlugListItemSchema), []),
});

const PropertyShape = {
  title: string(),
  slug: string(),
  address: string(),
  shortDescription: string(),
  priceFrom: number(),
  pricePerM2: number(),
  previewImage: ImageTransformScheme,

  city: nullish(CitySchema),
  propertyType: nullish(PropertyTypeSchema),

  badges: nullish(array(BadgeSchema), []),
  specifications: nullish(array(SpecItemSchema), []),
} as const;

export const PropertyListItemSchema = /*#__PURE__*/ object(PropertyShape);

export const PropertyFullItemSchema = /*#__PURE__*/ object({
  ...PropertyShape,
  description: string(),
  images: nullish(array(ImageTransformScheme), []),
  activityTypes: nullish(array(BadgeSchema), []),
  techSpecifications: nullish(array(SpecItemSchema), []),
  infrastructure: nullish(array(BadgeSchema), []),
  seo: SeoSchema,
});
