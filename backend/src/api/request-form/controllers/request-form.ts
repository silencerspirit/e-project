import { safeParse } from 'valibot';
import type { Core } from '@strapi/strapi';
import { HttpStatus } from '../../../constants/http.enums';
import { RequestFormSubmissionSchema } from '../../../contracts/request-form/request-form.schemas';
import { SmartCaptchaError } from '../../../utils/smartcaptcha/smartcaptcha.errors';
import { verifySmartCaptcha } from '../../../utils/smartcaptcha/smartcaptcha.utils';
import { REQUEST_FORM_LOG_MESSAGES, REQUEST_FORM_MESSAGES } from '../request-form.constants';
import type { Context } from 'koa';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async sendForm(context: Context & { request: { body: unknown } }) {
    const parsed = safeParse(RequestFormSubmissionSchema, context.request.body);

    if (!parsed.success) {
      return context.badRequest(REQUEST_FORM_MESSAGES.invalid);
    }

    const { captchaToken, ...form } = parsed.output;

    try {
      await verifySmartCaptcha(captchaToken, context.ip, {
        secretKey: strapi.config.get<string>('smartcaptcha.secretKey', ''),
        allowedHosts: strapi.config.get<string[]>('smartcaptcha.allowedHosts', []),
      });
    } catch (error) {
      if (error instanceof SmartCaptchaError) {
        if (error.status === HttpStatus.BadRequest) return context.badRequest(error.message);
        strapi.log.warn(`${REQUEST_FORM_LOG_MESSAGES.captchaUnavailable} ${JSON.stringify(error.diagnostics ?? {})}`);
        return context.serviceUnavailable(error.message);
      }
      throw error;
    }

    try {
      await strapi.service('api::request-form.request-form').sendForm(form);
      return {};
    } catch {
      strapi.log.error(REQUEST_FORM_LOG_MESSAGES.emailFailed);
      return context.internalServerError(REQUEST_FORM_MESSAGES.failed);
    }
  },
});
