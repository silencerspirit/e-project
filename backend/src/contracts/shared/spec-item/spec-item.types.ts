import { type InferOutput } from 'valibot';
import { type SpecItemSchema } from './spec-item.schemas';

export type TSpecItem = InferOutput<typeof SpecItemSchema>;
