<template>
  <div class="v-property-listing-list flex min-w-0 flex-1 flex-col gap-8">
    <VPropertyListingSettings
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
      <VPropertyCard
        v-for="property in list"
        :row="isListView"
        :property="property"
        :key="property.slug"
        fullPrice
      />
    </ul>

    <VPaginate :paginate="paginate" />
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

const props = defineProps<{
  list: TPropertyListItem[];
  paginate: TPaginate;
  query: TPropertyListingPageQuery;
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
