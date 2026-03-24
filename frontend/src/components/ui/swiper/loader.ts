import 'swiper/css';

export function loadSwiperCore() {
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
