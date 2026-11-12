import type { HttpStatus } from '../../constants/http.enums';

export interface ISmartCaptchaConfig {
  allowedHosts: string[];
  secretKey: string;
}

export type TSmartCaptchaErrorStatus = HttpStatus.BadRequest | HttpStatus.ServiceUnavailable;
