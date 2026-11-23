import { GalleryPageResponseSchema, type TGalleryPage } from '@contracts';
import { parse } from 'valibot';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getGalleryPage(): Promise<TGalleryPage> {
  return cached('/api/gallery-page', BASE_CACHE_TIME_MS, async () =>
    parse(GalleryPageResponseSchema, await strapiFetch<unknown>('/api/gallery-page')),
  );
}
