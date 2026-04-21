<template>
  <div class="mb-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-wrap gap-2">
      <VueButton
        :rounded="ButtonRounded.Full"
        :variant="isActiveGroup('') ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onChangeGroup('')"
      >
        Все
      </VueButton>
      <VueButton
        v-for="(group, i) in groups"
        :rounded="ButtonRounded.Full"
        :key="i"
        :variant="isActiveGroup(group) ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onChangeGroup(group)"
      >
        {{ group }}
      </VueButton>
    </div>

    <div class="flex items-center gap-2">
      <span class="mr-auto text-sm text-muted-foreground md:mr-2">{{ totalText }}</span>

      <VueButton
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
      </VueButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Grid3X3, LayoutGrid } from 'lucide-vue-next';
import { type Component, computed } from 'vue';

import { ButtonRounded, ButtonSize, ButtonVariant } from '@/components/vue/button/button.enums';
import VueButton from '@/components/vue/button/VueButton.vue';

import { ListView } from '../gallery.enums';

const props = defineProps<{ view: ListView; groups: string[]; currentGroup: string; count: number }>();

const emit = defineEmits<{
  changeView: [value: ListView];
  changeGroup: [value: string];
}>();

const VIEW_BUTTONS: {
  viewName: ListView;
  icon: Component;
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
