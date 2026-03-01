import type { TPropertyListingPageSegments } from '@contracts';

import type { FilterCode } from './properties.enums';

export type TParsedSegments = Partial<TPropertyListingPageSegments>;
export type TFilterGroup = FilterCode.PropertyType | FilterCode.City | FilterCode.PriceFrom;
export type TFacet = { slug: string; disabled: boolean };
export type TPriceFacet = { from: number; to: number; disabled: boolean };
export type TElements = {
  filtersAside: HTMLElement;
  listingContainer: HTMLDivElement;
  submitFiltersButton: HTMLButtonElement;
  buttonViewGrid: HTMLButtonElement;
  buttonViewList: HTMLButtonElement;
  sortSelect: HTMLSelectElement;
  filterButtons: HTMLButtonElement[];
  listingCards: HTMLDivElement[];
};
export type TState = {
  filters: TParsedSegments;
  initialFilters: TParsedSegments;
  lastRequestId: number;
  params: URLSearchParams;
};
