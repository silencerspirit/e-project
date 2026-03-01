import { FilterCode } from './properties.enums';

export const FILTER_CODES: readonly FilterCode[] = [
  FilterCode.PropertyType,
  FilterCode.City,
  FilterCode.PriceFrom,
  FilterCode.PriceTo,
];

export const VIEW_COOKIE_NAME = 'listing-view' as const;

export const VIEW_COOKIE_VALUES = ['grid', 'list'] as const;

export const PROPERTY_TOTAL_ITEMS_TEXT_TEMPLATES = [
  'Найден {count} объект',
  'Найдено {count} объекта',
  'Найдено {count} объектов',
] as const;
