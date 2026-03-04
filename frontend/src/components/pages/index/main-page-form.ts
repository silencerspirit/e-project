import { MaskInput } from 'maska';

import { FilterCode } from '@/components/pages/properties/properties.enums';
import type { TParsedSegments } from '@/components/pages/properties/properties.types';
import { buildSegmentsUrl } from '@/components/pages/properties/properties.utils';
import { isHTMLElement } from '@/helpers';

(() => {
  new MaskInput('[data-maska]');

  const ALL_VALUE = 'all';

  const form = document.querySelector('[data-main-page-form]');
  const propertyTypeSelect = document.querySelector('[data-main-page-form-property-type]');
  const citySelect = document.querySelector('[data-main-page-form-city]');
  const budgetInput = document.querySelector('[data-main-page-form-budget]');

  if (
    !isHTMLElement<HTMLFormElement>(form) ||
    !isHTMLElement<HTMLSelectElement>(propertyTypeSelect) ||
    !isHTMLElement<HTMLSelectElement>(citySelect) ||
    !isHTMLElement<HTMLInputElement>(budgetInput)
  ) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const filters = getFilters(propertyTypeSelect, citySelect, budgetInput);
    const url = buildSegmentsUrl(filters);

    window.location.assign(url);
  });

  function getFilters(
    propertyTypeField: HTMLSelectElement,
    cityField: HTMLSelectElement,
    budgetField: HTMLInputElement,
  ): TParsedSegments {
    const filters: TParsedSegments = {};
    const propertyType = propertyTypeField.value.trim();
    const city = cityField.value.trim();
    const budget = normalizeBudgetValue(budgetField.value, budgetField.max);

    if (propertyType && propertyType !== ALL_VALUE) filters[FilterCode.PropertyType] = propertyType;
    if (city && city !== ALL_VALUE) filters[FilterCode.City] = city;
    if (budget) filters[FilterCode.PriceTo] = budget;

    return filters;
  }

  function normalizeBudgetValue(value: string, maxValue: string): string {
    const normalizedValue = Number.parseInt(value.replace(/\D/g, ''), 10);
    const normalizedMaxValue = Number.parseInt(maxValue.replace(/\D/g, ''), 10);

    if (!Number.isFinite(normalizedValue) || normalizedValue <= 0) return '';
    if (!Number.isFinite(normalizedMaxValue) || normalizedMaxValue <= 0) return String(normalizedValue);

    return String(Math.min(normalizedValue, normalizedMaxValue));
  }
})();
