<template>
  <div class="mt-6 rounded-2xl border border-border bg-card p-6">
    <h4 class="mb-4 font-semibold text-foreground">Технические характеристики</h4>

    <div class="space-y-4">
      <div
        class="flex items-start gap-3"
        v-for="item in techSpecification"
        :key="item.key"
      >
        <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <component
            :is="SPEC_ICON_MAP[item.key]"
            class="h-4 w-4 text-primary"
            aria-hidden="true"
          />
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">{{ item.label }}</p>
          <p class="mt-0.5 text-xs text-muted-foreground">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TSpecItem } from '@contracts';

import { SPEC_ICON_MAP } from '@/components/vue/property-card/property-card.icons';

defineProps<{
  techSpecification: TSpecItem[];
}>();
</script>
