<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold text-foreground">Расположение</h2>

    <div
      v-if="item.address"
      class="mb-2 flex items-start gap-2 text-muted-foreground"
    >
      <MapPin
        aria-hidden="true"
        class="mt-1 h-4 w-4"
      />
      <span class="text-sm">{{ item.address }}</span>
    </div>

    <div class="relative h-80 overflow-hidden rounded-2xl border border-border bg-secondary/50 sm:h-96">
      <div
        :ref="MAP_CONTAINER_REF"
        class="h-full w-full"
      ></div>

      <VMapZoomControls
        :current-zoom="currentZoom"
        :max-zoom="MAP_MAX_ZOOM"
        :min-zoom="MAP_MIN_ZOOM"
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TPropertyFullItem } from '@contracts';
import { MapPin } from 'lucide-vue-next';
import { computed, useTemplateRef } from 'vue';

import VMapZoomControls from '@/components/vue/map/VMapZoomControls.vue';
import { MAP_CONTAINER_REF, MAP_MAX_ZOOM, MAP_MIN_ZOOM, useMap } from '@/composables';

const props = defineProps<{
  item: TPropertyFullItem;
}>();

const mapContainerEl = useTemplateRef<HTMLElement>(MAP_CONTAINER_REF);
const coordinates = computed<[number, number]>(() => [props.item.longitude ?? 0, props.item.latitude ?? 0]);
const { currentZoom, zoomIn, zoomOut } = useMap(() => {
  if (props.item.longitude == null || props.item.latitude == null) return;

  return {
    container: mapContainerEl.value,
    center: coordinates.value,
    markers: [
      {
        id: props.item.slug,
        coordinates: coordinates.value,
      },
    ],
  };
});
</script>
