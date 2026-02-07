import type { InferOutput } from 'valibot';
import { SiteConfigSchema } from './site-config.schemas';

export type TSiteConfig = InferOutput<typeof SiteConfigSchema>;
