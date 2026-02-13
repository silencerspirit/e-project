import type { InferOutput } from 'valibot';
import { MetricItemScheme } from './metric-item.schemas';

export type TMetricItem = InferOutput<typeof MetricItemScheme>;
