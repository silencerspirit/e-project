<template>
  <component
    :is="tag"
    v-bind="forwardedAttrs"
    :class="[baseClasses, variantClassesMap[variant], sizeClassesMap[size], roundedMap[rounded], className]"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ClassValue, computed, useAttrs } from 'vue';

import { ButtonRounded, ButtonSize, ButtonVariant } from './button.enums';

interface ICommonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
}

interface IButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes, ICommonProps {
  tag?: 'button';
}

interface IAnchorProps extends /* @vue-ignore */ AnchorHTMLAttributes, ICommonProps {
  tag?: 'a';
}

withDefaults(defineProps<IButtonProps | IAnchorProps>(), {
  tag: 'button',
  size: ButtonSize.Default,
  variant: ButtonVariant.Default,
  rounded: ButtonRounded.Md,
});

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const className = computed<ClassValue>(() => attrs.class);
const forwardedAttrs = computed(() => {
  const restAttrs = { ...attrs };

  delete restAttrs.class;

  return restAttrs;
});

const baseClasses =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-ring transition-colors';

const variantClassesMap: Record<ButtonVariant, string> = {
  [ButtonVariant.Default]: 'bg-primary text-primary-foreground hover:bg-primary/90',
  [ButtonVariant.Outline]: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
  [ButtonVariant.Link]: 'text-primary underline-offset-4 hover:underline',
};

const sizeClassesMap: Record<ButtonSize, string> = {
  [ButtonSize.Default]: 'h-9 px-4 py-2',
  [ButtonSize.Sm]: 'h-8 gap-1.5 px-3',
  [ButtonSize.Lg]: 'h-10 px-6',
  [ButtonSize.Icon]: 'size-9',
};

const roundedMap: Record<ButtonRounded, string> = {
  [ButtonRounded.Md]: 'rounded-md',
  [ButtonRounded.Full]: 'rounded-full',
  [ButtonRounded.None]: 'rounded-none',
};
</script>
