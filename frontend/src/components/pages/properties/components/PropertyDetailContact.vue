<template>
  <div class="mt-6 rounded-2xl bg-foreground p-6 text-center">
    <p class="mb-2 text-sm text-card/70">Звоните бесплатно</p>
    <a
      :href="telHref"
      class="text-xl font-bold text-card transition-colors hover:text-primary"
    >
      {{ formatPhone(config.phone ?? '') }}
    </a>
    <p class="mt-2 text-xs text-card/50">{{ config.workTime }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { TSiteConfig } from '@contracts';

import { formatPhone } from '@/helpers';

const props = defineProps<{
  config: TSiteConfig;
}>();

const telHref = `tel:${props.config.phone?.replace(/\D/g, '')}`;
</script>
