<template>
  <component
    :is="tag"
    v-bind="forwardedAttrs"
    :disabled="tag === 'button' ? disabled : undefined"
    class="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-all transition-colors focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-ring/50"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ClassValue, computed, useAttrs } from 'vue';

import { ButtonRounded, ButtonSize, ButtonVariant } from './button.enums';

interface ICommonProps {
  rounded?: ButtonRounded;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

interface IButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes, ICommonProps {
  disabled?: boolean;
  tag?: 'button';
}

interface IAnchorProps extends /* @vue-ignore */ AnchorHTMLAttributes, ICommonProps {
  disabled?: boolean;
  tag?: 'a';
}

const {
  disabled,
  tag = 'button',
  size = ButtonSize.Default,
  variant = ButtonVariant.Default,
  rounded = ButtonRounded.Md,
} = defineProps<IAnchorProps | IButtonProps>();

defineOptions({
  inheritAttrs: false,
});

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.Default]: 'bg-primary text-primary-foreground hover:bg-primary/90',
  [ButtonVariant.Outline]: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
  [ButtonVariant.Link]: 'text-primary underline-offset-4 hover:underline',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.Default]: 'h-9 px-4 py-2',
  [ButtonSize.Sm]: 'h-8 gap-1.5 px-3',
  [ButtonSize.Lg]: 'h-10 px-6',
  [ButtonSize.Xl]: 'h-12 px-6',
  [ButtonSize.Icon]: 'size-9',
};

const ROUNDED_CLASSES: Record<ButtonRounded, string> = {
  [ButtonRounded.Md]: 'rounded-md',
  [ButtonRounded.Full]: 'rounded-full',
  [ButtonRounded.None]: 'rounded-none',
};

const attrs = useAttrs();

const className = computed<ClassValue>(() => attrs.class);
const forwardedAttrs = computed<Record<string, unknown>>(() => {
  const restAttrs = { ...attrs };
  delete restAttrs.class;
  return restAttrs;
});
const buttonClasses = computed<ClassValue>(() => [
  disabled ? 'pointer-events-none opacity-50' : '',
  VARIANT_CLASSES[variant],
  SIZE_CLASSES[size],
  ROUNDED_CLASSES[rounded],
  className.value,
]);
</script>
