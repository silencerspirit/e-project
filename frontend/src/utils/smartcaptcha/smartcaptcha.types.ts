import type { SMARTCAPTCHA_CALLBACK_PREFIX, SMARTCAPTCHA_LANGUAGE } from './smartcaptcha.constants';
import type { SmartCaptchaEvent } from './smartcaptcha.enums';

export type TSmartCaptchaCallbackName = `${typeof SMARTCAPTCHA_CALLBACK_PREFIX}${number}`;

export interface ISmartCaptchaRenderOptions {
  callback: (token: string) => void;
  hl: typeof SMARTCAPTCHA_LANGUAGE;
  invisible: boolean;
  sitekey: string;
}

export interface ISmartCaptchaApi {
  destroy: (widgetId: number) => void;
  execute: (widgetId: number) => void;
  getResponse: (widgetId: number) => string;
  render: (container: HTMLElement, options: ISmartCaptchaRenderOptions) => number;
  subscribe: (widgetId: number, event: SmartCaptchaEvent, callback: () => void) => () => void;
}

declare global {
  interface Window {
    [key: TSmartCaptchaCallbackName]: (() => void) | undefined;
    smartCaptcha?: ISmartCaptchaApi;
  }
}
