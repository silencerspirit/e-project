import { InferOutput } from 'valibot';
import { SpecItemSchema } from './spec-item.schemas';

export type TSpecItem = InferOutput<typeof SpecItemSchema>;
