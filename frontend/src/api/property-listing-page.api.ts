import type {
  TPropertyListingPage,
  TPropertyListingPageCount,
  TPropertyListingPageList,
  TPropertyListingPageRequest,
  TPropertyListingPageSegments,
} from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getPropertyListingPage(): Promise<TPropertyListingPage> {
  return cached('/api/property-listing-page', BASE_CACHE_TIME_MS, () =>
    strapiFetch<TPropertyListingPage>('/api/property-listing-page'),
  );
}

export function getPropertyListingPageList(request: TPropertyListingPageRequest): Promise<TPropertyListingPageList> {
  const baseEndpoint = '/api/property-listing-page/list';
  const searchParams = new URLSearchParams(request);

  const endpoint = `${baseEndpoint}?${searchParams.toString()}`;

  return cached(endpoint, BASE_CACHE_TIME_MS, () => strapiFetch<TPropertyListingPageList>(endpoint));
}

export function getPropertyListingPageCount(
  segments: TPropertyListingPageSegments,
): Promise<TPropertyListingPageCount> {
  const baseEndpoint = '/api/property-listing-page/count';
  const searchParams = new URLSearchParams(segments);

  const endpoint = `${baseEndpoint}?${searchParams.toString()}`;
  return strapiFetch<TPropertyListingPageCount>(endpoint);
}
