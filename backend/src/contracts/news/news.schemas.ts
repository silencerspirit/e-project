import { array, boolean, nullish, object, optional, string } from 'valibot';
import { ImageTransformScheme, PaginateSchema, SeoSchema } from '../shared';

export const NewsQuerySchema = object({
  page: nullish(string(), '1'),
});

export const NewsSlugSchema = object({
  slug: string(),
});

const NewsListItemShape = {
  title: string(),
  shortDescription: optional(string()),
  slug: string(),
  visible: boolean(),
  publishedDate: optional(string()),
  image: ImageTransformScheme,
} as const;

export const NewsListItemSchema = object(NewsListItemShape);

export const NewsListItemCollectionSchema = object({
  list: array(NewsListItemSchema),
  paginate: PaginateSchema,
});

export const NewsFullItemSchema = object({
  ...NewsListItemShape,
  content: string(),
  seo: SeoSchema,
});
