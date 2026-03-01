import { array, boolean, nullish, object, optional, string } from 'valibot';
import { ImageTransformScheme, PaginateSchema, SeoSchema } from '../shared';

export const NewsQuerySchema = /*#__PURE__*/ object({
  page: nullish(string(), '1'),
});

export const NewsSlugSchema = /*#__PURE__*/ object({
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

export const NewsListItemSchema = /*#__PURE__*/ object(NewsListItemShape);

export const NewsListItemCollectionSchema = /*#__PURE__*/ object({
  list: array(NewsListItemSchema),
  paginate: PaginateSchema,
});

export const NewsFullItemSchema = /*#__PURE__*/ object({
  ...NewsListItemShape,
  content: string(),
  seo: SeoSchema,
});
