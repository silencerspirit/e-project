import type { TPersonalDataPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getPersonalDataPage(): Promise<TPersonalDataPage> {
  return cached('/api/personal-data-page', BASE_CACHE_TIME_MS, () =>
    strapiFetch<TPersonalDataPage>('/api/personal-data-page'),
  );
}
