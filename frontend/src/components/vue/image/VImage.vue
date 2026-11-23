<template>
  <div
    class="v-image relative overflow-hidden"
    :class="className"
  >
    <picture class="block h-full w-full">
      <source
        media="(max-width: 768px)"
        :srcset="srcMobile"
      />
      <source
        media="(max-width: 1024px)"
        :srcset="srcTablet"
      />
      <img
        class="v-image__img absolute inset-0 h-full w-full"
        :src="srcDesktop"
        :alt
        :loading
        :fetchpriority
        :decoding
        :class="FIT_CLASSES[fit]"
        v-bind="attrs"
      />
    </picture>

    <img
      class="v-image__placeholder absolute inset-0 h-full w-full"
      :src="srcPlaceholder"
      :class="FIT_CLASSES[fit]"
      :alt
      aria-hidden="true"
      :loading
      :fetchpriority
      :decoding
      v-bind="attrs"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TImage } from '@contracts';
import { type ImgHTMLAttributes, useAttrs } from 'vue';

interface IImageProps {
  decoding?: ImgHTMLAttributes['decoding'];
  fetchpriority?: ImgHTMLAttributes['fetchpriority'];
  fit?: 'contain' | 'cover';

  image: TImage;
  loading?: ImgHTMLAttributes['loading'];
  thumbnail?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const {
  image,
  loading = 'lazy',
  fetchpriority = 'auto',
  thumbnail = false,
  decoding = 'async',
  fit = 'cover',
} = defineProps<IImageProps>();

const { class: className, ...attrs } = useAttrs();

const FIT_CLASSES: Record<NonNullable<IImageProps['fit']>, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
};

const alt = image.alternativeText ?? '';
const srcPlaceholder = image.formats.thumbnail || image.url;
const srcMobile = thumbnail ? srcPlaceholder : image.formats.small || image.formats.thumbnail;
const srcTablet = thumbnail ? srcPlaceholder : image.formats.medium || image.formats.small || image.formats.thumbnail;
const srcDesktop = thumbnail ? srcPlaceholder : image.formats.large || image.url;
</script>

<style lang="scss">
.v-image {
  &__placeholder {
    filter: blur(14px);
    z-index: -1;
  }
}
</style>
