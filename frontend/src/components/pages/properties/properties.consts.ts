import { FilterCode } from './properties.enums';

export const FILTER_CODES: readonly FilterCode[] = [
  FilterCode.PropertyType,
  FilterCode.City,
  FilterCode.PriceFrom,
  FilterCode.PriceTo,
];

export const VIEW_COOKIE_NAME = 'listing-view' as const;
