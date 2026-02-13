import { type InferOutput } from 'valibot';
import {
  NewsFullItemSchema,
  NewsListItemCollectionSchema,
  NewsListItemSchema,
  NewsQuerySchema,
  NewsSlugSchema,
} from './news-item.schemas';

export type TNewsQuery = InferOutput<typeof NewsQuerySchema>;

export type TNewsListItem = InferOutput<typeof NewsListItemSchema>;

export type TNewsSlug = InferOutput<typeof NewsSlugSchema>;

export type TNewsListItemCollection = InferOutput<typeof NewsListItemCollectionSchema>;

export type TNewsFullItem = InferOutput<typeof NewsFullItemSchema>;
