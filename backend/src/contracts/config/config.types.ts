import type { InferOutput } from 'valibot';
import { SiteConfigSchema } from './config.schemas';

export type TSiteConfig = InferOutput<typeof SiteConfigSchema>;
