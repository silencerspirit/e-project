import { type InferOutput } from 'valibot';
import { PropertyListItemSchema, PropertySlugSchema } from './property.schemas';

export type TPropertySlug = InferOutput<typeof PropertySlugSchema>;
export type TPropertyListItem = InferOutput<typeof PropertyListItemSchema>;
