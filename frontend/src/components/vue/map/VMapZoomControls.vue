<template>
  <div
    class="v-map-zoom-controls absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-primary bg-background shadow-lg"
  >
    <button
      type="button"
      class="flex size-10 items-center justify-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
      aria-label="Увеличить карту"
      :disabled="currentZoom >= maxZoom"
      @click.stop="onZoomIn"
    >
      <LucidePlus class="size-5" />
    </button>
    <span class="h-px bg-primary/30" />
    <button
      type="button"
      class="flex size-10 items-center justify-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
      aria-label="Уменьшить карту"
      :disabled="currentZoom <= minZoom"
      @click.stop="onZoomOut"
    >
      <LucideMinus class="size-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { LucideMinus, LucidePlus } from 'lucide-vue-next';

defineProps<{
  currentZoom: number;
  maxZoom: number;
  minZoom: number;
}>();

const emit = defineEmits<{
  zoomIn: [];
  zoomOut: [];
}>();

function onZoomIn() {
  emit('zoomIn');
}

function onZoomOut() {
  emit('zoomOut');
}
</script>

<style lang="scss">
.v-map-zoom-controls,
.v-map-zoom-controls button {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}
</style>
