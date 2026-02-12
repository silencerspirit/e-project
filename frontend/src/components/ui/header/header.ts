import { isHTMLElement } from '@/helpers';

(() => {
  const toggleEl = document.querySelector('[data-mobile-menu-toggle]');
  const menuEl = document.querySelector('[data-mobile-menu]');
  const menuIconEl = document.querySelector('[data-menu-icon]');
  const closeIconEl = document.querySelector('[data-close-icon]');
  const links = document.querySelectorAll('[data-mobile-menu-link]');

  if (isHTMLElement(toggleEl) && isHTMLElement(menuEl) && isHTMLElement(menuIconEl) && isHTMLElement(closeIconEl)) {
    const setOpen = (open: boolean) => {
      toggleEl.setAttribute('aria-expanded', String(open));
      menuEl.hidden = !open;
      menuEl.classList.toggle('hidden', !open);
      menuIconEl.classList.toggle('hidden', open);
      closeIconEl.classList.toggle('hidden', !open);
    };

    toggleEl.addEventListener('click', () => {
      const isOpen = toggleEl.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        setOpen(false);
      });
    });
  }
})();
