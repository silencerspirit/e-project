<template>
  <section
    class="bg-card py-20 lg:py-28"
    aria-labelledby="property-categories-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <h2
          id="property-categories-title"
          class="text-balance text-3xl font-bold text-foreground sm:text-4xl"
        >
          {{ info.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {{ info.description }}
        </p>
      </div>

      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(feature, i) in featuresList"
          :key="i"
        >
          <component
            :is="feature.url ? 'a' : 'div'"
            class="group relative flex h-full flex-col rounded-2xl bg-secondary p-6 transition-all duration-300 hover:bg-secondary/80 hover:shadow-lg"
            v-bind="{ ...(feature.url && { href: feature.url }) }"
          >
            <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20"
            >
              <component
                :is="feature.icon"
                aria-hidden="true"
                class="h-7 w-7 text-primary"
              />
            </div>

            <h3 class="mb-2 text-xl font-semibold text-foreground">{{ feature.title }}</h3>

            <p class="mb-4 text-sm leading-relaxed text-muted-foreground">{{ feature.description }}</p>

            <div class="mt-auto flex items-center justify-between">
              <span class="text-sm font-medium text-primary">{{ feature.additional }}</span>

              <ArrowRight
                v-if="feature.url"
                aria-hidden="true"
                class="h-5 w-5 -translate-x-2 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              />
            </div>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TFeatureBanner } from '@contracts';
import { ArrowRight, Building, House, Key, Store } from 'lucide-vue-next';
const props = defineProps<{
  info: TFeatureBanner;
}>();

const ICONS = [Building, House, Store, Key];

const featuresList = props.info.features.map((feature, i) => ({
  ...feature,
  icon: ICONS[i] ?? Building,
}));
</script>
