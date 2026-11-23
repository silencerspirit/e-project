<template>
  <div class="v-property-listing-list flex min-w-0 flex-1 flex-col gap-8">
    <VPropertyListingSettings
      :paginate
      :query
      :view="viewMode"
      @view-change="onViewChange"
      @sort-change="onSortChange"
      @filters-open="onFiltersOpen"
    />

    <ul
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
      :class="{
        'lg:grid-cols-1': listView,
      }"
    >
      <VPropertyCard
        v-for="property in list"
        :row="listView"
        :property
        :key="property.slug"
        fullPrice
      />
    </ul>

    <VPaginate :paginate />
  </div>
</template>

<script lang="ts" setup>
import type { PropertyListingPageSort, TPaginate, TPropertyListingPageQuery, TPropertyListItem } from '@contracts';
import Cookie from 'js-cookie';
import { computed, ref } from 'vue';

import VPaginate from '@/components/vue/paginate/VPaginate.vue';
import VPropertyCard from '@/components/vue/property-card/VPropertyCard.vue';

import { VIEW_COOKIE_NAME } from '../properties.consts';
import { ListView } from '../properties.enums';
import VPropertyListingSettings from './VPropertyListingSettings.vue';

const { view: viewProp } = defineProps<{
  list: TPropertyListItem[];
  paginate: TPaginate;
  query: TPropertyListingPageQuery;
  view: ListView;
}>();

const emit = defineEmits<{
  filtersOpen: [];
  sortChange: [value: PropertyListingPageSort];
}>();

const viewMode = ref<ListView>(viewProp);

const listView = computed<boolean>(() => viewMode.value === ListView.List);

function onViewChange(view: ListView) {
  viewMode.value = view;
  Cookie.set(VIEW_COOKIE_NAME, view);
}

function onSortChange(sort: PropertyListingPageSort) {
  emit('sortChange', sort);
}

function onFiltersOpen() {
  emit('filtersOpen');
}
</script>
