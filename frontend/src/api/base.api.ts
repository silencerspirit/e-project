import type { TMenu, TRequestFormSubmission, TSiteConfig } from '@contracts';
import { BASE_CACHE_TIME_MS } from 'src/constants';
import { cached, strapiFetch } from 'src/utils';

export function getMenu(): Promise<TMenu> {
  return cached('/api/menu', BASE_CACHE_TIME_MS, () => strapiFetch<TMenu>('/api/menu'));
}

export function getSiteConfig(): Promise<TSiteConfig> {
  return cached('/api/site-config', BASE_CACHE_TIME_MS, () => strapiFetch<TSiteConfig>('/api/site-config'));
}

export async function postRequestForm(body: TRequestFormSubmission) {
  await strapiFetch('/api/request-form', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
