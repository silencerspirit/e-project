import { type InferOutput } from 'valibot';
import {
  PropertyFullItemSchema,
  PropertySlugListItemSchema,
  PropertyListItemSchema,
  PropertySlugListSchema,
  PropertySlugSchema,
} from './property.schemas';

export type TPropertySlug = InferOutput<typeof PropertySlugSchema>;
export type TPropertySlugListItem = InferOutput<typeof PropertySlugListItemSchema>;
export type TPropertySlugList = InferOutput<typeof PropertySlugListSchema>;
export type TPropertyListItem = InferOutput<typeof PropertyListItemSchema>;
export type TPropertyFullItem = InferOutput<typeof PropertyFullItemSchema>;
