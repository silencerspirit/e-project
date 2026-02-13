import { HeroBannerScheme } from './hero-banner.schemas';
import type { InferOutput } from 'valibot';

export type THeroBanner = InferOutput<typeof HeroBannerScheme>;
