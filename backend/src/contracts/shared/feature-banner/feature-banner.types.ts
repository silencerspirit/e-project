import { FeatureBannerScheme } from './feature-banner.schemas';

import type { InferOutput } from 'valibot';

export type TFeatureBanner = InferOutput<typeof FeatureBannerScheme>;
