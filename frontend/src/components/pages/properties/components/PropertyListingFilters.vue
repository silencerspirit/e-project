<template>
  <aside
    class="property-listing-filters sticky top-36 z-10 flex w-72 shrink-0 flex-col gap-6 self-start rounded-2xl border border-border bg-card py-6"
    aria-labelledby="property-listing-filters-title"
    :class="{ 'property-listing-filters--active': active }"
    tabindex="-1"
  >
    <div class="flex justify-between px-4">
      <h3
        id="property-listing-filters-title"
        class="text-lg font-semibold text-foreground"
      >
        Фильтры
      </h3>

      <button
        id="property-listing-filters-close"
        type="button"
        class="inline-block xl:hidden"
        aria-label="Закрыть фильтры"
        @click="emit('closeFilters')"
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
        <VueButton
          :variant="stateFilters?.[FilterCode.PropertyType] ? ButtonVariant.Outline : ButtonVariant.Default"
          @click="onUpdateFilter(FilterCode.PropertyType, '')"
        >
          Все объекты
        </VueButton>

        <VueButton
          v-for="type in filters.propertyTypes"
          :key="type.slug"
          :variant="
            stateFilters?.[FilterCode.PropertyType] === type.slug ? ButtonVariant.Default : ButtonVariant.Outline
          "
          :disabled="type.disabled"
          @click="onUpdateFilter(FilterCode.PropertyType, type.slug)"
        >
          {{ type.name }}
        </VueButton>
      </div>
    </div>
    <div class="px-4">
      <span class="mb-2 block text-sm font-medium text-foreground">Город</span>
      <div class="flex flex-wrap gap-2">
        <VueButton
          :variant="stateFilters?.[FilterCode.City] ? ButtonVariant.Outline : ButtonVariant.Default"
          @click="onUpdateFilter(FilterCode.City, '')"
        >
          Все города
        </VueButton>

        <VueButton
          v-for="city in filters.cities"
          :key="city.slug"
          :variant="stateFilters?.[FilterCode.City] === city.slug ? ButtonVariant.Default : ButtonVariant.Outline"
          :disabled="city.disabled"
          @click="onUpdateFilter(FilterCode.City, city.slug)"
        >
          {{ city.name }}
        </VueButton>
      </div>
    </div>
    <div class="px-4">
      <span class="mb-2 block text-sm font-medium text-foreground">Бюджет</span>
      <div class="flex flex-wrap gap-2">
        <VueButton
          :variant="
            stateFilters?.[FilterCode.PriceFrom] || stateFilters?.[FilterCode.PriceTo]
              ? ButtonVariant.Outline
              : ButtonVariant.Default
          "
          @click="
            () => {
              onUpdateFilter(FilterCode.PriceFrom, '');
              onUpdateFilter(FilterCode.PriceTo, '');
            }
          "
        >
          Любая цена
        </VueButton>

        <VueButton
          v-for="(price, i) in filters.prices"
          :key="price.from"
          :variant="getPriceButtonVariant(price)"
          :disabled="price.disabled"
          @click="
            () => {
              onUpdateFilter(FilterCode.PriceFrom, `${price.from}`);
              onUpdateFilter(FilterCode.PriceTo, `${price.to}`);
            }
          "
        >
          {{ buttonPriceTextMap[i as keyof typeof buttonPriceTextMap](price) }}
        </VueButton>
      </div>
    </div>

    <div class="mt-auto flex flex-col gap-2 px-4">
      <slot name="submitButton" />

      <VueButton
        :variant="ButtonVariant.Outline"
        tag="a"
        href="/properties/"
        :class="{ hidden: !existFilters }"
      >
        <X
          aria-hidden="true"
          class="h-4 w-4 text-foreground"
        />
        Сбросить фильтры
      </VueButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { TPropertyListingPageFilters } from '@contracts';
import type { TSlot } from 'global';
import { X } from 'lucide-vue-next';
import { computed } from 'vue';

import { ButtonVariant } from '@/components/vue/button/button.enums';
import VueButton from '@/components/vue/button/VueButton.vue';

import { FilterCode } from '../properties.enums';
import type { TParsedSegments } from '../properties.types';

const props = defineProps<{
  filters: TPropertyListingPageFilters;
  stateFilters: TParsedSegments;
  parsedSegments?: TParsedSegments;
  active: boolean;
}>();

const emit = defineEmits<{
  updateFilter: [type: FilterCode, value: string];
  closeFilters: [];
}>();

defineSlots<{
  submitButton(): TSlot;
}>();

const buttonPriceTextMap = {
  0: (price: TPropertyListingPageFilters['prices'][number]) => `до ${formatMillions(price.to)}`,
  1: (price: TPropertyListingPageFilters['prices'][number]) =>
    `от ${formatMillions(price.from)} до ${formatMillions(price.to)}`,
  2: (price: TPropertyListingPageFilters['prices'][number]) => `от ${formatMillions(price.from)}`,
};

const existFilters = computed<boolean>(() => Object.values(props.parsedSegments ?? {}).filter(Boolean).length > 0);

function formatMillions(price: number): string {
  return `${price / 1_000_000} млн.`;
}

function getPriceButtonVariant(price: TPropertyListingPageFilters['prices'][number]): ButtonVariant {
  const priceForm = Number(props.stateFilters?.[FilterCode.PriceFrom]);
  const priceTo = Number(props.stateFilters?.[FilterCode.PriceTo]);

  if (price.disabled) return ButtonVariant.Outline;

  if (price.from === priceForm && price.to === priceTo) return ButtonVariant.Default;

  return ButtonVariant.Outline;
}

function onUpdateFilter(type: FilterCode, value: string) {
  emit('updateFilter', type, value);
}
</script>

<style lang="scss">
@use '@/styles/mixins.scss' as *;

.property-listing-filters {
  transition:
    transform 0.3s ease,
    visibility 0s linear 0.3s;

  @include hide-scrollbar-but-scrolling();

  @media (max-width: calc(#{theme('screens.xl')} - 1px)) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 0;
    overflow-y: auto;
    min-height: 100svh;
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
