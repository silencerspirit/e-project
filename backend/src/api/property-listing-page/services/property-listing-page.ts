import {
  type TPropertyListingPageFacet,
  type TPropertyListingPageRequest,
  DEFAULT_PAGINATE_LIMIT,
  PropertyListingPageSort,
  PropertyTypeSchema,
  TPropertyType,
  TPropertyListingPageFilters,
} from '@/contracts';
import { CitySchema, TCity } from '@/contracts/city';
import { sortByOrder } from '@/utils';
import { factories } from '@strapi/strapi';
import { parse } from 'valibot';

type TPropertyFacetMap = Map<string, TPropertyListingPageFacet>;
type TPriceFacet = { from: number; to: number; disabled: boolean };
type TFacetGroup = keyof TPropertyListingPageFilters;
type TPropertySortNotation = 'publishedAt:desc' | 'priceFrom:asc' | 'priceFrom:desc';
type TPropertyFacetSourceItem = {
  priceFrom: number | null;
  city: TCity | null;
  propertyType: TPropertyType | null;
};

const THOUSAND = 1_000;

function parseFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function buildFiltersQuery(request: TPropertyListingPageRequest): Record<string, unknown> {
  const minPrice = parseFiniteNumber(request['price-from']);
  const maxPrice = parseFiniteNumber(request['price-to']);

  return {
    ...(request.type ? { propertyType: { slug: request.type } } : {}),
    ...(request.city ? { city: { slug: request.city } } : {}),
    ...(minPrice !== null || maxPrice !== null
      ? {
          priceFrom: {
            ...(minPrice !== null ? { $gte: minPrice } : {}),
            ...(maxPrice !== null ? { $lte: maxPrice } : {}),
          },
        }
      : {}),
  };
}

function buildSortQuery(sort: PropertyListingPageSort): TPropertySortNotation[] {
  switch (sort) {
    case PropertyListingPageSort.PriceAsc:
      return ['priceFrom:asc', 'publishedAt:desc'];
    case PropertyListingPageSort.PriceDesc:
      return ['priceFrom:desc', 'publishedAt:desc'];
    case PropertyListingPageSort.Default:
    default:
      return ['publishedAt:desc'];
  }
}

function normalizeFacetItem(item: Record<string, unknown>): TPropertyFacetSourceItem {
  return {
    priceFrom: parseFiniteNumber(item.priceFrom),
    city: item.city ? parse(CitySchema, item.city) : null,
    propertyType: item.propertyType ? parse(PropertyTypeSchema, item.propertyType) : null,
  };
}

function matchesFacetItem(
  item: TPropertyFacetSourceItem,
  request: TPropertyListingPageRequest,
  excludedGroup?: TFacetGroup,
): boolean {
  const minPrice = parseFiniteNumber(request['price-from']);
  const maxPrice = parseFiniteNumber(request['price-to']);

  if (excludedGroup !== 'propertyTypes' && request.type && item.propertyType?.slug !== request.type) {
    return false;
  }

  if (excludedGroup !== 'cities' && request.city && item.city?.slug !== request.city) {
    return false;
  }

  if (excludedGroup !== 'prices') {
    if (minPrice !== null && (item.priceFrom === null || item.priceFrom < minPrice)) {
      return false;
    }

    if (maxPrice !== null && (item.priceFrom === null || item.priceFrom > maxPrice)) {
      return false;
    }
  }

  return true;
}

function setFacetMap(map: TPropertyFacetMap, facet: TCity | TPropertyType) {
  const existing = facet && map.get(facet.slug);
  if (existing || !facet) {
    return;
  }

  map.set(facet.slug, {
    name: facet.name,
    slug: facet.slug,
    order: facet.order,
    disabled: true,
  });
}

function enableFacetMap(map: TPropertyFacetMap, facet: TCity | TPropertyType) {
  const existing = facet && map.get(facet.slug);
  if (!existing || !facet) {
    return;
  }

  existing.disabled = false;
}

function toThousands(price: number): number {
  return Math.floor(price / THOUSAND) * THOUSAND;
}

