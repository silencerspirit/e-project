<template>
  <div
    ref="dialog"
    tabindex="0"
    role="dialog"
    aria-label="Просмотр фотографии"
    class="v-gallery-full-view fixed inset-0 z-50 flex items-center justify-center py-16 outline-none"
  >
    <button
      type="button"
      class="v-gallery-full-view__close absolute z-10 rounded-full p-2 transition-colors"
      @click="onClose"
    >
      <X class="h-4 w-4 text-card" />
    </button>

    <div class="flex h-full w-full flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
      <div
        ref="swiper"
        class="v-gallery-full-view__swiper swiper h-full w-full max-w-7xl"
      >
        <div class="swiper-wrapper h-full">
          <div
            v-for="item in items"
            class="swiper-slide flex h-full flex-col justify-center gap-2 text-center"
          >
            <div class="swiper-zoom-container">
              <img
                class="v-gallery-full-view__image h-full w-full object-contain"
                :src="item.image.formats.large || item.image.url"
                :alt="item.image.alternativeText || item.description"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full max-w-7xl items-start gap-4">
        <button class="v-gallery-full-view__arrow v-gallery-full-view__arrow--prev mr-auto text-card">
          <ArrowLeft />
        </button>

        <div class="flex flex-col overflow-hidden text-center">
          <p
            class="truncate font-medium text-card"
            v-if="description"
          >
            {{ description }}
          </p>
          <p class="text-sm text-card/60">{{ counterText }}</p>
        </div>

        <button class="v-gallery-full-view__arrow v-gallery-full-view__arrow--next ml-auto text-card">
          <ArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TGalleryItem } from '@contracts';
import { ArrowLeft, ArrowRight, X } from 'lucide-vue-next';
import type SwiperInstance from 'swiper';
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

import { loadSwiperCore, loadSwiperNavigation, loadSwiperZoom } from '@/components/ui/swiper/loader';

const props = defineProps<{
  items: TGalleryItem[];
  currentIndex: number;
}>();

const emit = defineEmits<{
  close: [];
}>();

const swiperRef = useTemplateRef<HTMLElement>('swiper');
const dialogRef = useTemplateRef<HTMLElement>('dialog');
const slideIndex = ref<number>(props.currentIndex);

let sliderInstance: SwiperInstance | null = null;

const counter = computed<string>(() => `${slideIndex.value + 1} / ${props.items.length}`);

const description = computed<string>(() => props.items[slideIndex.value].description ?? '');
const group = computed<string>(() => props.items[slideIndex.value].group ?? '');

const counterText = computed<string>(() => `${counter.value} ${group.value ? `— ${group.value}` : ''}`);

function loadSwiper() {
  return Promise.all([loadSwiperCore(), loadSwiperNavigation(), loadSwiperZoom()]);
}

function destroySwiper() {
  sliderInstance?.destroy(true, true);
}

function onClose() {
  emit('close');
}

function onKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Escape':
      event.preventDefault();
      onClose();
      return;
    case 'ArrowLeft':
      event.preventDefault();
      sliderInstance?.slidePrev();
      return;
    case 'ArrowRight':
      event.preventDefault();
      sliderInstance?.slideNext();
      return;
    default:
      return;
  }
}

async function initSwiper() {
  const [{ Swiper }, { Navigation }, { Zoom }] = await loadSwiper();

  if (!swiperRef.value) return;

  sliderInstance = new Swiper(swiperRef.value, {
    modules: [Navigation, Zoom],
    initialSlide: props.currentIndex,
    slidesPerView: 1,
    zoom: {
      maxRatio: 3,
      minRatio: 1,
      panOnMouseMove: true,
      toggle: true,
    },
    navigation: {
      prevEl: '.v-gallery-full-view__arrow--prev',
      nextEl: '.v-gallery-full-view__arrow--next',
    },
    on: {
      slideChange(swiper) {
        slideIndex.value = swiper.realIndex;
      },
    },
  });
}

onMounted(async () => {
  window.addEventListener('keydown', onKeydown);
  await initSwiper();
  await nextTick();
  dialogRef.value?.focus();
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  destroySwiper();
});
</script>

<style lang="scss">
@use '@/styles/mixins.scss' as *;

.v-gallery-full-view {
  @apply bg-foreground/95;

  &__close {
    @apply bg-card/10;

    right: 16px;
    top: 16px;

    @include hover() {
      &:hover {
        @apply bg-card/20;
      }
    }
  }

  &__arrow {
    &.swiper-button-disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }
  }

  .swiper-zoom-container {
    @apply min-h-0 flex-1;
  }

  &__image {
    max-height: 85vh;
  }
}
</style>
