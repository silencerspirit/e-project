import type { TPropertyFullItem, TPropertyListItem } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getPropertyBySlug(slug: string): Promise<TPropertyFullItem> {
  return cached(`/api/property/${slug}`, BASE_CACHE_TIME_MS, () =>
    strapiFetch<TPropertyFullItem>(`/api/property/${slug}`),
  );
}

export function getPropertySimilarBySlug(slug: string): Promise<{ list: TPropertyListItem[] }> {
  return cached(`/api/property/similar/${slug}`, BASE_CACHE_TIME_MS, async () =>
    strapiFetch<{ list: TPropertyListItem[] }>(`/api/property/similar/${slug}`),
  );
}
