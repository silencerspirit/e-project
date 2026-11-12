export class SmartCaptchaClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = SmartCaptchaClientError.name;
  }
}
