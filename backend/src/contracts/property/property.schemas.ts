import { array, nullish, object, string, number } from 'valibot';
import { BadgeSchema, ImageTransformScheme, SpecItemSchema } from '../shared';
import { PropertyTypeSchema } from '../property-type';
import { CitySchema } from '../city';

export const PropertySlugSchema = object({
  slug: string(),
});

const PropertyShape = {
  title: string(),
  slug: string(),
  address: string(),
  priceFrom: number(),
  pricePerM2: number(),
  previewImage: ImageTransformScheme,

  city: nullish(CitySchema),
  propertyType: nullish(PropertyTypeSchema),

  badges: nullish(array(BadgeSchema), []),
  specifications: nullish(array(SpecItemSchema), []),
} as const;

export const PropertyListItemSchema = object(PropertyShape);

export const PropertyFullItemSchema = object({
  ...PropertyShape,
  description: string(),
  images: nullish(array(ImageTransformScheme), []),
  activityTypes: nullish(array(BadgeSchema), []),
  infrastructure: nullish(array(BadgeSchema), []),
});
