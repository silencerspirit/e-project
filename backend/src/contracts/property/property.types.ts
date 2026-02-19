import { type InferOutput } from 'valibot';
import { PropertyFullItemSchema, PropertyListItemSchema, PropertySlugSchema } from './property.schemas';

export type TPropertySlug = InferOutput<typeof PropertySlugSchema>;
export type TPropertyListItem = InferOutput<typeof PropertyListItemSchema>;
export type TPropertyFullItem = InferOutput<typeof PropertyFullItemSchema>;
