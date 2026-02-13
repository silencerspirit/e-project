import type { TMainPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getMainPage(): Promise<TMainPage> {
  return cached('/api/main-page', BASE_CACHE_TIME_MS, async () => {
    const json = await strapiFetch<TMainPage>('/api/main-page');
    return json;
  });
}
