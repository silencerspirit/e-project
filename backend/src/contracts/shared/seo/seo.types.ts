import { InferOutput } from 'valibot';
import { SeoSchema } from './seo.schemas';

export type TSeo = InferOutput<typeof SeoSchema>;
