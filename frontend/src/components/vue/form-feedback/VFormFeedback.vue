<template>
  <div
    v-show="errorMessage || statusMessage"
    class="form-feedback text-center text-sm"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <p
      v-if="errorMessage"
      class="text-destructive"
    >
      {{ errorMessage }}
    </p>
    <p
      v-else-if="statusMessage"
      class="text-muted-foreground"
    >
      {{ statusMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IFormFeedbackProps } from './form-feedback.types';

defineProps<IFormFeedbackProps>();
</script>
