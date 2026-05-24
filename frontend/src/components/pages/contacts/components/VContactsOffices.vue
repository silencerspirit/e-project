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
        class="mt-12 flex h-96 items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary/50"
        :id="MAP_ID"
      ></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TContactsPage, TContactsPageOffice } from '@contracts';
import { LucideClock, LucideMapPin, LucidePhone } from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { YMap, YMapLocationRequest, YMapMarker, YMapMarkerProps } from 'ymaps3';

import LogoIcon from '@/assets/logo.svg?raw';
import { formatPhone } from '@/helpers';

const props = defineProps<{
  info: TContactsPage['contactsMapSection'];
}>();

let scriptMap: HTMLScriptElement | undefined;
let map: YMap;

const MAP_ID = 'map';
const API_KEY = '39b49b90-cd08-48f5-9c13-a35ffa021676';
const YMAP_SETTINGS: YMapLocationRequest = {
  zoom: 18,
  duration: 300,
  easing: 'ease',
};

const offices = computed<TContactsPageOffice[]>(() => props.info?.offices ?? []);
const headOffice = computed<TContactsPageOffice | undefined>(() => getHeadOffice());
const activeOfficeId = ref<string>(headOffice.value ? getOfficeId(headOffice.value) : '');

function createMarker(props: YMapMarkerProps): YMapMarker {
  const { YMapMarker } = window.ymaps3;
  const markerElement = document.createElement('div');
  markerElement.className = 'contact-map-marker';
  markerElement.innerHTML = `
    <div class="contact-map-marker__body">
      <div class="contact-map-marker__icon">${LogoIcon}</div>
    </div>
  `;

  return new YMapMarker(props, markerElement);
}

function onYmapLoad() {
  const mapEl = document.getElementById(MAP_ID);
  const { ymaps3 } = window;

  ymaps3.ready.then(() => {
    if (!mapEl || !headOffice.value) return;
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    map = new YMap(
      mapEl,
      {
        location: {
          center: [headOffice.value.longitude, headOffice.value.latitude],
          zoom: 18,
        },
      },
      [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})],
    );

    offices.value.forEach((office) => {
      map.addChild(
        createMarker({
          id: getOfficeId(office),
          coordinates: [office.longitude, office.latitude],
          onClick: () => setPosition(office),
        }),
      );
    });
  });
}

function getHeadOffice(): TContactsPageOffice | undefined {
  const [firstOffice] = offices.value;
  const headOffice = offices.value.find((office) => office.general) || firstOffice;

  return headOffice;
}

function getOfficeId(office: TContactsPageOffice): string {
  return `${office.latitude}_${office.longitude}`;
}

function addYmap() {
  if (!headOffice.value) return;

  scriptMap = document.createElement('script');
  scriptMap.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
  scriptMap.onload = onYmapLoad;
  document.body.appendChild(scriptMap);
}

function removeYmap() {
  scriptMap?.parentNode?.removeChild(scriptMap);
}

function setPosition(office: TContactsPageOffice) {
  activeOfficeId.value = getOfficeId(office);
  if (!map) return;

  map.setLocation({
    ...YMAP_SETTINGS,
    center: [office.longitude, office.latitude],
  });
}

function onClick(office: TContactsPageOffice) {
  document.getElementById(MAP_ID)?.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'center',
  });
  setPosition(office);
}

onMounted(addYmap);
onBeforeUnmount(removeYmap);
</script>

<style lang="scss">
.contact-map-marker {
  position: relative;
  display: block;
  width: 48px;
  height: 60px;
  cursor: pointer;
  transform: translate(-50%, -100%);

  &__body {
    position: relative;
    display: flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border: 3px solid rgb(var(--primary-foreground));
    border-radius: 50% 50% 50% 0;
    background-color: rgb(var(--primary));
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    transform: rotate(-45deg);
  }

  &__icon {
    display: flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    color: rgb(var(--primary-foreground));
    transform: rotate(45deg);

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
