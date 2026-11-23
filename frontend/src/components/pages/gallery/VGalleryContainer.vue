<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <VGalleryHead
      :count="totalPhotoCount"
      :currentGroup
      :groups="filterGroups"
      :view="currentView"
      @view-change="onViewChange"
      @group-change="onGroupChange"
    />

    <VGalleryImages
      :items="filteredItems"
      :view="currentView"
      @open="onOpenFullView"
    />

    <Transition name="fade">
      <VGalleryFullView
        v-if="fullViewVisible"
        :currentIndex
        :items="filteredItems"
        @close="onCloseFullView"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { TGalleryItem } from '@contracts';
import Cookie from 'js-cookie';
import { computed, defineAsyncComponent, ref } from 'vue';

import { useScroll } from '@/composables';

import { VIEW_COOKIE_NAME } from './gallery.consts';
import type { ListView } from './gallery.enums';
import VGalleryHead from './VGalleryHead.vue';
import VGalleryImages from './VGalleryImages.vue';

const { items, view } = defineProps<{
  items: TGalleryItem[];
  view: ListView;
}>();

const VGalleryFullView = defineAsyncComponent(() => import('./VGalleryFullView.vue'));

const { disableScroll, enableScroll } = useScroll();

const mappedItems = items.reduce(
  (acc, item) => {
    if (!item.group) return acc;

    if (Array.isArray(acc[item.group])) {
      acc[item.group].push(item);
    } else {
      acc[item.group] = [item];
    }
    return acc;
  },
  {} as Record<string, TGalleryItem[]>,
);

const currentView = ref<ListView>(view);
const currentIndex = ref<number>(-1);
const currentGroup = ref<string>('');

const fullViewVisible = computed<boolean>(() => currentIndex.value !== -1);

const totalPhotoCount = computed<number>(() => items.length);

const filteredItems = computed<TGalleryItem[]>(() => {
  if (!currentGroup.value) return items;

  return mappedItems[currentGroup.value] ?? [];
});

const filterGroups = computed<string[]>(() => Object.keys(mappedItems));

function onViewChange(viewName: ListView) {
  currentView.value = viewName;
  Cookie.set(VIEW_COOKIE_NAME, viewName);
}

function onGroupChange(group: string) {
  currentGroup.value = group;
}

function onCloseFullView() {
  currentIndex.value = -1;
  enableScroll();
}

function onOpenFullView(index: number) {
  currentIndex.value = index;
  disableScroll();
}
</script>
