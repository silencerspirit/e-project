import type { InferOutput } from 'valibot';
import { ShowcaseBannerScheme } from './showcase-banner.schemas';

export type TShowcaseBanner = InferOutput<typeof ShowcaseBannerScheme>;
