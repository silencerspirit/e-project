<template>
  <li
    class="v-property-card w-full"
    :class="[{ 'v-property-card--row': row }, className]"
    v-bind="attrs"
  >
    <a
      :href="link"
      class="v-property-card__item group flex h-full w-full overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
    >
      <div class="v-property-card__image-container relative shrink-0 overflow-hidden">
        <VImage
          v-if="property.previewImage"
          :image="property.previewImage"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        <div
          class="absolute left-4 top-4"
          v-if="badge"
        >
          <span class="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {{ badge }}
          </span>
        </div>
      </div>

      <div class="flex grow flex-col p-6">
        <h3 class="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
          {{ property.title }}
        </h3>

        <div class="mt-2 flex items-center gap-2 text-muted-foreground">
          <MapPin
            aria-hidden="true"
            class="h-4 w-4"
          />
          <span class="text-sm">{{ property.address }}</span>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-4 pb-6 text-sm text-foreground/70">
          <div
            class="flex items-center gap-1.5"
            v-for="spec in specs"
            :key="spec.key"
          >
            <component
              :is="SPEC_ICON_MAP[spec.key]"
              aria-hidden="true"
              class="h-4 w-4"
            />
            <span> {{ spec.label }}: {{ spec.value }} </span>
          </div>

          <p class="v-property-card__short-description line-clamp-2">{{ property.shortDescription }}</p>
        </div>

        <div class="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div class="text-xl font-bold text-primary">
            {{ price }}
          </div>

          <span
            class="inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm text-primary transition-colors group-hover:bg-primary/10"
            v-if="!hideDetails"
          >
            Подробнее
            <ArrowRight
              aria-hidden="true"
              class="h-4 w-4"
            />
          </span>
        </div>
      </div>
    </a>
  </li>
</template>

<script lang="ts" setup>
import type { TPropertyListItem, TSpecItem } from '@contracts';
import { ArrowRight, MapPin } from 'lucide-vue-next';
import { computed, useAttrs } from 'vue';

import { PRICE_PER_M2_SUFFIX, PRICE_SUFFIX } from '@/constants';
import { formatPrice } from '@/helpers';

import VImage from '../image/VImage.vue';
import { SPEC_ICON_MAP } from './property-card.icons';

const props = defineProps<{
  fullPrice?: boolean;
  hideDetails?: boolean;
  property: TPropertyListItem;
  row?: boolean;
}>();

defineOptions({
  inheritAttrs: false,
});

const { class: className, ...attrs } = useAttrs();

const link = computed<string>(() => `/properties/${props.property.slug}/`);
const price = computed<string>(() => {
  if (props.fullPrice) return `${formatPrice(props.property.priceFrom)} ${PRICE_SUFFIX}`;

  return `от ${formatPrice(props.property.pricePerM2)} ${PRICE_PER_M2_SUFFIX}`;
});

const specs = computed<TSpecItem[]>(() => props.property.specifications.slice(0, 2));

const badge = computed<string>(() => props.property.badges[0]?.value ?? '');
</script>

<style lang="scss">
.v-property-card {
  $p: &;

  &--row {
    @media (min-width: theme('screens.lg')) {
      min-height: 256px;
    }
  }

  &__image-container {
    @apply aspect-video;

    @media (min-width: theme('screens.lg')) {
      #{$p}--row & {
        @apply aspect-square;
      }
    }
  }

  &__item {
    @apply flex-col;

    @media (min-width: theme('screens.lg')) {
      #{$p}--row & {
        @apply flex-row;
      }
    }
  }

  &__short-description {
    @media (min-width: theme('screens.lg')) {
      &:not(#{$p}--row &) {
        @apply hidden;
      }
    }

    @media (max-width: calc(#{theme('screens.lg')} - 1px)) {
      @apply hidden;
    }
  }
}
</style>
