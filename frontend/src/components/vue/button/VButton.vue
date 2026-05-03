<template>
  <component
    :is="tag"
    v-bind="forwardedAttrs"
    :class="[
      disabledClassNames,
      baseClasses,
      variantClassesMap[variant],
      sizeClassesMap[size],
      roundedMap[rounded],
      className,
    ]"
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

const props = withDefaults(defineProps<IAnchorProps | IButtonProps>(), {
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
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-ring transition-colors';

const disabledClassNames = computed<string>(() => (props.disabled ? 'pointer-events-none opacity-50' : ''));

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
