import type { TSmartCaptchaErrorStatus } from './smartcaptcha.types';

export class SmartCaptchaError extends Error {
  readonly status: TSmartCaptchaErrorStatus;

  constructor(status: TSmartCaptchaErrorStatus, message: string) {
    super(message);
    this.name = SmartCaptchaError.name;
    this.status = status;
  }
}
