export default ({ env }: { env: EnvFn }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: {
    koa: env.bool('TRUST_PROXY', false),
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
