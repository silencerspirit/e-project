import 'swiper/css';
import 'swiper/css/zoom';

import type { ISwiperCore, TSwiperFreeMode, TSwiperNavigation, TSwiperThumbs, TSwiperZoom } from './swiper.types';

export async function loadSwiperCore(): Promise<ISwiperCore> {
  const { default: Swiper } = await import('swiper');
  return { Swiper };
}

export async function loadSwiperNavigation(): Promise<TSwiperNavigation> {
  const { Navigation } = await import('swiper/modules');
  return { Navigation };
}

export async function loadSwiperThumbs(): Promise<TSwiperThumbs> {
  const { Thumbs } = await import('swiper/modules');
  return { Thumbs };
}

export async function loadSwiperFreeMode(): Promise<TSwiperFreeMode> {
  const { FreeMode } = await import('swiper/modules');
  return { FreeMode };
}

export async function loadSwiperZoom(): Promise<TSwiperZoom> {
  const { Zoom } = await import('swiper/modules');
  return { Zoom };
}
