import type * as YMaps3 from 'ymaps3';

declare global {
  interface Window {
    ymaps3: typeof YMaps3;
  }
}

export {};
