import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import type { BehaviorType, LngLat, YMap, YMapLocationRequest, YMapMarker, YMapMarkerProps } from 'ymaps3';

import LogoIcon from '@/assets/logo.svg?raw';
import { isTouchDevice } from '@/helpers';

const API_KEY = '39b49b90-cd08-48f5-9c13-a35ffa021676';
const YMAP_SCRIPT_ID = 'ymaps3-script';
const YMAP_ANIMATION_SETTINGS: Pick<YMapLocationRequest, 'duration' | 'easing'> = {
  duration: 300,
  easing: 'ease',
};

let ymapLoadPromise: Promise<void> | undefined;

export const MAP_DEFAULT_ZOOM = 18;
export const MAP_MIN_ZOOM = 3;
export const MAP_MAX_ZOOM = 20;
export const MAP_CONTAINER_REF = 'mapContainerEl';

export type TMapMarkerProps = YMapMarkerProps;

type TInitMapOptions = {
  behaviors?: BehaviorType[];
  center: LngLat;
  container: HTMLElement | null;
  markers?: TMapMarkerProps[];
  zoom?: number;
};
type TInitMapOptionsFactory = () => TInitMapOptions | undefined;

function loadYmapScript(): Promise<void> {
  if (window.ymaps3) return Promise.resolve();
  if (ymapLoadPromise) return ymapLoadPromise;

  ymapLoadPromise = new Promise((resolve, reject) => {
    const existedScript = document.getElementById(YMAP_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existedScript ?? document.createElement('script');

    script.id = YMAP_SCRIPT_ID;
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Failed to load Yandex Maps script')), { once: true });

    if (!existedScript) document.body.appendChild(script);
  });

  return ymapLoadPromise;
}

function createMarkerElement(): HTMLElement {
  const markerElement = document.createElement('div');
  const markerBody = document.createElement('div');
  const markerIcon = document.createElement('div');

  Object.assign(markerElement.style, {
    cursor: 'pointer',
    display: 'block',
    height: '60px',
    position: 'relative',
    transform: 'translate(-50%, -100%)',
    width: '48px',
  });

  Object.assign(markerBody.style, {
    alignItems: 'center',
    backgroundColor: 'rgb(var(--primary))',
    border: '3px solid rgb(var(--primary-foreground))',
    borderRadius: '50% 50% 50% 0',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    height: '48px',
    justifyContent: 'center',
    position: 'relative',
    transform: 'rotate(-45deg)',
    width: '48px',
  });

  Object.assign(markerIcon.style, {
    alignItems: 'center',
    color: 'rgb(var(--primary-foreground))',
    display: 'flex',
    height: '28px',
    justifyContent: 'center',
    transform: 'rotate(45deg)',
    width: '28px',
  });

  markerIcon.innerHTML = LogoIcon;
  markerBody.appendChild(markerIcon);
  markerElement.appendChild(markerBody);

  return markerElement;
}

function getDefaultBehaviors(): BehaviorType[] {
  return isTouchDevice() ? [] : ['drag'];
}

export function useMap(createInitOptions?: TInitMapOptionsFactory) {
  const currentZoom = ref<number>(MAP_DEFAULT_ZOOM);
  const map = shallowRef<undefined | YMap>();
  let isActive = true;

  function createMarker(props: TMapMarkerProps): YMapMarker {
    const { YMapMarker } = window.ymaps3;

    return new YMapMarker(props, createMarkerElement());
  }

  async function initMap(options: TInitMapOptions) {
    const { container, center, markers = [], zoom = MAP_DEFAULT_ZOOM, behaviors = getDefaultBehaviors() } = options;

    if (!container) return;

    isActive = true;
    currentZoom.value = zoom;

    await loadYmapScript();
    await window.ymaps3.ready;

    if (!isActive) return;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3;

    map.value?.destroy();
    map.value = new YMap(
      container,
      {
        location: {
          center,
          zoom: currentZoom.value,
        },
        behaviors,
        zoomRange: {
          min: MAP_MIN_ZOOM,
          max: MAP_MAX_ZOOM,
        },
      },
      [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})],
    );

    markers.forEach((marker) => {
      map.value?.addChild(createMarker(marker));
    });
  }

  function destroyMap() {
    isActive = false;
    map.value?.destroy();
    map.value = undefined;
  }

  function setCenter(center: LngLat) {
    if (!map.value) return;

    map.value.setLocation({
      ...YMAP_ANIMATION_SETTINGS,
      center,
    });
  }

  function setZoom(zoom: number) {
    currentZoom.value = Math.min(MAP_MAX_ZOOM, Math.max(MAP_MIN_ZOOM, zoom));
    if (!map.value) return;

    map.value.setLocation({
      ...YMAP_ANIMATION_SETTINGS,
      zoom: currentZoom.value,
    });
  }

  function zoomIn() {
    setZoom(currentZoom.value + 1);
  }

  function zoomOut() {
    setZoom(currentZoom.value - 1);
  }

  if (createInitOptions) {
    onMounted(() => {
      const initOptions = createInitOptions();

      if (!initOptions) return;

      void initMap(initOptions);
    });
  }

  onBeforeUnmount(destroyMap);

  return {
    currentZoom,
    destroyMap,
    initMap,
    setCenter,
    setZoom,
    zoomIn,
    zoomOut,
  };
}
