import type { ISmartCaptchaDiagnostics, TSmartCaptchaErrorStatus } from './smartcaptcha.types';

export class SmartCaptchaError extends Error {
  readonly diagnostics?: Readonly<ISmartCaptchaDiagnostics>;
  readonly status: TSmartCaptchaErrorStatus;

  constructor(status: TSmartCaptchaErrorStatus, message: string, diagnostics?: ISmartCaptchaDiagnostics) {
    super(message);
    this.name = SmartCaptchaError.name;
    this.status = status;
    this.diagnostics = diagnostics;
  }
}
