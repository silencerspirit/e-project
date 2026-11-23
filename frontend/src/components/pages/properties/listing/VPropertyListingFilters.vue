<template>
  <aside
    class="v-property-listing-filters sticky top-36 z-10 flex w-72 shrink-0 flex-col gap-6 self-start rounded-2xl border border-border bg-card py-6"
    aria-labelledby="v-property-listing-filters-title"
    :class="{ 'v-property-listing-filters--active': active }"
    tabindex="-1"
  >
    <div class="flex justify-between px-4">
      <h3
        id="v-property-listing-filters-title"
        class="text-lg font-semibold text-foreground"
      >
        Фильтры
      </h3>

      <button
        id="v-property-listing-filters-close"
        type="button"
        class="inline-block xl:hidden"
        aria-label="Закрыть фильтры"
        @click="onFiltersClose"
      >
        <X
          aria-hidden="true"
          class="h-4 w-4"
        />
      </button>
    </div>

    <div class="px-4">
      <span class="mb-2 block text-sm font-medium text-foreground">Тип недвижимости</span>
      <div class="flex flex-wrap gap-2">
        <VButton
          :variant="stateFilters?.[FilterCode.PropertyType] ? ButtonVariant.Outline : ButtonVariant.Default"
          @click="onResetPropertyType"
        >
          Все объекты
        </VButton>

        <VButton
          v-for="type in propertyTypeButtons"
          :key="type.slug"
          :variant="
            stateFilters?.[FilterCode.PropertyType] === type.slug ? ButtonVariant.Default : ButtonVariant.Outline
          "
          :disabled="type.disabled"
          @click="type.onClick"
        >
          {{ type.name }}
        </VButton>
      </div>
    </div>
    <div class="px-4">
      <span class="mb-2 block text-sm font-medium text-foreground">Город</span>
      <div class="flex flex-wrap gap-2">
        <VButton
          :variant="stateFilters?.[FilterCode.City] ? ButtonVariant.Outline : ButtonVariant.Default"
          @click="onResetCity"
        >
          Все города
        </VButton>

        <VButton
          v-for="city in cityButtons"
          :key="city.slug"
          :variant="stateFilters?.[FilterCode.City] === city.slug ? ButtonVariant.Default : ButtonVariant.Outline"
          :disabled="city.disabled"
          @click="city.onClick"
        >
          {{ city.name }}
        </VButton>
      </div>
    </div>
    <div class="px-4">
      <span class="mb-2 block text-sm font-medium text-foreground">Бюджет</span>
      <div class="flex flex-wrap gap-2">
        <VButton
          :variant="
            stateFilters?.[FilterCode.PriceFrom] || stateFilters?.[FilterCode.PriceTo]
              ? ButtonVariant.Outline
              : ButtonVariant.Default
          "
          @click="onResetPrice"
        >
          Любая цена
        </VButton>

        <VButton
          v-for="{ price, label, onClick } in priceButtons"
          :key="price.from"
          :variant="getPriceButtonVariant(price)"
          :disabled="price.disabled"
          @click="onClick"
        >
          {{ label }}
        </VButton>
      </div>
    </div>

    <div class="mt-auto flex flex-col gap-2 px-4">
      <slot name="submitButton" />

      <VButton
        :variant="ButtonVariant.Outline"
        tag="a"
        href="/properties/"
        :class="{ hidden: !filtersAvailable }"
      >
        <X
          aria-hidden="true"
          class="h-4 w-4 text-foreground"
        />
        Сбросить фильтры
      </VButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { TPropertyListingPageFilters } from '@contracts';
import type { TSlot } from 'global';
import { X } from 'lucide-vue-next';
import { computed } from 'vue';

import { ButtonVariant } from '@/components/vue/button/button.enums';
import VButton from '@/components/vue/button/VButton.vue';

import { FilterCode } from '../properties.enums';
import type { IPropertyFilterUpdatePayload, TParsedSegments } from '../properties.types';

