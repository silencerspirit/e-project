import { PropertyListingPageSegmentsSchema, PropertyListingPageSort, type TPropertyListingPageQuery } from '@contracts';
import Cookie from 'js-cookie';
import { parse } from 'valibot';

import { getPropertyListingPageCount } from '@/api';
import { BUTTON_VARIANTS } from '@/components/ui/button/button.consts';
import { PROPERTY_MODIFY_SELECTOR } from '@/components/ui/property-card/property-card.consts';
import { assertNever, isHTMLElement } from '@/helpers';

import { FILTER_CODES, VIEW_COOKIE_NAME } from '../properties.consts';
import { FilterCode } from '../properties.enums';
import type { TElements, TFacet, TFilterGroup, TPriceFacet, TState } from '../properties.types';
import type { TParsedSegments } from '../properties.types';
import { buildSegmentsUrl, getPropertyTotalItemsText } from '../properties.utils';

const ACTIVE_CLASSES = BUTTON_VARIANTS.default.split(' ');
const INACTIVE_CLASSES = BUTTON_VARIANTS.outline.split(' ');

const ACTIVE_BUTTON_VIEW_CLASSES = ['text-primary', 'bg-card', 'shadow-sm'];
const INACTIVE_BUTTON_VIEW_CLASSES = ['text-muted-foreground', 'hover:text-foreground'];

const FILTER_GROUP_CONFIG: Record<
  TFilterGroup,
  {
    keys: FilterCode[];
    selector: string;
    read: (el: HTMLButtonElement) => TParsedSegments;
  }
> = {
  [FilterCode.PropertyType]: {
    keys: [FilterCode.PropertyType],
    selector: `[data-type="${FilterCode.PropertyType}"]`,
    read: (el) => ({ [FilterCode.PropertyType]: el.dataset.value?.trim() }),
  },
  [FilterCode.City]: {
    keys: [FilterCode.City],
    selector: `[data-type="${FilterCode.City}"]`,
    read: (el) => ({ [FilterCode.City]: el.dataset.value?.trim() }),
  },
  [FilterCode.PriceFrom]: {
    keys: [FilterCode.PriceFrom, FilterCode.PriceTo],
    selector: `[data-type="${FilterCode.PriceFrom}"]`,
    read: (el) => ({
      [FilterCode.PriceFrom]: el.dataset.from?.trim(),
      [FilterCode.PriceTo]: el.dataset.to?.trim(),
    }),
  },
};

function getElements(): TElements | null {
  const filtersAside = document.getElementById('filters');
  const submitFiltersButton = document.getElementById('submit-filters');
  const sortSelect = document.getElementById('property-sort-select');
  const buttonViewList = document.getElementById('button-view-list');
  const buttonViewGrid = document.getElementById('button-view-grid');
  const listingContainer = document.getElementById('property-listing');

  if (
    !isHTMLElement<HTMLSelectElement>(sortSelect) ||
    !isHTMLElement<HTMLDivElement>(filtersAside) ||
    !isHTMLElement<HTMLButtonElement>(submitFiltersButton) ||
    !isHTMLElement<HTMLButtonElement>(buttonViewList) ||
    !isHTMLElement<HTMLButtonElement>(buttonViewGrid) ||
    !isHTMLElement<HTMLDivElement>(listingContainer)
  ) {
    return null;
  }

  const filterButtons = Array.from(filtersAside.querySelectorAll<HTMLButtonElement>('[data-filter-button]'));
  const listingCards = Array.from<HTMLDivElement>(document.querySelectorAll('[data-listing-card]'));

  return {
    listingCards,
    listingContainer,
    buttonViewList,
    buttonViewGrid,
    filtersAside,
    submitFiltersButton,
    sortSelect,
    filterButtons,
  };
}

function createState(elements: TElements): TState {
  const filters = JSON.parse(elements.filtersAside.dataset.existFilters ?? '{}') as TParsedSegments;

  return {
    params: new URLSearchParams(window.location.search),
    filters,
    initialFilters: { ...filters },
    lastRequestId: 0,
  };
}

function onChangeSort(elements: TElements, state: TState) {
  const value = elements.sortSelect.value as PropertyListingPageSort;
  updateParams(state, 'sort', value !== PropertyListingPageSort.Default ? value : undefined);
  navigate(state);
}

function bindEvents(elements: TElements, state: TState) {
  elements.filterButtons.forEach((button) => {
    button.addEventListener('click', () => handleFilterClick(button, elements, state));
  });
  [elements.buttonViewGrid, elements.buttonViewList].forEach((button) =>
    button.addEventListener('click', () => onChangeView(button, elements)),
  );
  elements.submitFiltersButton.addEventListener('click', () => navigate(state));
  elements.sortSelect.addEventListener('change', () => onChangeSort(elements, state));
}

