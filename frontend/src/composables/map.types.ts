import type { BehaviorType, LngLat, YMapMarkerProps } from 'ymaps3';

export type TMapMarkerProps = YMapMarkerProps;

export interface IInitMapOptions {
  behaviors?: BehaviorType[];
  center: LngLat;
  container: HTMLElement | null;
  markers?: TMapMarkerProps[];
  zoom?: number;
}

export type TInitMapOptionsFactory = () => IInitMapOptions | undefined;
