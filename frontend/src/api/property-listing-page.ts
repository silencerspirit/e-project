import type { TPropertyListingPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getPropertyListingPage(): Promise<TPropertyListingPage> {
  return cached('/api/property-listing-page', BASE_CACHE_TIME_MS, () =>
    strapiFetch<TPropertyListingPage>('/api/property-listing-page'),
  );
}
