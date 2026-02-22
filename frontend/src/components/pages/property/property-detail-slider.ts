import { FreeMode, Navigation, Swiper, Thumbs } from '@/components/ui/swiper';
import { isHTMLElement } from '@/helpers';

(() => {
  const mainSlider = document.getElementById('main-slider');
  const thumbSlider = document.getElementById('thumb-slider');

  const mainSliderCounter = document.getElementById('main-slider-counter');

  if (!isHTMLElement(mainSlider) || !isHTMLElement(thumbSlider) || !isHTMLElement(mainSliderCounter)) return;

  const thumbSwiper = new Swiper(thumbSlider, {
    modules: [FreeMode],
    freeMode: true,
    spaceBetween: 12,
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });

  new Swiper(mainSlider, {
    modules: [Thumbs, Navigation],
    thumbs: {
      swiper: thumbSwiper,
    },
    navigation: {
      prevEl: '.property-detail-slider__main-prev',
      nextEl: '.property-detail-slider__main-next',
    },
    on: {
      slideChange(swiper) {
        mainSliderCounter.textContent = `${swiper.realIndex + 1} / ${swiper.slides.length}`;
      },
    },
  });
})();
