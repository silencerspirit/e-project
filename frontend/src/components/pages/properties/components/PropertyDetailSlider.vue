<template>
  <div class="property-detail-slider py-8 lg:py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        ref="swiper"
        id="main-slider"
        class="property-detail-slider__main swiper w-full overflow-hidden rounded-2xl bg-secondary"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(image, i) in images"
            class="swiper-slide aspect-square sm:aspect-video"
          >
            <VueImage
              :image="image"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :decoding="i === 0 ? 'sync' : 'async'"
              :fetchpriority="i === 0 ? 'high' : 'low'"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <button
          class="property-detail-slider__main-prev absolute left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card lg:flex"
          type="button"
          aria-label="Предыдущее фото"
        >
          <ChevronLeft
            class="h-5 w-5 text-foreground"
            aria-hidden="true"
          />
        </button>
        <button
          class="property-detail-slider__main-next absolute right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card lg:flex"
          type="button"
          aria-label="Следующее фото"
        >
          <ChevronRight
            class="h-5 w-5 text-foreground"
            aria-hidden="true"
          />
        </button>
        <div
          class="absolute bottom-4 right-4 z-10 rounded-full bg-foreground/70 px-3 py-1.5 text-sm font-medium text-card backdrop-blur-sm"
          aria-live="polite"
        >
          {{ counterText }}
        </div>
      </div>

      <div
        ref="thumbs"
        id="thumb-slider"
        class="property-detail-slider__thumb swiper"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(image, i) in images"
            class="swiper-slide relative aspect-square shrink-0 cursor-pointer overflow-hidden rounded-xl transition-colors"
          >
            <VueImage
              :image="image"
              thumbnail
              :loading="i === 0 ? 'eager' : 'lazy'"
              :decoding="i === 0 ? 'sync' : 'async'"
              :fetchpriority="i === 0 ? 'high' : 'low'"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TImage } from '@contracts';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type SwiperInstance from 'swiper';
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

import {
  loadSwiperCore,
  loadSwiperFreeMode,
  loadSwiperNavigation,
  loadSwiperThumbs,
} from '@/components/ui/swiper/loader';
import VueImage from '@/components/vue/image/VueImage.vue';

const props = defineProps<{
  images: TImage[];
}>();

const swiperRef = useTemplateRef<HTMLElement>('swiper');
const thumbsRef = useTemplateRef<HTMLElement>('thumbs');
const slideIndex = ref<number>(0);

let sliderInstance: SwiperInstance | null = null;
let thumbsInstance: SwiperInstance | null = null;

const counterText = computed<string>(() => `${slideIndex.value + 1} / ${props.images.length}`);

function loadSwiper() {
  return Promise.all([loadSwiperCore(), loadSwiperNavigation(), loadSwiperThumbs(), loadSwiperFreeMode()]);
}

function destroySwiper() {
  sliderInstance?.destroy(true, true);
  thumbsInstance?.destroy(true, true);
}

async function initSwiper() {
  const [{ Swiper }, { Navigation }, { Thumbs }, { FreeMode }] = await loadSwiper();

  if (!swiperRef.value || !thumbsRef.value) return;

  thumbsInstance = new Swiper(thumbsRef.value, {
    modules: [FreeMode],
    freeMode: true,
    spaceBetween: 12,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });

  sliderInstance = new Swiper(swiperRef.value, {
    modules: [Thumbs, Navigation],
    thumbs: {
      autoScrollOffset: 2,
      swiper: thumbsInstance,
    },
    navigation: {
      prevEl: '.property-detail-slider__main-prev',
      nextEl: '.property-detail-slider__main-next',
    },
    on: {
      slideChange(swiper) {
        slideIndex.value = swiper.realIndex;
      },
    },
  });
}

onMounted(initSwiper);
onUnmounted(destroySwiper);
</script>

<style lang="scss">
.property-detail-slider {
  &__thumb {
    @apply p-4;

    margin-inline: calc(#{theme('size.4')} * -1);
    width: calc(100% + #{theme('size.4')} * 2);

    .swiper-slide-thumb-active {
      @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
    }

    .swiper-slide:not(.swiper-slide-thumb-active) {
      @apply opacity-60 hover:opacity-100;
    }

    .swiper-slide {
      @apply h-16 w-16 sm:h-24 sm:w-24;
    }
  }

  &__main-prev,
  &__main-next {
    &.swiper-button-disabled {
      @apply pointer-events-none opacity-60;
    }
  }
}
</style>
