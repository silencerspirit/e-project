import { array, nullish, object, string } from 'valibot';
import { BadgeSchema } from '../badge';

export const RequestBannerScheme = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  advantages: nullish(array(BadgeSchema), []),
});
