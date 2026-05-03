<template>
  <div class="mb-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-wrap gap-2">
      <VButton
        :rounded="ButtonRounded.Full"
        :variant="isActiveGroup('') ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onChangeGroup('')"
      >
        Все
      </VButton>
      <VButton
        v-for="(group, i) in groups"
        :rounded="ButtonRounded.Full"
        :key="i"
        :variant="isActiveGroup(group) ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onChangeGroup(group)"
      >
        {{ group }}
      </VButton>
    </div>

    <div class="flex items-center gap-2">
      <span class="mr-auto text-sm text-muted-foreground md:mr-2">{{ totalText }}</span>

      <VButton
        v-for="{ viewName, icon } in VIEW_BUTTONS"
        :size="ButtonSize.Icon"
        :key="viewName"
        :variant="isActiveView(viewName) ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onChangeView(viewName)"
      >
        <component
          :is="icon"
          class="h-4 w-4"
        />
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Grid3X3, LayoutGrid } from 'lucide-vue-next';
import { type Component, computed } from 'vue';

import { ButtonRounded, ButtonSize, ButtonVariant } from '@/components/vue/button/button.enums';
import VButton from '@/components/vue/button/VButton.vue';

import { ListView } from '../gallery.enums';

const props = defineProps<{ count: number; currentGroup: string; groups: string[]; view: ListView }>();

const emit = defineEmits<{
  changeGroup: [value: string];
  changeView: [value: ListView];
}>();

const VIEW_BUTTONS: {
  icon: Component;
  viewName: ListView;
}[] = [
  {
    viewName: ListView.Grid3X3,
    icon: Grid3X3,
  },
  {
    viewName: ListView.Grid2X2,
    icon: LayoutGrid,
  },
];

const totalText = computed<string>(() => `${props.count} фото`);

function isActiveGroup(group: string): boolean {
  return group === props.currentGroup;
}

function isActiveView(item: ListView): boolean {
  return item === props.view;
}

function onChangeGroup(group: string) {
  emit('changeGroup', group);
}

function onChangeView(viewName: ListView) {
  emit('changeView', viewName);
}
</script>
