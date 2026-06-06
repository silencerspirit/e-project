<template>
  <section class="bg-background py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <h2 class="text-balance text-3xl font-bold text-foreground sm:text-4xl">{{ info?.title }}</h2>
        <p
          class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          v-if="info?.description"
        >
          {{ info.description }}
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          class="relative rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
          v-for="(office, i) in offices"
          :key="i"
          :class="{
            'border-border': activeOfficeId !== getOfficeId(office),
            'border-primary': activeOfficeId === getOfficeId(office),
          }"
          @click="onClick(office)"
        >
          <span
            v-if="office.general"
            class="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
          >
            Главный офис
          </span>

          <h3 class="mb-4 mt-1 text-xl font-bold text-foreground">{{ office.city }}</h3>

          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <LucideMapPin class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span class="text-foreground">{{ office.address }}</span>
            </div>

            <div class="flex items-center gap-3">
              <LucidePhone class="h-5 w-5 flex-shrink-0 text-primary" />
              <a
                @click.stop
                :href="`tel:${office.phone}`"
                class="text-foreground transition-colors hover:text-primary"
              >
                {{ formatPhone(office.phone) }}
              </a>
            </div>

            <div class="flex items-center gap-3">
              <LucideClock class="h-5 w-5 flex-shrink-0 text-primary" />
              <span class="text-muted-foreground"> {{ office.workTime }} </span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="headOffice"
        class="relative mt-12 h-96 overflow-hidden rounded-2xl border border-border bg-secondary/50"
      >
        <div
          :ref="MAP_CONTAINER_REF"
          class="h-full w-full"
        ></div>

        <VMapZoomControls
          :current-zoom="currentZoom"
          :max-zoom="MAP_MAX_ZOOM"
          :min-zoom="MAP_MIN_ZOOM"
          @zoom-in="zoomIn"
          @zoom-out="zoomOut"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TContactsPage, TContactsPageOffice } from '@contracts';
import { LucideClock, LucideMapPin, LucidePhone } from 'lucide-vue-next';
import { computed, ref, useTemplateRef } from 'vue';

import VMapZoomControls from '@/components/vue/map/VMapZoomControls.vue';
import { MAP_CONTAINER_REF, MAP_MAX_ZOOM, MAP_MIN_ZOOM, useMap } from '@/composables';
import { formatPhone } from '@/helpers';

const props = defineProps<{
  info: TContactsPage['contactsMapSection'];
}>();

const offices = computed<TContactsPageOffice[]>(() => props.info?.offices ?? []);
const headOffice = computed<TContactsPageOffice | undefined>(() => getHeadOffice());
const activeOfficeId = ref<string>(headOffice.value ? getOfficeId(headOffice.value) : '');
const mapContainerEl = useTemplateRef<HTMLElement>(MAP_CONTAINER_REF);
const { currentZoom, setCenter, zoomIn, zoomOut } = useMap(() => {
  if (!headOffice.value) return;

  return {
    container: mapContainerEl.value,
    center: [headOffice.value.longitude, headOffice.value.latitude],
    markers: offices.value.map((office) => ({
      id: getOfficeId(office),
      coordinates: [office.longitude, office.latitude],
      onClick: () => setPosition(office),
    })),
  };
});

function getHeadOffice(): TContactsPageOffice | undefined {
  const [firstOffice] = offices.value;
  const headOffice = offices.value.find((office) => office.general) || firstOffice;

  return headOffice;
}

function getOfficeId(office: TContactsPageOffice): string {
  return `${office.latitude}_${office.longitude}`;
}

function setPosition(office: TContactsPageOffice) {
  activeOfficeId.value = getOfficeId(office);
  setCenter([office.longitude, office.latitude]);
}

function onClick(office: TContactsPageOffice) {
  mapContainerEl.value?.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'center',
  });
  setPosition(office);
}
</script>
