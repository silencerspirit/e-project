<template>
  <section class="property-detail-similar overflow-hidden bg-card py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between gap-2 whitespace-nowrap">
        <h2 class="truncate text-2xl font-bold text-foreground sm:text-3xl">Похожие объекты</h2>

        <a
          href="/properties/"
          class="inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm text-primary transition-colors hover:bg-primary/10"
        >
          Все объекты
          <ArrowRight
            aria-hidden="true"
            class="h-4 w-4"
          />
        </a>
      </div>

      <div
        class="swiper property-detail-similar__slider"
        ref="swiper"
      >
        <ul class="swiper-wrapper items-stretch">
          <PropertyCard
            v-for="property in similarList"
            :key="property.slug"
            hideDetails
            class="swiper-slide flex h-auto"
            :property="property"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TPropertyListItem } from '@contracts';
import { ArrowRight } from 'lucide-vue-next';
import type SwiperInstance from 'swiper';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

import { loadSwiperCore } from '@/components/ui/swiper/loader';
import PropertyCard from '@/components/vue/property-card/PropertyCard.vue';

defineProps<{
  similarList: TPropertyListItem[];
}>();

let sliderInstance: SwiperInstance | null = null;
const swiperRef = useTemplateRef<HTMLElement>('swiper');

function loadSwiper() {
  return loadSwiperCore();
}

async function initSwiper() {
  const { Swiper } = await loadSwiper();

  if (!swiperRef.value) return;

  sliderInstance = new Swiper(swiperRef.value, {
    slidesPerView: 'auto',
  });
}

function destroySwiper() {
  sliderInstance?.destroy(true, true);
}

onMounted(initSwiper);
onUnmounted(destroySwiper);
</script>

<style lang="scss">
.property-detail-similar {
  &__slider {
    @apply px-4 py-10;

    margin-inline: calc(#{theme('size.4')} * -1);
    width: calc(100% + #{theme('size.4')} * 2);

    .swiper-slide {
      max-width: calc((100% - #{theme('size.6')} * 2) / 3);

      @media (max-width: theme('screens.lg')) {
        max-width: calc((100% - #{theme('size.4')}));
      }

      &:not(:last-child) {
        margin-right: theme('size.6');

        @media (max-width: theme('screens.lg')) {
          margin-right: theme('size.4');
        }
      }
    }
  }
}
</style>