type TFacetButton = Pick<TPropertyListingPageFilters['cities'][number], 'disabled' | 'name' | 'slug'> & {
  onClick: () => void;
};
type TPriceFilter = TPropertyListingPageFilters['prices'][number];
interface IPriceButton {
  label: string;
  onClick: () => void;
  price: TPriceFilter;
}

const { parsedSegments, stateFilters, filters } = defineProps<{
  active: boolean;
  filters: TPropertyListingPageFilters;
  parsedSegments?: TParsedSegments;
  stateFilters: TParsedSegments;
}>();

const emit = defineEmits<{
  filtersClose: [];
  filterUpdate: [payload: IPropertyFilterUpdatePayload];
}>();

defineSlots<{
  submitButton(): TSlot;
}>();

const PRICE_LABEL_FORMATTERS = [formatMaxPrice, formatRangePrice, formatMinPrice];

const propertyTypeButtons = computed<TFacetButton[]>(() =>
  filters.propertyTypes.map((type) => ({
    ...type,
    onClick() {
      onFilterUpdate({ code: FilterCode.PropertyType, value: type.slug });
    },
  })),
);
const cityButtons = computed<TFacetButton[]>(() =>
  filters.cities.map((city) => ({
    ...city,
    onClick() {
      onFilterUpdate({ code: FilterCode.City, value: city.slug });
    },
  })),
);
const priceButtons = computed<IPriceButton[]>(() => filters.prices.map(createPriceButton));

const filtersAvailable = computed<boolean>(() => Object.values(parsedSegments ?? {}).filter(Boolean).length > 0);

function formatThousands(price: number): string {
  return `${Math.floor(price / 1_000)} тыс.`;
}

function formatMaxPrice(price: TPriceFilter): string {
  return `до ${formatThousands(price.to)}`;
}

function formatRangePrice(price: TPriceFilter): string {
  return `от ${formatThousands(price.from)} до ${formatThousands(price.to)}`;
}

function formatMinPrice(price: TPriceFilter): string {
  return `от ${formatThousands(price.from)}`;
}

function createPriceButton(price: TPriceFilter, index: number): IPriceButton {
  return {
    price,
    label: PRICE_LABEL_FORMATTERS[index](price),
    onClick() {
      onFilterUpdate({ code: FilterCode.PriceFrom, value: `${price.from}` });
      onFilterUpdate({ code: FilterCode.PriceTo, value: `${price.to}` });
    },
  };
}

function getPriceButtonVariant(price: TPropertyListingPageFilters['prices'][number]): ButtonVariant {
  const priceForm = Number(stateFilters?.[FilterCode.PriceFrom]);
  const priceTo = Number(stateFilters?.[FilterCode.PriceTo]);

  if (price.disabled) return ButtonVariant.Outline;

  if (price.from === priceForm && price.to === priceTo) return ButtonVariant.Default;

  return ButtonVariant.Outline;
}

function onFilterUpdate(payload: IPropertyFilterUpdatePayload) {
  emit('filterUpdate', payload);
}

function onFiltersClose() {
  emit('filtersClose');
}

function onResetPropertyType() {
  onFilterUpdate({ code: FilterCode.PropertyType, value: '' });
}

function onResetCity() {
  onFilterUpdate({ code: FilterCode.City, value: '' });
}

function onResetPrice() {
  onFilterUpdate({ code: FilterCode.PriceFrom, value: '' });
  onFilterUpdate({ code: FilterCode.PriceTo, value: '' });
}
</script>

<style lang="scss">
@use '@/styles/mixins.scss' as *;

.v-property-listing-filters {
  @include hide-scrollbar-but-scrolling();

  transition:
    transform 0.3s ease,
    visibility 0s linear 0.3s;

  @media (max-width: calc(#{theme('screens.xl')} - 1px)) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 0;
    overflow-y: auto;
    min-height: 100dvh;
    padding-top: theme('spacing.2');
    z-index: 99;
    transform: translateX(-100%);
    visibility: hidden;
  }

  @media (max-width: calc(#{theme('screens.sm')} - 1px)) {
    width: 100%;
  }

  &--active {
    transform: translateX(0);
    visibility: visible;
    transition-delay: 0s;
  }
}
</style>
