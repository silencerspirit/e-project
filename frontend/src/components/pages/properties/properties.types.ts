import type { TPropertyListingPageQuery, TPropertyListingPageRequest, TPropertyListingPageSegments } from '@contracts';

export type TParsedSegments = Partial<TPropertyListingPageSegments>;

export type TParsePropertyListingPageRequestResult = {
  parsedSegments: TParsedSegments;
  query: TPropertyListingPageQuery;
  request: TPropertyListingPageRequest;
};
