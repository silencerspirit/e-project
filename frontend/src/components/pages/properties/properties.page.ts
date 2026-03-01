import {
  PropertyListingPageQuerySchema,
  PropertyListingPageRequestSchema,
  PropertyListingPageSegmentsSchema,
  type TPropertyListingPageQuery,
  type TPropertyListingPageRequest,
} from '@contracts';
import { parse } from 'valibot';

import type { TParsedSegments } from './properties.types';
import { parseSegments } from './properties.utils';

type TParsePropertyListingPageRequestResult = {
  parsedSegments: TParsedSegments;
  query: TPropertyListingPageQuery;
  request: TPropertyListingPageRequest;
};

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
