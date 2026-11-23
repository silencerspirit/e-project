import { type InferOutput } from 'valibot';
import { type PropertyTypeSchema } from './property-type.schemas';

export type TPropertyType = InferOutput<typeof PropertyTypeSchema>;
