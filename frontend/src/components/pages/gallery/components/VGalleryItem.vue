<template>
  <figure
    @click="onClick"
    class="v-gallery-item group relative flex cursor-pointer flex-col overflow-hidden rounded-xl"
  >
    <VueImage
      class="v-gallery-item__image h-full w-full transition-transform duration-300"
      loading="lazy"
      decoding="async"
      :image="item.image"
    />
    <div class="v-gallery-item__foreground absolute inset-0 flex items-center justify-center transition-colors">
      <LucideZoomIn class="v-gallery-item__icon h-8 w-8 text-card transition-opacity" />
    </div>

    <div class="v-gallery-item__caption absolute bottom-0 left-0 right-0 p-3 text-center transition-opacity">
      <figcaption
        class="truncate text-sm font-medium text-card"
        v-if="item.description"
      >
        {{ item.description }}
      </figcaption>
      <span
        class="text-xs text-card/70"
        v-if="item.group"
        >{{ item.group }}</span
      >
    </div>
  </figure>
</template>

<script lang="ts" setup>
import type { TGalleryItem } from '@contracts';
import { LucideZoomIn } from 'lucide-vue-next';

import VueImage from '@/components/vue/image/VueImage.vue';
const props = defineProps<{
  item: TGalleryItem;
  index: number;
}>();

const emit = defineEmits<{
  open: [value: number];
}>();

function onClick() {
  emit('open', props.index);
}
</script>

<style lang="scss">
@use '@/styles/mixins.scss' as *;

.v-gallery-item {
  $p: &;

  @apply aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;

  &__image {
    @include hover() {
      #{$p}:hover & {
        transform: scale(1.05);
      }
    }
  }

  &__foreground {
    @apply bg-foreground/0;

    @include hover() {
      #{$p}:hover & {
        @apply bg-foreground/40;
      }
    }
  }

  &__icon {
    opacity: 0;

    @include hover() {
      #{$p}:hover & {
        opacity: 1;
      }
    }
  }

  &__caption {
    @apply bg-gradient-to-t from-foreground/80 to-transparent;

    opacity: 0;

    @include hover() {
      #{$p}:hover & {
        opacity: 1;
      }
    }
  }
}
</style>
