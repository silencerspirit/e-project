<template>
  <section class="bg-background py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          class="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg"
          v-for="(item, i) in list"
          :key="i"
        >
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <component
              :is="getIcon(item.value)"
              class="h-6 w-6 text-primary"
            />
          </div>
          <h3 class="mb-1 font-semibold text-foreground">{{ item.title }}</h3>
          <p class="mb-3 text-sm text-muted-foreground">{{ item.description }}</p>

          <component :is="getLink(item.value)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TContactsPage } from '@contracts';
import { LucideMail, LucideMessageCircle, LucidePhone } from 'lucide-vue-next';
import { type Component, h, type VNode } from 'vue';

import { formatPhone, isEmail, isPhone } from '@/helpers';

defineProps<{ list: TContactsPage['contactsBlockSection'] }>();

function getIcon(value: string): Component {
  if (isEmail(value)) return LucideMail;
  if (isPhone(value)) return LucidePhone;

  return LucideMessageCircle;
}

function getLink(value: string): VNode {
  const selectors = 'mb-3 block self-start font-medium text-foreground transition-colors hover:text-primary';

  if (isEmail(value)) return h('a', { href: `mailto:${value}`, className: selectors }, value);

  if (isPhone(value)) return h('a', { href: `tel:${value}`, className: selectors }, formatPhone(value));

  return h('span', value);
}
</script>
