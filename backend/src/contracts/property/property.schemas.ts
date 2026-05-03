import { array, nullish, number, object, string } from 'valibot';
import { CitySchema } from '../city';
import { PropertyTypeSchema } from '../property-type';
import { BadgeSchema } from '../shared/badge';
import { ImagesListScheme, ImageTransformScheme } from '../shared/image';
import { SeoSchema } from '../shared/seo';
import { SpecItemSchema } from '../shared/spec-item/spec-item.schemas';

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
  description: nullish(string(), ''),
  images: ImagesListScheme,
  activityTypes: nullish(array(BadgeSchema), []),
  techSpecifications: nullish(array(SpecItemSchema), []),
  infrastructure: nullish(array(BadgeSchema), []),
  seo: SeoSchema,
});
