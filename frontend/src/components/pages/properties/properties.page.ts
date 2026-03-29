import {
  PropertyListingPageQuerySchema,
  PropertyListingPageRequestSchema,
  PropertyListingPageSegmentsSchema,
} from '@contracts';
import { parse } from 'valibot';

import type { TParsePropertyListingPageRequestResult } from './properties.types';
import { parseSegments } from './properties.utils';

export function parsePropertyListingPageRequest(
  searchParams: URLSearchParams,
  segments?: string,
): TParsePropertyListingPageRequestResult {
  const parsedSegments = parse(PropertyListingPageSegmentsSchema, parseSegments(segments));
  const params = Object.fromEntries(searchParams.entries());
  const query = parse(PropertyListingPageQuerySchema, params);
  const request = parse(PropertyListingPageRequestSchema, { ...parsedSegments, ...query });

  return {
    parsedSegments,
    query,
    request,
  };
}
