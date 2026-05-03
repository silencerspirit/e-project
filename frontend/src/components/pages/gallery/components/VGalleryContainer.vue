<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <VGalleryHead
      :count="totalPhotoCount"
      :currentGroup="currentGroup"
      :groups="filterGroups"
      :view="currentView"
      @change-view="onChangeView"
      @change-group="onChangeGroup"
    />

    <VGalleryImages
      :items="filteredItems"
      :view="currentView"
      @open="onOpenFullView"
    />

    <Transition name="fade">
      <VGalleryFullView
        v-if="isVisibleFullView"
        :currentIndex="currentIndex"
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

import { VIEW_COOKIE_NAME } from '../gallery.const';
import type { ListView } from '../gallery.enums';
import VGalleryHead from './VGalleryHead.vue';
import VGalleryImages from './VGalleryImages.vue';

const VGalleryFullView = defineAsyncComponent(() => import('./VGalleryFullView.vue'));

const { disableScroll, enableScroll } = useScroll();

const props = defineProps<{
  items: TGalleryItem[];
  view: ListView;
}>();

const mappedItems = props.items.reduce(
  (acc, item) => {
    if (!item.group) return acc;

    if (Array.isArray(acc[item.group])) acc[item.group].push(item);
    else acc[item.group] = [item];
    return acc;
  },
  {} as Record<string, TGalleryItem[]>,
);

const currentView = ref<ListView>(props.view);
const currentIndex = ref<number>(-1);
const currentGroup = ref<string>('');

const isVisibleFullView = computed<boolean>(() => currentIndex.value !== -1);

const totalPhotoCount = computed<number>(() => props.items.length);

const filteredItems = computed<TGalleryItem[]>(() => {
  if (!currentGroup.value) return props.items;

  return mappedItems[currentGroup.value] ?? [];
});

const filterGroups = computed<string[]>(() => Object.keys(mappedItems));

function onChangeView(viewName: ListView) {
  currentView.value = viewName;
  Cookie.set(VIEW_COOKIE_NAME, viewName);
}

function onChangeGroup(group: string) {
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
