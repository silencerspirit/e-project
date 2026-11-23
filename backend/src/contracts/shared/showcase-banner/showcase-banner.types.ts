import type { InferOutput } from 'valibot';
import { type ShowcaseBannerScheme } from './showcase-banner.schemas';

export type TShowcaseBanner = InferOutput<typeof ShowcaseBannerScheme>;
