import type { TGalleryPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getGalleryPage(): Promise<TGalleryPage> {
  return cached('/api/gallery-page', BASE_CACHE_TIME_MS, () => strapiFetch<TGalleryPage>('/api/gallery-page'));
}
