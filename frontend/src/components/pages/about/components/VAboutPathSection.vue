<template>
  <section
    class="v-about-path-section bg-card py-20 lg:py-28"
    aria-labelledby="about-path-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <p class="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">История</p>
        <h2
          id="about-path-title"
          class="text-balance text-3xl font-bold text-foreground sm:text-4xl"
        >
          {{ info.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {{ info.description }}
        </p>
      </div>

      <div class="relative">
        <div
          class="absolute bottom-0 left-4 top-0 w-px bg-border lg:left-1/2 lg:-translate-x-px"
          aria-hidden="true"
        ></div>
        <ol class="space-y-12">
          <li
            class="relative"
            v-for="(path, i) in info.paths"
            :key="`${path.title}-${i}`"
          >
            <div
              class="flex flex-col items-start gap-6 lg:flex-row lg:gap-12"
              :class="{ 'lg:flex-row-reverse': isReversed(i) }"
            >
              <div
                class="pl-12 lg:w-1/2 lg:pl-0"
                :class="isReversed(i) ? 'lg:pl-12 lg:text-left' : 'lg:pr-12 lg:text-right'"
              >
                <div
                  class="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <p
                    class="mb-2 inline-block text-sm font-bold text-primary"
                    v-if="path.title"
                  >
                    {{ path.title }}
                  </p>
                  <h3 class="mb-2 text-xl font-semibold text-foreground">{{ path.description }}</h3>
                  <p
                    v-if="path.additional"
                    class="leading-relaxed text-muted-foreground"
                  >
                    {{ path.additional }}
                  </p>
                </div>
              </div>
              <div class="hidden lg:block lg:w-1/2"></div>
            </div>

            <div
              class="absolute left-4 top-8 h-3 w-3 -translate-x-1.5 rounded-full bg-primary ring-4 ring-background lg:left-1/2 lg:-translate-x-1.5"
              aria-hidden="true"
            ></div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TAboutPage } from '@contracts';

defineProps<{
  info: NonNullable<TAboutPage['pathSection']>;
}>();

function isReversed(index: number) {
  return index % 2 === 1;
}
</script>
