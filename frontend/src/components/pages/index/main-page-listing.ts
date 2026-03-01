import { BUTTON_VARIANTS } from '@/components/ui/button/button.consts';
import { Navigation, Swiper } from '@/components/ui/swiper';

(() => {
  interface IStoredSlide {
    type: string;
    node: Node;
  }

  const sliderPrevButtonId = 'slider-prev-button';
  const sliderNextButtonId = 'slider-next-button';

  const activeClasses = BUTTON_VARIANTS.default.split(' ');
  const inactiveClasses = BUTTON_VARIANTS.outline.split(' ');

  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-main-page-listing]'));

  sections.forEach((section) => {
    const filterButtons = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-listing-filter]'));
    const slider = section.querySelector<HTMLElement>('[data-listing-slider]');
    const wrapper = section.querySelector<HTMLElement>('[data-listing-swiper-wrapper]');

    if (!filterButtons.length || !slider || !wrapper) return;

    const defaultFilter = section.dataset.defaultFilterValue ?? 'Все';
    const sourceSlides: IStoredSlide[] = Array.from(wrapper.querySelectorAll<HTMLElement>('.swiper-slide')).map(
      (slide) => ({
        type: slide.dataset.type ?? '',
        node: slide.cloneNode(true),
      }),
    );

    const defaultButton = filterButtons.find((button) => button.dataset.filter === defaultFilter) ?? filterButtons[0];
    const initialFilter = defaultButton?.dataset.filter ?? defaultFilter;

    if (defaultButton) setActiveFilter(filterButtons, defaultButton);

    renderSlides(wrapper, sourceSlides, initialFilter, defaultFilter);

    const sliderInstance = new Swiper(slider, {
      modules: [Navigation],
      slidesPerView: 'auto',
      navigation: {
        prevEl: `#${sliderPrevButtonId}`,
        nextEl: `#${sliderNextButtonId}`,
      },
    });

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextFilter = button.dataset.filter ?? defaultFilter;

        setActiveFilter(filterButtons, button);
        renderSlides(wrapper, sourceSlides, nextFilter, defaultFilter);

        sliderInstance.update();
        sliderInstance.slideTo(0, 0);
        toggleNavigationVisibility(sliderInstance.isEnd);
      });
    });
  });

  function setActiveFilter(filterButtons: HTMLButtonElement[], activeButton: HTMLButtonElement) {
    filterButtons.forEach((button) => {
      button.classList.remove(...activeClasses);
      button.classList.add(...inactiveClasses);
      button.setAttribute('aria-pressed', 'false');
    });

    activeButton.classList.add(...activeClasses);
    activeButton.classList.remove(...inactiveClasses);
    activeButton.setAttribute('aria-pressed', 'true');
  }

  function renderSlides(wrapper: HTMLElement, sourceSlides: IStoredSlide[], filter: string, defaultFilter: string) {
    const filteredSlides =
      filter === defaultFilter ? sourceSlides : sourceSlides.filter((slide) => slide.type === filter);

    const nextSlides = filteredSlides.map((slide) => slide.node.cloneNode(true));
    wrapper.replaceChildren(...nextSlides);
  }

  function toggleNavigationVisibility(hide: boolean) {
    const method = hide ? 'add' : 'remove';
    document.getElementById(sliderPrevButtonId)?.classList[method]('hidden');
    document.getElementById(sliderNextButtonId)?.classList[method]('hidden');
  }
})();
