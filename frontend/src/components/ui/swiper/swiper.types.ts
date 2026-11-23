import type Swiper from 'swiper';
import type * as SwiperModules from 'swiper/modules';

export interface ISwiperCore {
  Swiper: typeof Swiper;
}

export type TSwiperNavigation = Pick<typeof SwiperModules, 'Navigation'>;
export type TSwiperThumbs = Pick<typeof SwiperModules, 'Thumbs'>;
export type TSwiperFreeMode = Pick<typeof SwiperModules, 'FreeMode'>;
export type TSwiperZoom = Pick<typeof SwiperModules, 'Zoom'>;