function createPriceFacets(prices: number[]): TPriceFacet[] {
  if (!prices.length) {
    return [];
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const average = (min + max) / 2;
  const offset = (average - min) / 2;

  return [
    {
      from: 0,
      to: min + offset,
      disabled: true,
    },
    {
      from: min + offset,
      to: average,
      disabled: true,
    },
    {
      from: average,
      to: max + offset,
      disabled: true,
    },
  ];
}

export default factories.createCoreService('api::property-listing-page.property-listing-page', ({ strapi }) => ({
  async getPropertyListingPageCount(request: TPropertyListingPageRequest) {
    const propertyDocuments = strapi.documents('api::property.property');
    const allPublishedFacetItemsRaw = await propertyDocuments.findMany({
      status: 'published',
      fields: ['title', 'priceFrom'],
      populate: {
        city: {
          fields: ['slug', 'name', 'order'],
        },
        propertyType: {
          fields: ['slug', 'name', 'order'],
        },
      },
    });
    const allPublishedFacetItems = allPublishedFacetItemsRaw.map((item) => normalizeFacetItem(item));

    const propertyTypeFacetMap: TPropertyFacetMap = new Map();
    const cityFacetMap: TPropertyFacetMap = new Map();
    const priceRange: number[] = [];

    for (const item of allPublishedFacetItems) {
      if (item.propertyType) setFacetMap(propertyTypeFacetMap, item.propertyType);
      if (item.city) setFacetMap(cityFacetMap, item.city);
      if (item.priceFrom !== null) priceRange.push(toThousands(item.priceFrom));
    }

    const prices = createPriceFacets(priceRange);
    const [firstRange, secondRange, thirdRange] = prices;
    const filteredItems = allPublishedFacetItems.filter((item) => matchesFacetItem(item, request));
    const typeFacetItems = allPublishedFacetItems.filter((item) => matchesFacetItem(item, request, 'propertyTypes'));
    const cityFacetItems = allPublishedFacetItems.filter((item) => matchesFacetItem(item, request, 'cities'));
    const priceFacetItems = allPublishedFacetItems.filter((item) => matchesFacetItem(item, request, 'prices'));

    for (const item of typeFacetItems) if (item.propertyType) enableFacetMap(propertyTypeFacetMap, item.propertyType);

    for (const item of cityFacetItems) if (item.city) enableFacetMap(cityFacetMap, item.city);

    for (const item of priceFacetItems) {
      if (item.priceFrom === null) {
        continue;
      }

      const price = item.priceFrom;

      if (firstRange && firstRange.disabled && firstRange.to >= price) firstRange.disabled = false;
      if (secondRange && secondRange.disabled && secondRange.from < price && secondRange.to >= price)
        secondRange.disabled = false;
      if (thirdRange && thirdRange.disabled && thirdRange.from < price) thirdRange.disabled = false;
    }

    return {
      total: filteredItems.length,
      filters: {
        cities: [...cityFacetMap.values()].sort(sortByOrder),
        propertyTypes: [...propertyTypeFacetMap.values()].sort(sortByOrder),
        prices,
      },
    };
  },

  async getPropertyListingPageList(request: TPropertyListingPageRequest) {
    const filtersQuery = buildFiltersQuery(request);
    const sortQuery = buildSortQuery(request.sort);
    const hasFilters = Object.keys(filtersQuery).length > 0;
    const baseQuery = {
      status: 'published',
      ...(hasFilters ? { filters: filtersQuery } : {}),
    } as const;

    const page = Number(request.page);
    const start = (page - 1) * DEFAULT_PAGINATE_LIMIT;

    const propertyDocuments = strapi.documents('api::property.property');

    const [{ total, filters }, list] = await Promise.all([
      this.getPropertyListingPageCount(request),
      propertyDocuments.findMany({
        ...baseQuery,
        sort: sortQuery,
        start,
        limit: DEFAULT_PAGINATE_LIMIT,
        populate: {
          badges: true,
          specifications: true,
          city: {
            fields: ['slug', 'name'],
          },
          propertyType: {
            fields: ['slug', 'name'],
          },
          previewImage: {
            populate: {
              image: true,
            },
          },
        },
      }),
    ]);

    return {
      total,
      list,
      filters,
    };
  },
}));
