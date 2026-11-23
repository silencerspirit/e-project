<template>
  <section
    class="v-about-facts-section bg-background py-20 lg:py-28"
    aria-labelledby="about-facts-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <p class="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Цифры и факты</p>
        <h2
          id="about-facts-title"
          class="text-balance text-3xl font-bold text-foreground sm:text-4xl"
        >
          {{ info?.title }}
        </h2>
      </div>

      <ul
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        v-if="info?.features.length"
      >
        <li
          class="relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
          v-for="(feature, i) in info.features"
          :key="`${feature.title}-${i}`"
        >
          <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <component
              :is="icons[i]"
              aria-hidden="true"
              class="h-7 w-7 text-primary"
            />
          </div>

          <p class="mb-2 text-4xl font-bold text-foreground">{{ feature.title }}</p>
          <h3 class="mb-1 text-base font-semibold text-foreground">
            {{ feature.description }}
          </h3>

          <p class="text-sm leading-relaxed text-muted-foreground">
            {{ feature.additional }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TAboutPage } from '@contracts';
import { LucideAward, LucideBuilding2, LucideMapPin, LucideUsers } from 'lucide-vue-next';

defineProps<{
  info: TAboutPage['factsSection'];
}>();

const icons = [LucideBuilding2, LucideUsers, LucideMapPin, LucideAward];
</script>
