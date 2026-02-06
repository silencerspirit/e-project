import { type InferOutput } from 'valibot';
import { NewsListItemCollectionSchema, NewsListItemSchema, NewsQuerySchema } from './news.schemas';

export type TNewsQuery = InferOutput<typeof NewsQuerySchema>;

export type TNewsListItem = InferOutput<typeof NewsListItemSchema>;

export type TNewsListItemCollection = InferOutput<typeof NewsListItemCollectionSchema>;
