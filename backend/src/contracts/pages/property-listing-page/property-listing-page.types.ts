import type { InferOutput } from 'valibot';
import {
  PropertyListingPageSchema,
  PropertyListingPageFacetSchema,
  PropertyListingPageSegmentsSchema,
  PropertyListingPageQuerySchema,
  PropertyListingPageRequestSchema,
  PropertyListingPageFiltersSchema,
  PropertyListingPageListSchema,
  PropertyListingPageCountSchema,
} from './property-listing-page.schemas';

export type TPropertyListingPage = InferOutput<typeof PropertyListingPageSchema>;

export type TPropertyListingPageSegments = InferOutput<typeof PropertyListingPageSegmentsSchema>;
export type TPropertyListingPageQuery = InferOutput<typeof PropertyListingPageQuerySchema>;
export type TPropertyListingPageRequest = InferOutput<typeof PropertyListingPageRequestSchema>;
export type TPropertyListingPageFacet = InferOutput<typeof PropertyListingPageFacetSchema>;
export type TPropertyListingPageFilters = InferOutput<typeof PropertyListingPageFiltersSchema>;
export type TPropertyListingPageList = InferOutput<typeof PropertyListingPageListSchema>;
export type TPropertyListingPageCount = InferOutput<typeof PropertyListingPageCountSchema>;
