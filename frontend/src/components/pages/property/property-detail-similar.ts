import { Swiper } from '@/components/ui/swiper';
import { isHTMLElement } from '@/helpers';

(() => {
  const similarSlider = document.getElementById('similar-slider');

  if (!isHTMLElement(similarSlider)) return;

  new Swiper(similarSlider, {
    slidesPerView: 'auto',
  });
})();
