<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-foreground">{{ title }}</h2>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div
        v-for="(item, i) in list"
        class="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
        :key="i"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          :class="{ 'bg-primary/10': !inverse, 'bg-secondary': inverse }"
        >
          <component
            :is="icon"
            class="h-4 w-4"
            :class="{ 'text-muted-foreground': inverse, 'text-primary': !inverse }"
            aria-hidden="true"
          />
        </div>
        <span class="text-sm font-medium text-foreground">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TBadge } from '@contracts';
import type { FunctionalComponent } from 'vue';

withDefaults(
  defineProps<{
    icon: FunctionalComponent;
    inverse?: boolean;
    list: TBadge[];
    title: string;
  }>(),
  {
    inverse: false,
  },
);
</script>
