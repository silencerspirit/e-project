<template>
  <div
    class="vue-image relative overflow-hidden"
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
        class="vue-image__img absolute inset-0 h-full w-full object-cover"
        :src="srcDesktop"
        :alt="alt"
        :loading="loading"
        :fetchpriority="fetchpriority"
        :decoding="decoding"
        v-bind="attrs"
      />
    </picture>

    <img
      class="vue-image__placeholder absolute inset-0 h-full w-full object-cover"
      :src="srcPlaceholder"
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
  image: TImage;
  thumbnail?: boolean;

  loading?: ImgHTMLAttributes['loading'];
  fetchpriority?: ImgHTMLAttributes['fetchpriority'];
  decoding?: ImgHTMLAttributes['decoding'];
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  fetchpriority: 'auto',
  thumbnail: false,
  decoding: 'async',
});

const { class: className, ...attrs } = useAttrs();

const alt = props.image.alternativeText ?? '';
const srcPlaceholder = props.image.formats.thumbnail || props.image.url;
const srcMobile = props.thumbnail ? srcPlaceholder : props.image.formats.small || props.image.formats.thumbnail;
const srcTablet = props.thumbnail
  ? srcPlaceholder
  : props.image.formats.medium || props.image.formats.small || props.image.formats.thumbnail;
const srcDesktop = props.thumbnail ? srcPlaceholder : props.image.formats.large || props.image.url;
</script>

<style lang="scss">
.vue-image {
  &__placeholder {
    filter: blur(14px);
    z-index: -1;
  }
}
</style>
