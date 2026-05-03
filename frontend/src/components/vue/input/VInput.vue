<template>
  <input
    v-maska="maskOptions"
    v-model="model"
    v-bind="{ ...props, ...inputAttrs }"
    :class="[baseClasses, baseActiveClasses, className]"
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

const maskOptions = computed<MaskOptions | undefined>(() => (props.maska ? { mask: props.maska } : undefined));

const model = defineModel<string>();

const baseClasses = [
  'shadow-xs',
  'h-9',
  'w-full',
  'rounded-md',
  'border',
  'border-input',
  'px-3',
  'py-1',
  'text-base',
  'outline-none',
  'transition-colors',
  'file:inline-flex',
  'placeholder:text-muted-foreground',
  'disabled:pointer-events-none',
  'disabled:cursor-not-allowed',
  'disabled:opacity-50',
  'md:text-sm',
].join(' ');

const baseActiveClasses = [
  'focus:ring-ring',
  'focus-visible:border-ring',
  'focus-visible:ring-ring',
  'focus-visible:ring-ring/50',
].join(' ');

const { class: className, ...attrs } = useAttrs();

const inputAttrs = computed(() => ({
  type: 'text',
  ...attrs,
}));
</script>
