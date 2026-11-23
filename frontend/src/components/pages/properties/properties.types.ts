import type { TPropertyListingPageQuery, TPropertyListingPageRequest, TPropertyListingPageSegments } from '@contracts';

import type { FilterCode } from './properties.enums';

export interface IPropertyFilterUpdatePayload {
  code: FilterCode;
  value: string;
}

export type TParsedSegments = Partial<TPropertyListingPageSegments>;

export type TParsePropertyListingPageRequestResult = {
  parsedSegments: TParsedSegments;
  query: TPropertyListingPageQuery;
  request: TPropertyListingPageRequest;
};
