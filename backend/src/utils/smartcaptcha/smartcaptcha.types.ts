import type { HttpStatus } from '../../constants/http.enums';
import type { SmartCaptchaErrorReason } from './smartcaptcha.enums';

export interface ISmartCaptchaConfig {
  allowedHosts: string[];
  secretKey: string;
}

export type TSmartCaptchaErrorStatus = HttpStatus.BadRequest | HttpStatus.ServiceUnavailable;

export interface ISmartCaptchaDiagnostics {
  elapsedMs?: number;
  networkCode?: string;
  reason: SmartCaptchaErrorReason;
  upstreamStatus?: number;
}
