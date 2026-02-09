import { isHTMLElement, isMobileUserAgent } from '@/helpers';
(() => {
  const TIMEOUT_DELAY = 3_000;
  const button = document.querySelector<HTMLButtonElement>('[data-share-button]');

  if (!isHTMLElement(button)) return;

  let timeout: NodeJS.Timeout;

  function getTitle(): string {
    return document.title;
  }

  function getHref(): string {
    return location.href;
  }

  function getShareInfoText(): string {
    return `${getTitle()}\n\n${getHref()}`;
  }

  async function share() {
    if (isMobileUserAgent()) navigator.share({ text: getShareInfoText() });
    else {
      await navigator.clipboard?.writeText(getShareInfoText());

      if (!isHTMLElement(button)) return;

      clearTimeout(timeout);
      button.dataset.text = 'Скопировано';
      timeout = setTimeout(() => {
        button.dataset.text = 'Поделиться';
      }, TIMEOUT_DELAY);
    }
  }

  button.addEventListener('click', share);
})();
