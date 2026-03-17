<template>
  <section
    class="main-page-listing bg-background py-20 lg:py-28"
    aria-labelledby="main-page-listing-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6">
        <div class="w-full">
          <h2
            id="main-page-listing-title"
            class="text-balance text-3xl font-bold text-foreground sm:text-4xl"
          >
            {{ info.title }}
          </h2>
          <p class="mt-4 text-lg text-muted-foreground">{{ info.description }}</p>
        </div>

        <div class="flex items-start gap-6">
          <div
            class="flex w-full flex-wrap gap-2"
            role="group"
            aria-label="Фильтр объектов по типу"
          >
            <VueButton
              v-for="filter in filters"
              :key="filter"
              type="button"
              :rounded="ButtonRounded.Full"
              :aria-pressed="filter === activeFilter"
              :variant="filter === activeFilter ? ButtonVariant.Default : ButtonVariant.Outline"
              @click="onClickFilter(filter)"
            >
              {{ filter }}
            </VueButton>
          </div>

          <div class="hidden gap-4 lg:flex">
            <VueButton
              type="button"
              :variant="ButtonVariant.Link"
              aria-label="Предыдущей слайд"
              :id="sliderPrevButtonId"
              :class="['text-primary transition-colors hover:bg-primary/10', { hidden: isNavigationHidden }]"
            >
              <ArrowLeft
                aria-hidden="true"
                class="h-4 w-4"
              />
            </VueButton>

            <VueButton
              type="button"
              :variant="ButtonVariant.Link"
              aria-label="Следующий слайд"
              :id="sliderNextButtonId"
              :class="['text-primary transition-colors hover:bg-primary/10', { hidden: isNavigationHidden }]"
            >
              <ArrowRight
                aria-hidden="true"
                class="h-4 w-4"
              />
            </VueButton>
          </div>
        </div>
      </div>

      <div
        class="swiper main-page-listing__slider"
        ref="swiper"
      >
        <ul
          class="swiper-wrapper items-stretch"
          data-listing-swiper-wrapper
        >
          <PropertyCard
            v-for="property in filteredProperties"
            :key="property.slug"
            :property="property"
            class="swiper-slide flex"
          />
        </ul>
      </div>

      <div class="text-center">
        <VueButton
          tag="a"
          href="/properties/"
          :variant="ButtonVariant.Outline"
          :size="ButtonSize.Lg"
          class="border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Смотреть все объекты
          <ArrowRight
            aria-hidden="true"
            class="h-4 w-4"
          />
        </VueButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TPropertyListItem, TShowcaseBanner } from '@contracts';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import type SwiperInstance from 'swiper';
import { computed, nextTick, onMounted, onUnmounted, ref, useId, useTemplateRef, watch } from 'vue';

import { ButtonRounded, ButtonSize, ButtonVariant } from '@/components/vue/button/button.enums';
import VueButton from '@/components/vue/button/VueButton.vue';
import PropertyCard from '@/components/vue/property-card/PropertyCard.vue';

const props = defineProps<{
  info: TShowcaseBanner;
}>();

const propertyTypes: string[] = [
  ...new Set(props.info.properties.map((property) => property.propertyType?.name ?? '').filter(Boolean)),
];
const DEFAULT_FILTER_VALUE = 'Все';
const filters = [DEFAULT_FILTER_VALUE, ...propertyTypes] as const;
let sliderInstance: SwiperInstance | null = null;

const swiperRef = useTemplateRef<HTMLElement>('swiper');
const activeFilter = ref<string>(DEFAULT_FILTER_VALUE);
const isNavigationHidden = ref<boolean>(false);

const swiperInstanceId = useId().replace(/:/g, '-');
const sliderPrevButtonId = `slider-prev-button-${swiperInstanceId}`;
const sliderNextButtonId = `slider-next-button-${swiperInstanceId}`;

const filteredProperties = computed<TPropertyListItem[]>(() =>
  activeFilter.value === DEFAULT_FILTER_VALUE
    ? props.info.properties
    : props.info.properties.filter((property) => property.propertyType?.name === activeFilter.value),
);

function loadSwiper() {
  const loadFn = () => import('@/components/ui/swiper');
  return loadFn();
}

function updateNavigationVisibility() {
  isNavigationHidden.value = sliderInstance ? sliderInstance.isBeginning && sliderInstance.isEnd : true;
}

function onClickFilter(filter: string) {
  activeFilter.value = filter;
}

async function initSwiper() {
  const { Swiper, Navigation } = await loadSwiper();

  if (!swiperRef.value) return;

  sliderInstance = new Swiper(swiperRef.value, {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 0,
    navigation: {
      prevEl: `#${sliderPrevButtonId}`,
      nextEl: `#${sliderNextButtonId}`,
    },
  });

  sliderInstance.on('resize', updateNavigationVisibility);

  updateNavigationVisibility();
}

function destroySwiper() {
  sliderInstance?.destroy(true, true);
}

async function onFiltered() {
  if (!sliderInstance) return;

  await nextTick();

  sliderInstance.update();
  sliderInstance.slideTo(0, 0);
  updateNavigationVisibility();
}

watch(filteredProperties, onFiltered, { flush: 'post' });
onMounted(initSwiper);
onUnmounted(destroySwiper);
</script>

<style lang="scss" scoped>
.main-page-listing {
  &__slider.swiper {
    @apply px-4 py-10;

    margin-inline: calc(#{theme('size.4')} * -1);
    width: calc(100% + #{theme('size.4')} * 2);

    .swiper-slide {
      max-width: calc((100% - #{theme('size.6')} * 2) / 3);
      height: auto;

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
