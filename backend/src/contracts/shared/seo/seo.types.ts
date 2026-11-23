import { type InferOutput } from 'valibot';
import { type SeoSchema } from './seo.schemas';

export type TSeo = InferOutput<typeof SeoSchema>;
