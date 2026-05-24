<template>
  <div
    class="text-center"
    aria-live="polite"
  >
    <div :class="['mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100', iconWrapperClass]">
      <CircleCheck
        :class="iconClass"
        aria-hidden="true"
      />
    </div>
    <h3 :class="titleClass">{{ title }}</h3>
    <p :class="descriptionClass">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
import { CircleCheck } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    description?: string;
    descriptionClass?: string;
    iconClass?: string;
    iconWrapperClass?: string;
    title?: string;
    titleClass?: string;
  }>(),
  {
    description: 'Наш специалист свяжется с вами в ближайшее время',
    descriptionClass: 'text-muted-foreground',
    iconClass: 'h-8 w-8 text-green-600',
    iconWrapperClass: 'h-16 w-16',
    title: 'Заявка отправлена!',
    titleClass: 'mb-2 text-xl font-semibold text-foreground',
  },
);
</script>
