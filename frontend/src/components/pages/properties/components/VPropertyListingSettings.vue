<template>
  <div class="property-listing-settings z-10 flex flex-wrap items-center gap-4">
    <button
      type="button"
      class="inline-flex items-center gap-2 text-sm xl:hidden"
      aria-controls="property-listing-filters"
      aria-expanded="false"
      @click="emit('openFilters')"
    >
      <SlidersHorizontal
        aria-hidden="true"
        class="h-4 w-4"
      />
      Фильтры
    </button>

    <span class="mr-auto hidden text-sm text-muted-foreground lg:inline-block">
      {{ countText }}
    </span>

    <div class="ml-auto flex items-center gap-3">
      <div class="relative">
        <select
          name="sort"
          aria-label="Сортировка недвижимости"
          class="appearance-none rounded-lg border-none bg-secondary py-2 pl-3 pr-8 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          @change="onChangeSort"
        >
          <option
            v-for="sort in SORT_LIST"
            :value="sort.value"
            :selected="query.sort === sort.value"
          >
            {{ sort.label }}
          </option>
        </select>

        <ChevronDown
          aria-hidden="true"
          class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>

    <div class="hidden items-center rounded-lg bg-secondary p-1 lg:flex">
      <button
        v-for="{ label, icon, key } in VIEW_LIST"
        :key="key"
        type="button"
        class="rounded-md p-1.5 transition-colors"
        :class="{
          'bg-card text-primary shadow-sm': view === key,
          'text-muted-foreground hover:text-foreground': view !== key,
        }"
        :aria-label="label"
        :aria-pressed="view === key"
        @click="emit('changeView', key)"
      >
        <component
          :is="icon"
          class="h-4 w-4"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropertyListingPageSort, type TPaginate, type TPropertyListingPageQuery } from '@contracts';
import { ChevronDown, LayoutGrid, List, SlidersHorizontal } from 'lucide-vue-next';
import { computed } from 'vue';

import { declOfNum } from '@/helpers';

import { ListView } from '../properties.enums';

const props = defineProps<{
  paginate: TPaginate;
  query: TPropertyListingPageQuery;
  view: ListView;
}>();

const emit = defineEmits<{
  changeSort: [value: PropertyListingPageSort];
  changeView: [value: ListView];
  openFilters: [];
}>();

const countText = computed<string>(() =>
  declOfNum(props.paginate.totalItems, [
    `Найден ${props.paginate.totalItems} объект`,
    `Найдено ${props.paginate.totalItems} объекта`,
    `Найдено ${props.paginate.totalItems} объектов`,
  ]),
);

const SORT_LIST = [
  {
    value: PropertyListingPageSort.Default,
    label: 'По умолчанию',
  },
  {
    value: PropertyListingPageSort.PriceAsc,
    label: 'Сначала дешевле',
  },
  {
    value: PropertyListingPageSort.PriceDesc,
    label: 'Сначала дороже',
  },
] as const;

const VIEW_LIST = [
  {
    key: ListView.Grid,
    label: 'Вид плиткой',
    icon: LayoutGrid,
  },
  {
    key: ListView.List,
    label: 'Вид списком',
    icon: List,
  },
] as const;

function onChangeSort(e: Event) {
  if (!(e.target instanceof HTMLSelectElement)) return;
  emit('changeSort', e.target.value as PropertyListingPageSort);
}
</script>

<style lang="scss">
.property-listing-settings {
  @media (max-width: calc(#{theme('screens.xl')} - 1px)) {
    --offset: theme('spacing.8');

    position: sticky;
    width: calc(100% + (var(--offset)) * 2);
    background: theme('colors.background');
    padding-block: theme('size.2');
    padding-inline: var(--offset);
    margin-inline: calc(var(--offset) * -1);
    top: var(--header-height);
  }

  @media (max-width: calc(#{theme('screens.lg')} - 1px)) {
    --offset: theme('spacing.6');
  }

  @media (max-width: calc(#{theme('screens.sm')} - 1px)) {
    --offset: theme('spacing.4');
  }
}
</style>
