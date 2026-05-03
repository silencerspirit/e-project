<template>
  <div
    class="grid gap-4"
    v-if="items.length"
    :class="colsSelectors"
  >
    <VGalleryItem
      v-for="(item, i) in items"
      :key="`${item.group}_${i}`"
      :item="item"
      :index="i"
      @open="emit('open', $event)"
    />
  </div>

  <p
    v-else
    class="text-center text-sm text-muted-foreground"
  >
    Нет загруженных фотографий
  </p>
</template>

<script lang="ts" setup>
import type { TGalleryItem } from '@contracts';
import { computed } from 'vue';

import { ListView } from '../gallery.enums';
import VGalleryItem from './VGalleryItem.vue';

const props = defineProps<{
  items: TGalleryItem[];
  view: ListView;
}>();

const emit = defineEmits<{
  open: [value: number];
}>();

const colsSelectors = computed<string>(() =>
  props.view === ListView.Grid2X2
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
);
</script>
