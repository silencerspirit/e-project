<template>
  <section
    class="bg-foreground py-20 text-card lg:py-28"
    aria-labelledby="main-page-advantages-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <h2
          id="main-page-advantages-title"
          class="text-balance text-3xl font-bold sm:text-4xl"
        >
          {{ info.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-card/70">{{ info.description }}</p>
      </div>

      <ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <li
          class="list-none"
          v-for="(adv, i) in advantages"
          :key="i"
        >
          <article
            class="relative h-full rounded-2xl border border-card/10 bg-card/5 p-6 transition-colors hover:bg-card/10"
          >
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <component
                :is="adv.icon"
                aria-hidden="true"
                class="h-6 w-6 text-primary-foreground"
              />
            </div>
            <h3 class="mb-3 text-xl font-semibold">{{ adv.title }}</h3>
            <p class="leading-relaxed text-card/70">{{ adv.description }}</p>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TFeatureBanner } from '@contracts';
import { Clock, Leaf, Lightbulb, PiggyBank, Shield, Users } from 'lucide-vue-next';

const props = defineProps<{ info: TFeatureBanner }>();

const ICONS = [Lightbulb, Leaf, PiggyBank, Shield, Clock, Users];

const advantages = props.info.features.map((feature, i) => ({
  ...feature,
  icon: ICONS[i] ?? Lightbulb,
}));
</script>
