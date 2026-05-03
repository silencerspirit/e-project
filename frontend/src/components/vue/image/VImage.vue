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
        :alt="alt"
        :loading="loading"
        :fetchpriority="fetchpriority"
        :decoding="decoding"
        :class="fitMap[fit]"
        v-bind="attrs"
      />
    </picture>

    <img
      class="v-image__placeholder absolute inset-0 h-full w-full"
      :src="srcPlaceholder"
      :class="fitMap[fit]"
      :alt="alt"
      aria-hidden="true"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :decoding="decoding"
      v-bind="attrs"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TImage } from '@contracts';
import { type ImgHTMLAttributes, useAttrs } from 'vue';

interface Props {
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

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  fetchpriority: 'auto',
  thumbnail: false,
  decoding: 'async',
  fit: 'cover',
});

const { class: className, ...attrs } = useAttrs();

const fitMap: Record<typeof props.fit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
};

const alt = props.image.alternativeText ?? '';
const srcPlaceholder = props.image.formats.thumbnail || props.image.url;
const srcMobile = props.thumbnail ? srcPlaceholder : props.image.formats.small || props.image.formats.thumbnail;
const srcTablet = props.thumbnail
  ? srcPlaceholder
  : props.image.formats.medium || props.image.formats.small || props.image.formats.thumbnail;
const srcDesktop = props.thumbnail ? srcPlaceholder : props.image.formats.large || props.image.url;
</script>

<style lang="scss">
.v-image {
  &__placeholder {
    filter: blur(14px);
    z-index: -1;
  }
}
</style>
