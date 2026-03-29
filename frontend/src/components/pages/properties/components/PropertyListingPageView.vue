<template>
  <section class="property-listing-page-view py-12 lg:py-16">
    <div class="relative mx-auto flex max-w-7xl flex-row px-4 sm:px-6 lg:px-8 xl:gap-10">
      <div
        class="flex w-full flex-col items-center gap-6"
        v-if="isEmptyList"
      >
        <p class="text-center text-sm text-muted-foreground">Ничего не найдено, попробуйте:</p>

        <VueButton
          :variant="ButtonVariant.Outline"
          tag="a"
          href="/properties/"
        >
          <X
            aria-hidden="true"
            class="h-4 w-4 text-foreground"
          />
          Сбросить фильтры
        </VueButton>
      </div>

      <template v-else>
        <PropertyListingFilters
          :search="search"
          :state-filters="state.filters"
          :filters="state.allFilters"
          :parsedSegments="parsedSegments"
          :active="isOpenMobileFilters"
          @update-filter="onUpdateFilters"
          @close-filters="toggleMobileFilters(false)"
        >
          <template #submitButton>
            <VueButton
              tag="a"
              :disabled="isLoading"
              :href="getNavigateUrl()"
              :class="{ hidden: isEqualInitialFilters }"
            >
              {{ countText }}
            </VueButton>
          </template>
        </PropertyListingFilters>

        <PropertyListingList
          :paginate="listing.paginate"
          :list="listing.list"
          :query="query"
          :view="view"
          @change-sort="onChangeSort"
          @open-filters="toggleMobileFilters(true)"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  PropertyListingPageSegmentsSchema,
  PropertyListingPageSort,
  type TPropertyListingPageFilters,
  type TPropertyListingPageList,
  type TPropertyListingPageQuery,
} from '@contracts';
import { computed } from '@vue/reactivity';
import { isEqual } from 'es-toolkit';
import { X } from 'lucide-vue-next';
import { parse } from 'valibot';
import { reactive, ref, watch } from 'vue';

import { getPropertyListingPageCount } from '@/api';
import { ButtonVariant } from '@/components/vue/button/button.enums';
import VueButton from '@/components/vue/button/VueButton.vue';
import { assertNever, declOfNum } from '@/helpers';

import type { FilterCode, ListView } from '../properties.enums';
import type { TParsedSegments } from '../properties.types';
import { buildSegmentsUrl } from '../properties.utils';
import PropertyListingFilters from './PropertyListingFilters.vue';
import PropertyListingList from './PropertyListingList.vue';
const props = defineProps<{
  search: string;
  query: TPropertyListingPageQuery;
  listing: TPropertyListingPageList;
  view: ListView;
  parsedSegments?: TParsedSegments;
}>();

const isEmptyList: boolean = !props.listing.list.length;

const state = reactive<{
  params: URLSearchParams;
  filters: TParsedSegments;
  allFilters: TPropertyListingPageFilters;
  total: number;
}>({
  params: new URLSearchParams(props.search),
  filters: { ...props.parsedSegments },
  allFilters: { ...props.listing.filters },
  total: props.listing.paginate.totalItems,
});

const isOpenMobileFilters = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const isEqualInitialFilters = computed<boolean>(() => isEqual(state.filters, props.parsedSegments));

const countText = computed<string>(() =>
  isLoading.value
    ? '...'
    : declOfNum(state.total, [
        `Найден ${state.total} объект`,
        `Найдено ${state.total} объекта`,
        `Найдено ${state.total} объектов`,
      ]),
);

function onUpdateFilters(type: FilterCode, value: string) {
  state.filters[type] = value;
}

async function onUpdateState([filters]: [TParsedSegments]) {
  try {
    isLoading.value = true;
    const segments = parse(PropertyListingPageSegmentsSchema, filters);
    const response = await getPropertyListingPageCount(segments);

    state.allFilters = response.filters;
    state.total = response.total;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

function getNavigateUrl(): string {
  const stringifiedParams = state.params.toString();
  const paramsString = stringifiedParams ? `?${stringifiedParams}` : stringifiedParams;
  const segments = buildSegmentsUrl(state.filters);
  return `${segments}${paramsString}`;
}

function onChangeSort(sort: PropertyListingPageSort) {
  switch (sort) {
    case PropertyListingPageSort.Default:
      state.params.delete('sort');
      state.params.delete('page');
      break;
    case PropertyListingPageSort.PriceAsc:
    case PropertyListingPageSort.PriceDesc:
      state.params.set('sort', sort);
      state.params.delete('page');
      break;

    default:
      assertNever(sort);
  }

  window.location.assign(getNavigateUrl());
}

function toggleMobileFilters(value: boolean) {
  isOpenMobileFilters.value = value;
}

watch([state.filters], onUpdateState);
</script>
