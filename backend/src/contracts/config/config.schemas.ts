import { nullish, object, string } from 'valibot';

export const SiteConfigSchema = /*#__PURE__*/ object({
  email: nullish(string(), undefined),
  phone: nullish(string(), undefined),
  address: nullish(string(), undefined),
  workTime: nullish(string(), undefined),
});
