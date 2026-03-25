<template>
  <section class="bg-foreground py-12 lg:py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Хлебные крошки"
        class="text-sm text-card/70"
      >
        <ol class="flex flex-wrap items-center gap-1.5">
          <li class="flex items-center gap-1.5">
            <a
              href="/"
              class="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <House
                class="h-4 w-4"
                aria-hidden="true"
              />
              <span class="sr-only">Главная</span>
            </a>

            <ChevronRight
              v-if="isEmptyItems"
              class="h-4 w-4 text-border"
              aria-hidden="true"
            />
          </li>

          <li
            v-for="(item, i) in items"
            :key="i"
            class="flex items-center gap-1.5"
          >
            <ChevronRight
              class="h-4 w-4 text-border"
              aria-hidden="true"
            />

            <a
              v-if="item.href"
              :href="item.href"
              class="transition-colors hover:text-primary"
            >
              {{ item.label }}
            </a>

            <ChevronRight
              v-if="i === items.length - 1"
              class="h-4 w-4 text-border"
              aria-hidden="true"
            />
          </li>
        </ol>
      </nav>

      <div
        v-if="status || category"
        class="mt-6 flex flex-wrap items-center gap-3"
      >
        <span
          v-if="status"
          class="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
          >{{ status }}</span
        >
        <span
          v-if="category"
          class="rounded-full bg-card/10 px-3 py-1 text-xs font-medium text-card"
          >{{ category }}</span
        >
      </div>

      <h1
        v-if="title"
        class="mt-4 text-balance text-3xl font-bold leading-tight text-card sm:text-4xl lg:text-5xl"
      >
        {{ title }}
      </h1>

      <p
        v-if="description"
        class="mt-3 text-lg text-card/70"
      >
        {{ description }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ChevronRight, House } from 'lucide-vue-next';
import { computed } from 'vue';

import type { IBreadcrumbsProps } from './breadcrumbs.types';

const props = withDefaults(defineProps<IBreadcrumbsProps>(), {
  items: () => [],
  category: '',
  description: '',
  status: '',
});

const isEmptyItems = computed<boolean>(() => !props.items.length);
</script>
