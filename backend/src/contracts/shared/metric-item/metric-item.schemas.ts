import { object, string } from 'valibot';

export const MetricItemScheme = object({
  value: string(),
  label: string(),
});
