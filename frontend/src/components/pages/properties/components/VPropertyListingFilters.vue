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
        <VButton
          :variant="stateFilters?.[FilterCode.PropertyType] ? ButtonVariant.Outline : ButtonVariant.Default"
          @click="onUpdateFilter(FilterCode.PropertyType, '')"
        >
          Все объекты
        </VButton>

        <VButton
          v-for="type in filters.propertyTypes"
          :key="type.slug"
          :variant="
            stateFilters?.[FilterCode.PropertyType] === type.slug ? ButtonVariant.Default : ButtonVariant.Outline
          "
          :disabled="type.disabled"
          @click="onUpdateFilter(FilterCode.PropertyType, type.slug)"
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
          @click="onUpdateFilter(FilterCode.City, '')"
        >
          Все города
        </VButton>

        <VButton
          v-for="city in filters.cities"
          :key="city.slug"
          :variant="stateFilters?.[FilterCode.City] === city.slug ? ButtonVariant.Default : ButtonVariant.Outline"
          :disabled="city.disabled"
          @click="onUpdateFilter(FilterCode.City, city.slug)"
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
          @click="
            () => {
              onUpdateFilter(FilterCode.PriceFrom, '');
              onUpdateFilter(FilterCode.PriceTo, '');
            }
          "
        >
          Любая цена
        </VButton>

        <VButton
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
        </VButton>
      </div>
    </div>

    <div class="mt-auto flex flex-col gap-2 px-4">
      <slot name="submitButton" />

      <VButton
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
import type { TParsedSegments } from '../properties.types';

const props = defineProps<{
  active: boolean;
  filters: TPropertyListingPageFilters;
  parsedSegments?: TParsedSegments;
  stateFilters: TParsedSegments;
}>();

const emit = defineEmits<{
  closeFilters: [];
  updateFilter: [type: FilterCode, value: string];
}>();

defineSlots<{
  submitButton(): TSlot;
}>();

const buttonPriceTextMap = {
  0: (price: TPropertyListingPageFilters['prices'][number]) => `до ${formatThousands(price.to)}`,
  1: (price: TPropertyListingPageFilters['prices'][number]) =>
    `от ${formatThousands(price.from)} до ${formatThousands(price.to)}`,
  2: (price: TPropertyListingPageFilters['prices'][number]) => `от ${formatThousands(price.from)}`,
};

const existFilters = computed<boolean>(() => Object.values(props.parsedSegments ?? {}).filter(Boolean).length > 0);

function formatThousands(price: number): string {
  return `${Math.floor(price / 1_000)} тыс.`;
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

.v-property-listing-filters {
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
