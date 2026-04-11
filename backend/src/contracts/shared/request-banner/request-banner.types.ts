import type { InferOutput } from 'valibot';
import { RequestBannerScheme } from './request-banner.schemas';

export type TRequestBanner = InferOutput<typeof RequestBannerScheme>;
