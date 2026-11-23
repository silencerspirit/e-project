<template>
  <section class="v-property-listing-page-view py-12 lg:py-16">
    <div class="relative mx-auto flex max-w-7xl flex-row px-4 sm:px-6 lg:px-8 xl:gap-10">
      <div
        class="flex w-full flex-col items-center gap-6"
        v-if="listEmpty"
      >
        <p class="text-center text-sm text-muted-foreground">Ничего не найдено, попробуйте:</p>

        <VButton
          :variant="ButtonVariant.Outline"
          tag="a"
          href="/properties/"
        >
          <X
            aria-hidden="true"
            class="h-4 w-4 text-foreground"
          />
          Сбросить фильтры
        </VButton>
      </div>

      <template v-else>
        <VPropertyListingFilters
          :search
          :state-filters="state.filters"
          :filters="state.allFilters"
          :parsedSegments
          :active="mobileFiltersOpen"
          @filter-update="onFiltersUpdate"
          @filters-close="onFiltersClose"
        >
          <template #submitButton>
            <VButton
              tag="a"
              :disabled="loading"
              :href="getNavigateUrl()"
              :class="{ hidden: initialFiltersUnchanged }"
            >
              {{ countText }}
            </VButton>
          </template>
        </VPropertyListingFilters>

        <VPropertyListingList
          :paginate="listing.paginate"
          :list="listing.list"
          :query
          :view
          @sort-change="onSortChange"
          @filters-open="onFiltersOpen"
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
import { isEqual } from 'es-toolkit';
import { X } from 'lucide-vue-next';
import { parse } from 'valibot';
import { computed, reactive, ref, watch } from 'vue';

import { getPropertyListingPageCount } from '@/api';
import { ButtonVariant } from '@/components/vue/button/button.enums';
import VButton from '@/components/vue/button/VButton.vue';
import { useScroll } from '@/composables';
import { assertNever, declOfNum } from '@/helpers';

import type { ListView } from '../properties.enums';
import type { IPropertyFilterUpdatePayload, TParsedSegments } from '../properties.types';
import { buildSegmentsUrl } from '../properties.utils';
import VPropertyListingFilters from './VPropertyListingFilters.vue';
import VPropertyListingList from './VPropertyListingList.vue';
const { listing, search, parsedSegments } = defineProps<{
  listing: TPropertyListingPageList;
  parsedSegments?: TParsedSegments;
  query: TPropertyListingPageQuery;
  search: string;
  view: ListView;
}>();

const { disableScroll, enableScroll } = useScroll();

const listEmpty: boolean = !listing.list.length;

const state = reactive<{
  allFilters: TPropertyListingPageFilters;
  filters: TParsedSegments;
  params: URLSearchParams;
  total: number;
}>({
  params: new URLSearchParams(search),
  filters: { ...parsedSegments },
  allFilters: { ...listing.filters },
  total: listing.paginate.totalItems,
});

const mobileFiltersOpen = ref<boolean>(false);
const loading = ref<boolean>(false);

const initialFiltersUnchanged = computed<boolean>(() => isEqual(state.filters, parsedSegments));

const countText = computed<string>(() =>
  loading.value
    ? '...'
    : declOfNum(state.total, [
        `Найден ${state.total} объект`,
        `Найдено ${state.total} объекта`,
        `Найдено ${state.total} объектов`,
      ]),
);

function onFiltersUpdate({ code, value }: IPropertyFilterUpdatePayload) {
  state.filters[code] = value;
}

async function onUpdateState([filters]: [TParsedSegments]) {
  try {
    loading.value = true;
    const segments = parse(PropertyListingPageSegmentsSchema, filters);
    const response = await getPropertyListingPageCount(segments);

    state.allFilters = response.filters;
    state.total = response.total;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function getNavigateUrl(): string {
  const params = new URLSearchParams(state.params);
  params.delete('page');

  const stringifiedParams = params.toString();
  const paramsString = stringifiedParams ? `?${stringifiedParams}` : stringifiedParams;
  const segments = buildSegmentsUrl(state.filters);
  return `${segments}${paramsString}`;
}

function onSortChange(sort: PropertyListingPageSort) {
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
  mobileFiltersOpen.value = value;

  if (value) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function onFiltersOpen() {
  toggleMobileFilters(true);
}

function onFiltersClose() {
  toggleMobileFilters(false);
}

watch([state.filters], onUpdateState);
</script>
