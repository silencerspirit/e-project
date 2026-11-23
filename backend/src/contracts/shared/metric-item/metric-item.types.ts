import type { InferOutput } from 'valibot';
import { type MetricItemScheme } from './metric-item.schemas';

export type TMetricItem = InferOutput<typeof MetricItemScheme>;
