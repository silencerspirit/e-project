import type { InferOutput } from 'valibot';
import { type RequestBannerScheme } from './request-banner.schemas';

export type TRequestBanner = InferOutput<typeof RequestBannerScheme>;
