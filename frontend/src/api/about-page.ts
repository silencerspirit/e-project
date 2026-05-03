import type { TAboutPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getAboutPage(): Promise<TAboutPage> {
  return cached('/api/about-page', BASE_CACHE_TIME_MS, () => strapiFetch<TAboutPage>('/api/about-page'));
}
