<template>
  <section
    class="v-about-values-section bg-foreground py-20 text-card lg:py-28"
    aria-labelledby="about-values-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p class="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Наши ценности</p>
          <h2
            id="about-values-title"
            class="text-balance text-3xl font-bold leading-tight sm:text-4xl"
          >
            {{ info.title }}
          </h2>
          <p class="mt-4 max-w-lg text-lg text-card/70">
            {{ info.description }}
          </p>

          <ul class="mt-10 grid gap-6 sm:grid-cols-2">
            <li
              class="rounded-2xl border border-card/10 bg-card/5 p-5 transition-colors hover:bg-card/10"
              v-for="(item, i) in info.features"
              :key="`${item.title}-${i}`"
            >
              <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <component
                  :is="icons[i]"
                  aria-hidden="true"
                  class="h-5 w-5 text-primary-foreground"
                />
              </div>
              <h3 class="mb-2 text-lg font-semibold">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-card/70">{{ item.description }}</p>
            </li>
          </ul>
        </div>

        <figure class="relative">
          <VImage
            :image="info.image"
            class="aspect-square rounded-2xl"
            fit="cover"
            rounded-2xl
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TAboutPage } from '@contracts';
import { LucideEye, LucideHandshake, LucideHeart, LucideShield } from 'lucide-vue-next';

import VImage from '@/components/vue/image/VImage.vue';

defineProps<{
  info: NonNullable<TAboutPage['valuesSection']>;
}>();

const icons = [LucideShield, LucideHeart, LucideEye, LucideHandshake];
</script>
