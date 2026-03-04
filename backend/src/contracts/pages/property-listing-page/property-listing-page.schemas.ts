import { PaginateSchema, SeoSchema } from '../../shared';
import { PropertyListItemSchema } from '../../property';
import { array, boolean, literal, nullish, number, object, pipe, string, trim, union } from 'valibot';
import { PropertyListingPageSort } from './property-listing-page.enums';

export const PropertyListingPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  seo: SeoSchema,
});

const PropertyListingPageSegmentsEntries = {
  type: nullish(string(), ''),
  city: nullish(string(), ''),
  'price-from': nullish(string(), ''),
  'price-to': nullish(string(), ''),
} as const;

const PropertyListingPageQueryEntries = {
  page: nullish(string(), '1'),
  sort: nullish(
    union([
      literal(PropertyListingPageSort.Default),
      literal(PropertyListingPageSort.PriceAsc),
      literal(PropertyListingPageSort.PriceDesc),
    ]),
    PropertyListingPageSort.Default,
  ),
} as const;

export const PropertyListingPageSegmentsSchema = /*#__PURE__*/ object(PropertyListingPageSegmentsEntries);

export const PropertyListingPageQuerySchema = /*#__PURE__*/ object(PropertyListingPageQueryEntries);

export const PropertyListingPageRequestSchema = /*#__PURE__*/ object({
  ...PropertyListingPageSegmentsEntries,
  ...PropertyListingPageQueryEntries,
});

export const PropertyListingPageFacetSchema = /*#__PURE__*/ object({
  name: pipe(string(), trim()),
  slug: pipe(string(), trim()),
  disabled: boolean(),
});

export const PropertyListingPageFiltersSchema = /*#__PURE__*/ object({
  propertyTypes: nullish(array(PropertyListingPageFacetSchema), []),
  cities: nullish(array(PropertyListingPageFacetSchema), []),
  prices: nullish(
    array(
      object({
        from: number(),
        to: number(),
        disabled: boolean(),
      }),
    ),
    [],
  ),
});

export const PropertyListingPageListSchema = /*#__PURE__*/ object({
  list: nullish(array(PropertyListItemSchema), []),
  filters: PropertyListingPageFiltersSchema,
  paginate: PaginateSchema,
});

export const PropertyListingPageCountSchema = /*#__PURE__*/ object({
  total: number(),
  filters: PropertyListingPageFiltersSchema,
});
