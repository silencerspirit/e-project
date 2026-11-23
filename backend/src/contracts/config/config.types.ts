import type { InferOutput } from 'valibot';
import { type SiteConfigSchema } from './config.schemas';

export type TSiteConfig = InferOutput<typeof SiteConfigSchema>;
