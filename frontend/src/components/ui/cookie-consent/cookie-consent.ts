import Cookie from 'js-cookie';

import { isHTMLElement } from '@/helpers';

import { COOKIE_CONSENT_COOKIE_NAME, COOKIE_CONSENT_COOKIE_VALUE } from './cookie-consent.consts';

(() => {
  const banner = document.querySelector('[data-cookie-consent]');
  const acceptButton = document.querySelector('[data-cookie-consent-accept]');

  if (!isHTMLElement<HTMLElement>(banner) || !isHTMLElement<HTMLButtonElement>(acceptButton)) return;

  acceptButton.addEventListener('click', () => {
    Cookie.set(COOKIE_CONSENT_COOKIE_NAME, COOKIE_CONSENT_COOKIE_VALUE);

    banner.remove();
  });
})();
