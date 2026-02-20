import type { TMenu, TSiteConfig } from '@contracts';
import { BASE_CACHE_TIME_MS } from 'src/constants';
import { cached, strapiFetch } from 'src/utils';

export function getMenu(): Promise<TMenu> {
  return cached('/api/menu', BASE_CACHE_TIME_MS, async () => {
    const json = await strapiFetch<TMenu>('/api/menu');
    return json;
  });
}

export function getSiteConfig(): Promise<TSiteConfig> {
  return cached('/api/site-config', BASE_CACHE_TIME_MS, async () => {
    const json = await strapiFetch<TSiteConfig>('/api/site-config');
    return json;
  });
}
