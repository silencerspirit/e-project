import { FeatureItemScheme } from './feature-item.schemas';

import type { InferOutput } from 'valibot';

export type TFeatureItem = InferOutput<typeof FeatureItemScheme>;
