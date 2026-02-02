import { array, boolean, nullish, object, optional, string } from 'valibot';
import { ImageTransformScheme, PaginateSchema } from '../shared';

export const NewsQuerySchema = object({
  page: nullish(string(), '1'),
});

export const NewsListItemSchema = object({
  title: string(),
  description: optional(string()),
  slug: string(),
  visible: boolean(),
  publishedDate: optional(string()),
  images: array(ImageTransformScheme),
});

export const NewsListItemCollectionSchema = object({
  list: array(NewsListItemSchema),
  paginate: PaginateSchema,
});
