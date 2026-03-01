import { object, string } from 'valibot';

export const MetricItemScheme = /*#__PURE__*/ object({
  value: string(),
  label: string(),
});
