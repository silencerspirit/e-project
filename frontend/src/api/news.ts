import type { IPage, TNewsFullItem, TNewsListItem, TNewsListItemCollection, TNewsQuery } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getNewsNewest(): Promise<{ list: TNewsListItem[] }> {
  return cached('/api/news/newest', BASE_CACHE_TIME_MS, () =>
    strapiFetch<{ list: TNewsListItem[] }>('/api/news/newest'),
  );
}

export function getNewsBySlug(slug: string): Promise<TNewsFullItem> {
  return strapiFetch<TNewsFullItem>(`/api/news/${slug}`);
}

export function getNewsList(query: TNewsQuery): Promise<TNewsListItemCollection> {
  return strapiFetch<TNewsListItemCollection>(`/api/news/list?${new URLSearchParams(query).toString()}`);
}

export function getNewsPage(): Promise<IPage> {
  return strapiFetch<IPage>('/api/news/page');
}
