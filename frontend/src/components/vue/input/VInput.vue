<template>
  <input
    v-maska="maskOptions"
    v-model="model"
    v-bind="inputAttrs"
    class="shadow-xs h-9 w-full rounded-md border border-input px-3 py-1 text-base outline-none transition-colors file:inline-flex placeholder:text-muted-foreground focus:ring-ring focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    :class="className"
  />
</template>

<script lang="ts" setup>
import type { MaskOptions, MaskType } from 'maska';
import { vMaska } from 'maska/vue';
import { computed, type InputHTMLAttributes, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  maska?: MaskType;

  max?: InputHTMLAttributes['max'];
  name?: InputHTMLAttributes['name'];
  placeholder?: InputHTMLAttributes['placeholder'];
  type?: InputHTMLAttributes['type'];
}>();

const model = defineModel<string>();
const { class: className, ...attrs } = useAttrs();

const maskOptions = computed<MaskOptions | undefined>(() => (props.maska ? { mask: props.maska } : undefined));
const inputAttrs = computed<Record<string, unknown>>(() => ({
  ...props,
  type: 'text',
  ...attrs,
}));
</script>
