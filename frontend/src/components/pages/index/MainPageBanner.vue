<template>
  <section
    class="relative flex items-center"
    aria-labelledby="main-banner-title"
  >
    <div class="absolute inset-0 z-0">
      <VueImage
        v-if="info.backgroundImage"
        class="h-full w-full object-cover"
        :image="info.backgroundImage"
        fetchpriority="high"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/45"></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <h1
          id="main-banner-title"
          class="text-balance text-4xl font-bold leading-tight text-card sm:text-5xl lg:text-6xl"
        >
          {{ info.title }}
        </h1>

        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-card/80 sm:text-xl">{{ info.description }}</p>

        <MainPageForm :form="form" />

        <div
          v-if="isExistMetrics"
          class="mt-10 flex flex-wrap gap-8 lg:gap-12"
        >
          <div
            v-for="(metric, i) in info.metrics"
            :key="i"
          >
            <div class="text-3xl font-bold text-card sm:text-4xl">{{ metric.value }}</div>
            <div class="mt-1 text-sm text-card/70">{{ metric.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { THeroBanner, TMainPageForm } from '@contracts';

import VueImage from '@/components/vue/image/VueImage.vue';

import MainPageForm from './MainPageForm.vue';

const props = defineProps<{
  info: THeroBanner;
  form: TMainPageForm;
}>();

const isExistMetrics: boolean = Boolean(props.info.metrics.length);
</script>
