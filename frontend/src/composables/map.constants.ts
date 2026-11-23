import type { YMapLocationRequest } from 'ymaps3';

export const YMAP_API_KEY = '39b49b90-cd08-48f5-9c13-a35ffa021676';
export const YMAP_SCRIPT_ID = 'ymaps3-script';
export const YMAP_ANIMATION_SETTINGS: Pick<YMapLocationRequest, 'duration' | 'easing'> = {
  duration: 300,
  easing: 'ease',
};

export const MAP_DEFAULT_ZOOM = 18;
export const MAP_MIN_ZOOM = 3;
export const MAP_MAX_ZOOM = 20;
export const MAP_CONTAINER_REF = 'mapContainerEl';
