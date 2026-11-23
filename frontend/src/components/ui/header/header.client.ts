import { isHTMLElement } from '@/helpers';

function initHeaderMenu() {
  const toggleEl = document.querySelector('[data-mobile-menu-toggle]');
  const menuEl = document.querySelector('[data-mobile-menu]');
  const menuIconEl = document.querySelector('[data-menu-icon]');
  const closeIconEl = document.querySelector('[data-close-icon]');
  const links = document.querySelectorAll('[data-mobile-menu-link]');

  if (!isHTMLElement(toggleEl) || !isHTMLElement(menuEl) || !isHTMLElement(menuIconEl) || !isHTMLElement(closeIconEl))
    return;

  const controls = { toggleEl, menuEl, menuIconEl, closeIconEl };

  function setOpen(open: boolean) {
    controls.toggleEl.setAttribute('aria-expanded', String(open));
    controls.menuEl.hidden = !open;
    controls.menuEl.classList.toggle('hidden', !open);
    controls.menuIconEl.classList.toggle('hidden', open);
    controls.closeIconEl.classList.toggle('hidden', !open);
  }

  function onToggleClick() {
    setOpen(controls.toggleEl.getAttribute('aria-expanded') !== 'true');
  }

  function onLinkClick() {
    setOpen(false);
  }

  toggleEl.addEventListener('click', onToggleClick);
  links.forEach((link) => link.addEventListener('click', onLinkClick));
}

initHeaderMenu();