async function handleFilterClick(button: HTMLButtonElement, elements: TElements, state: TState) {
  setActiveButton(button);

  if (button.dataset.filterAll) clearFilterGroup(button, elements, state);
  else setFilterGroupValues(button, state);

  const segments = parse(PropertyListingPageSegmentsSchema, state.filters);
  const requestId = ++state.lastRequestId;
  const { filters, total } = await getPropertyListingPageCount(segments);

  if (requestId !== state.lastRequestId) return;

  updateSubmitButton(elements, state, total);
  updateFacetButtons(elements, FilterCode.PropertyType, filters.propertyTypes);
  updateFacetButtons(elements, FilterCode.City, filters.cities);
  updatePriceButtons(elements, filters.prices);
}

function setActiveButton(button: HTMLButtonElement) {
  button.parentElement?.querySelectorAll('button').forEach((item) => {
    item.classList.remove(...ACTIVE_CLASSES);
    item.classList.add(...INACTIVE_CLASSES);
  });

  button.classList.add(...ACTIVE_CLASSES);
  button.classList.remove(...INACTIVE_CLASSES);
}

function clearFilterGroup(button: HTMLButtonElement, elements: TElements, state: TState) {
  const group = getFilterGroup(button.dataset.type as FilterCode);

  FILTER_GROUP_CONFIG[group].keys.forEach((key) => delete state.filters[key]);
  getGroupButtons(elements, group).forEach((item) => {
    item.disabled = false;
  });
}

function setFilterGroupValues(button: HTMLButtonElement, state: TState) {
  const group = getFilterGroup(button.dataset.type as FilterCode);
  const nextValues = FILTER_GROUP_CONFIG[group].read(button);

  FILTER_GROUP_CONFIG[group].keys.forEach((key) => {
    const value = nextValues[key]?.trim();

    if (value) state.filters[key] = value;
    else delete state.filters[key];
  });
}

function getGroupButtons(elements: TElements, group: TFilterGroup): HTMLButtonElement[] {
  return Array.from(elements.filtersAside.querySelectorAll<HTMLButtonElement>(FILTER_GROUP_CONFIG[group].selector));
}

function getFilterGroup(type: FilterCode): TFilterGroup {
  switch (type) {
    case FilterCode.PropertyType:
    case FilterCode.City:
    case FilterCode.PriceFrom:
      return type;
    case FilterCode.PriceTo:
      return FilterCode.PriceFrom;
    default:
      return assertNever(type);
  }
}

function updateFacetButtons(elements: TElements, type: FilterCode.PropertyType | FilterCode.City, items: TFacet[]) {
  items.forEach((item) => {
    const button = elements.filtersAside.querySelector<HTMLButtonElement>(
      `[data-type="${type}"][data-value="${item.slug}"]`,
    );
    if (isHTMLElement<HTMLButtonElement>(button)) button.disabled = item.disabled;
  });
}

function updatePriceButtons(elements: TElements, items: TPriceFacet[]) {
  items.forEach((item) => {
    const button = elements.filtersAside.querySelector<HTMLButtonElement>(
      `[data-type="${FilterCode.PriceFrom}"][data-from="${item.from}"][data-to="${item.to}"]`,
    );

    if (isHTMLElement<HTMLButtonElement>(button)) button.disabled = item.disabled;
  });
}

function updateSubmitButton(elements: TElements, state: TState, total: number) {
  if (isInitialFiltersState(state)) {
    elements.submitFiltersButton.classList.add('hidden');
    return;
  }

  elements.submitFiltersButton.classList.remove('hidden');
  elements.submitFiltersButton.textContent = getPropertyTotalItemsText(total);
}

function isInitialFiltersState(state: TState): boolean {
  return FILTER_CODES.every((code) => (state.filters[code] ?? '') === (state.initialFilters[code] ?? ''));
}

function updateParams(state: TState, param: keyof TPropertyListingPageQuery, value?: string) {
  if (value) state.params.set(param, value);
  else state.params.delete(param);
}

function navigate(state: TState) {
  const stringifiedParams = state.params.toString();
  const paramsString = stringifiedParams ? `?${stringifiedParams}` : stringifiedParams;
  const segments = buildSegmentsUrl(state.filters);
  window.location.assign(`${segments}${paramsString}`);
}

function onChangeView(button: HTMLButtonElement, elements: TElements) {
  [elements.buttonViewGrid, elements.buttonViewList].forEach((b) => {
    b.classList.remove(...ACTIVE_BUTTON_VIEW_CLASSES);
    b.classList.add(...INACTIVE_BUTTON_VIEW_CLASSES);
  });

  button.classList.add(...ACTIVE_BUTTON_VIEW_CLASSES);
  button.classList.remove(...INACTIVE_BUTTON_VIEW_CLASSES);

  elements.listingContainer.classList[button.dataset.view === 'grid' ? 'add' : 'remove']('md:grid-cols-2');
  elements.listingCards.forEach((card) =>
    card.classList[button.dataset.view === 'list' ? 'add' : 'remove'](PROPERTY_MODIFY_SELECTOR),
  );

  Cookie.set(VIEW_COOKIE_NAME, button.dataset.view ?? '');
}

(() => {
  const elements = getElements();
  if (!elements) return;

  const state = createState(elements);
  bindEvents(elements, state);
})();
