import type { TNewsFullItem, TNewsListItem } from '@contracts';
import { cached, strapiFetch } from '@/utils';
import { BASE_CACHE_TIME_MS } from '@/constants';

export function getNewsNewest(): Promise<{ list: TNewsListItem[] }> {
  return cached('/api/news/newest', BASE_CACHE_TIME_MS, async () => {
    const json = await strapiFetch<{ list: TNewsListItem[] }>('/api/news/newest');
    return json;
  });
}

export function getNewsBySlug(slug: string): Promise<TNewsFullItem> {
  return strapiFetch<TNewsFullItem>(`/api/news/${slug}`);
}
