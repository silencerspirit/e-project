import type { TMainPage, TMainPageForm } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getMainPage(): Promise<TMainPage> {
  return cached('/api/main-page', BASE_CACHE_TIME_MS, () => strapiFetch<TMainPage>('/api/main-page'));
}

export function getMainPageForm(): Promise<TMainPageForm> {
  return cached('/api/main-page-form', BASE_CACHE_TIME_MS, () => strapiFetch<TMainPageForm>('/api/main-page-form'));
}
