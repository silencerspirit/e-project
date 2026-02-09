export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '');

  return [digits.slice(0, 1), digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)].join(
    ' ',
  );
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function isMobileUserAgent(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window?.navigator?.userAgent);
}

export function isHTMLElement(el: unknown): el is HTMLElement {
  return el instanceof HTMLElement;
}
