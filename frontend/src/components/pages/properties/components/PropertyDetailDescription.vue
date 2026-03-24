<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-foreground">Описание</h2>

    <div
      class="html-content"
      v-html="item.description"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TPropertyFullItem } from '@contracts';

defineProps<{
  item: TPropertyFullItem;
}>();
</script>
