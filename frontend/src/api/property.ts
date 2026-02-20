import type { TPropertyFullItem } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getPropertyBySlug(slug: string): Promise<TPropertyFullItem> {
  return cached(`/api/property/${slug}`, BASE_CACHE_TIME_MS, async () => {
    const json = await strapiFetch<TPropertyFullItem>(`/api/property/${slug}`);
    return json;
  });
}
