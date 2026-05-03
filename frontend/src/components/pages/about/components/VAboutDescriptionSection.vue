<template>
  <section
    class="v-about-description-section bg-card py-20 lg:py-28"
    aria-labelledby="about-description-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div class="v-about-description-section__image relative">
          <VImage
            :image="info?.image"
            v-if="info?.image"
            fit="cover"
            class="v-about-description-section__image-picture rounded-2xl"
          />

          <div
            class="v-about-description-section__image-label absolute flex flex-col rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl"
            v-if="info?.advantage"
          >
            <span class="text-4xl font-bold">{{ info.advantage.value }}</span>
            <span class="mt-1 text-sm text-primary-foreground/80">{{ info.advantage.label }}</span>
          </div>
        </div>

        <article class="flex flex-col">
          <p class="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">О нас</p>
          <h2
            id="about-description-title"
            class="text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            {{ info?.title }}
          </h2>

          <div
            v-if="info?.content"
            class="html-content mt-6 space-y-4 leading-relaxed text-muted-foreground"
            v-html="info?.content"
          ></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TAboutPage } from '@contracts';

import VImage from '@/components/vue/image/VImage.vue';

defineProps<{
  info: TAboutPage['descriptionSection'];
}>();
</script>

<style lang="scss">
.v-about-description-section {
  &__image-picture {
    aspect-ratio: 4 / 3;
  }

  &__image-label {
    bottom: -24px;
    right: 32px;
  }
}
</style>
