import { type InferOutput } from 'valibot';
import {
  type PropertyFullItemSchema,
  type PropertyListItemSchema,
  type PropertySlugListItemSchema,
  type PropertySlugListSchema,
  type PropertySlugSchema,
} from './property.schemas';

export type TPropertySlug = InferOutput<typeof PropertySlugSchema>;
export type TPropertySlugListItem = InferOutput<typeof PropertySlugListItemSchema>;
export type TPropertySlugList = InferOutput<typeof PropertySlugListSchema>;
export type TPropertyListItem = InferOutput<typeof PropertyListItemSchema>;
export type TPropertyFullItem = InferOutput<typeof PropertyFullItemSchema>;
