<template>
  <div class="property-listing-list flex min-w-0 flex-1 flex-col gap-8">
    <PropertyListingSettings
      :paginate="paginate"
      :query="query"
      :view="viewMode"
      @change-view="onChangeView"
      @change-sort="onChangeSort"
      @open-filters="onOpenFilters"
    />

    <ul
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
      :class="{
        'lg:grid-cols-1': isListView,
      }"
    >
      <PropertyCard
        v-for="property in list"
        :row="isListView"
        :property="property"
        :key="property.slug"
        fullPrice
      />
    </ul>

    <VuePaginate :paginate="paginate" />
  </div>
</template>

<script lang="ts" setup>
import type { PropertyListingPageSort, TPaginate, TPropertyListingPageQuery, TPropertyListItem } from '@contracts';
import Cookie from 'js-cookie';
import { computed, ref } from 'vue';

import VuePaginate from '@/components/vue/paginate/VuePaginate.vue';
import PropertyCard from '@/components/vue/property-card/PropertyCard.vue';

import { VIEW_COOKIE_NAME } from '../properties.consts';
import { ListView } from '../properties.enums';
import PropertyListingSettings from './PropertyListingSettings.vue';

const props = defineProps<{
  paginate: TPaginate;
  query: TPropertyListingPageQuery;
  list: TPropertyListItem[];
  view: ListView;
}>();

const emit = defineEmits<{
  changeSort: [value: PropertyListingPageSort];
  openFilters: [];
}>();

const viewMode = ref<ListView>(props.view);

const isListView = computed<boolean>(() => viewMode.value === ListView.List);

function onChangeView(view: ListView) {
  viewMode.value = view;
  Cookie.set(VIEW_COOKIE_NAME, view);
}

function onChangeSort(sort: PropertyListingPageSort) {
  emit('changeSort', sort);
}

function onOpenFilters() {
  emit('openFilters');
}
</script>
