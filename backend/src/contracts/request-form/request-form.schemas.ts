import { maxLength, minLength, nullish, object, pipe, string, trim } from 'valibot';
import { REQUEST_FORM_CAPTCHA_TOKEN_MAX_LENGTH, REQUEST_FORM_CAPTCHA_TOKEN_MIN_LENGTH } from './request-form.constants';

export const RequestFormSchema = /*#__PURE__*/ object({
  phone: pipe(string(), trim()),
  name: nullish(pipe(string(), trim()), ''),
  comment: nullish(pipe(string(), trim()), ''),
  pageUrl: nullish(pipe(string(), trim()), ''),
});

export const RequestFormSubmissionSchema = /*#__PURE__*/ object({
  ...RequestFormSchema.entries,
  captchaToken: pipe(
    string(),
    trim(),
    minLength(REQUEST_FORM_CAPTCHA_TOKEN_MIN_LENGTH),
    maxLength(REQUEST_FORM_CAPTCHA_TOKEN_MAX_LENGTH),
  ),
});
