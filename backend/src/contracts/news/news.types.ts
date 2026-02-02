import { type InferOutput } from 'valibot';
import { NewsListItemSchema, NewsQuerySchema } from './news.schemas';

export type TNewsQuery = InferOutput<typeof NewsQuerySchema>;

export type TNewsListItem = InferOutput<typeof NewsListItemSchema>;
