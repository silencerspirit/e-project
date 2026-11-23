import type { TContactsPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getContactsPage(): Promise<TContactsPage> {
  return cached('/api/contacts-page', BASE_CACHE_TIME_MS, () => strapiFetch<TContactsPage>('/api/contacts-page'));
}
