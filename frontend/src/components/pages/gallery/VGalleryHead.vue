<template>
  <div class="mb-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-wrap gap-2">
      <VButton
        :rounded="ButtonRounded.Full"
        :variant="isActiveGroup('') ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onResetGroup"
      >
        Все
      </VButton>
      <VButton
        v-for="({ group, onClick }, i) in groupButtons"
        :rounded="ButtonRounded.Full"
        :key="i"
        :variant="isActiveGroup(group) ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onClick"
      >
        {{ group }}
      </VButton>
    </div>

    <div class="flex items-center gap-2">
      <span class="mr-auto text-sm text-muted-foreground md:mr-2">{{ totalText }}</span>

      <VButton
        v-for="{ viewName, icon, onClick } in viewButtons"
        :size="ButtonSize.Icon"
        :key="viewName"
        :variant="isActiveView(viewName) ? ButtonVariant.Default : ButtonVariant.Outline"
        @click="onClick"
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

import { ListView } from './gallery.enums';

const { count, currentGroup, groups, view } = defineProps<{
  count: number;
  currentGroup: string;
  groups: string[];
  view: ListView;
}>();

const emit = defineEmits<{
  groupChange: [value: string];
  viewChange: [value: ListView];
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

const viewButtons = VIEW_BUTTONS.map((button) => ({
  ...button,
  onClick() {
    onViewChange(button.viewName);
  },
}));

const groupButtons = computed<Array<{ group: string; onClick: () => void }>>(() =>
  groups.map((group) => ({
    group,
    onClick() {
      onGroupChange(group);
    },
  })),
);

const totalText = computed<string>(() => `${count} фото`);

function isActiveGroup(group: string): boolean {
  return group === currentGroup;
}

function isActiveView(item: ListView): boolean {
  return item === view;
}

function onGroupChange(group: string) {
  emit('groupChange', group);
}

function onResetGroup() {
  onGroupChange('');
}

function onViewChange(viewName: ListView) {
  emit('viewChange', viewName);
}
</script>
