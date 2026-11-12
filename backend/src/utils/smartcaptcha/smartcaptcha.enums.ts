export enum SmartCaptchaStatus {
  Failed = 'failed',
  Ok = 'ok',
}

export enum SmartCaptchaErrorReason {
  InvalidResponse = 'invalid-response',
  MissingAllowedHosts = 'missing-allowed-hosts',
  MissingSecretKey = 'missing-secret-key',
  RequestFailed = 'request-failed',
  RequestTimeout = 'request-timeout',
  UnexpectedHttpStatus = 'unexpected-http-status',
}
