import { type InferOutput } from 'valibot';
import { PropertyTypeSchema } from './property-type.schemas';

export type TPropertyType = InferOutput<typeof PropertyTypeSchema>;
