import 'swiper/css';

export async function loadSwiperCore() {
  return import('swiper').then(({ default: Swiper }) => ({ Swiper }));
}

export function loadSwiperNavigation() {
  return import('swiper/modules').then(({ Navigation }) => ({ Navigation }));
}

export function loadSwiperThumbs() {
  return import('swiper/modules').then(({ Thumbs }) => ({ Thumbs }));
}

export function loadSwiperFreeMode() {
  return import('swiper/modules').then(({ FreeMode }) => ({ FreeMode }));
}

export async function loadSwiperZoom() {
  await import('swiper/css/zoom');
  return import('swiper/modules').then(({ Zoom }) => ({ Zoom }));
}
