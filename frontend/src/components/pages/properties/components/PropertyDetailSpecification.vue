<template>
  <div class="rounded-2xl border border-border bg-card p-6 lg:p-8">
    <div class="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-muted-foreground">Стоимость</p>
        <p class="text-3xl font-bold text-primary">от {{ formatPrice(item.priceFrom) }} {{ PRICE_SUFFIX }}</p>
      </div>
      <div class="sm:text-right">
        <p class="text-sm text-muted-foreground">Цена за м²</p>
        <p class="text-xl font-semibold text-foreground">
          {{ `${formatPrice(item.pricePerM2)} ${PRICE_PER_M2_SUFFIX}` }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      <div
        class="flex items-start gap-3"
        v-for="spec in item.specifications"
        :key="spec.key"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <component
            :is="SPEC_ICON_MAP[spec.key]"
            class="h-5 w-5 text-primary"
            aria-hidden="true"
          />
        </div>
        <div>
          <p class="text-xs text-muted-foreground">{{ spec.label }}</p>
          <p class="mt-0.5 text-sm font-semibold text-foreground">{{ spec.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TPropertyFullItem } from '@contracts';

import { SPEC_ICON_MAP } from '@/components/vue/property-card/property-card.icons';
import { PRICE_PER_M2_SUFFIX, PRICE_SUFFIX } from '@/constants';
import { formatPrice } from '@/helpers';

defineProps<{
  item: TPropertyFullItem;
}>();
</script>
