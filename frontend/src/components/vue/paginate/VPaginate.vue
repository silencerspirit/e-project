<template>
  <nav
    v-if="isVisible"
    class="flex"
    :class="$attrs.class"
    aria-label="Навигация по страницам"
  >
    <ul class="flex flex-wrap items-center justify-center gap-2">
      <li
        v-for="(item, index) in items"
        :key="`${item}-${index}`"
      >
        <span
          v-if="item === ELLIPSIS"
          aria-hidden="true"
          class="flex h-10 min-w-10 items-center justify-center px-1 text-sm font-medium text-muted-foreground"
        >
          {{ item }}
        </span>

        <span
          v-else-if="item === currentPage"
          aria-current="page"
          class="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm"
        >
          {{ item }}
        </span>

        <a
          v-else
          :href="buildHref(item)"
          :aria-label="`Страница ${item}`"
          class="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type { TPaginate } from '@contracts';
import { computed } from 'vue';

import { useAstro } from '@/composables';

defineOptions({
  inheritAttrs: false,
});

const ELLIPSIS = '...';

const props = defineProps<{
  paginate: TPaginate;
}>();

const { url } = useAstro();

const totalPages = computed<number>(() => props.paginate.totalPages);
const currentPage = computed<number>(() => {
  if (totalPages.value <= 0) {
    return 0;
  }

  return Math.min(Math.max(props.paginate.page, 1), totalPages.value);
});

const visiblePages = computed<number[]>(() => buildVisiblePages(totalPages.value, currentPage.value));
const items = computed<Array<number | typeof ELLIPSIS>>(() => {
  const result: Array<number | typeof ELLIPSIS> = [];

  for (let index = 0; index < visiblePages.value.length; index += 1) {
    const page = visiblePages.value[index];
    const previousPage = visiblePages.value[index - 1];

    if (index > 0 && previousPage !== undefined && page - previousPage > 1) {
      result.push(ELLIPSIS);
    }

    result.push(page);
  }

  return result;
});

const isVisible = computed<boolean>(() => totalPages.value > 1);

function buildHref(targetPage: number): string {
  const search = (import.meta.env.SSR ? url?.search : window.location.search) ?? '';
  const params = new URLSearchParams(search);

  if (targetPage <= 1) {
    params.delete('page');
  } else {
    params.set('page', String(targetPage));
  }

  const query = params.toString();
  const pathname = (import.meta.env.SSR ? url?.pathname : window.location.pathname) ?? '';

  return query ? `${pathname}?${query}` : (pathname ?? '');
}

function buildVisiblePages(total: number, current: number): number[] {
  if (total <= 0) {
    return [];
  }

  if (total <= 4) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 2) {
    return [1, 2, 3, total];
  }

  if (current === 3) {
    return [1, 2, 3, 4, total];
  }

  if (current >= total - 1) {
    return [1, total - 2, total - 1, total];
  }

  if (current === total - 2) {
    return [1, total - 3, total - 2, total - 1, total];
  }

  return [1, current - 1, current, current + 1, total];
}
</script>
