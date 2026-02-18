import { string, object } from 'valibot';

export const BadgeSchema = object({
  value: string(),
});
