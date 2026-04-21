interface ImportMetaEnv {
  readonly PUBLIC_STRAPI_URL: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly STRAPI_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'swiper/css/*';
