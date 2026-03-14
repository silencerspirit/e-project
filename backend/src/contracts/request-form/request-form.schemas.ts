import { nullish, object, pipe, string, trim } from 'valibot';

export const RequestFormSchema = /*#__PURE__*/ object({
  phone: pipe(string(), trim()),
  name: nullish(pipe(string(), trim()), ''),
});
