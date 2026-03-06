export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  const hasLeadingPlus = input.trim().startsWith('+');

  return [
    hasLeadingPlus ? `+${digits.slice(0, 1)}` : digits.slice(0, 1),
    digits.slice(1, 4),
    digits.slice(4, 7),
    digits.slice(7, 9),
    digits.slice(9, 11),
  ]
    .filter(Boolean)
    .join(' ');
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function isExternalLink(value: string): boolean {
  const normalizedValue = value.trim();

  return /^https?:\/\//i.test(normalizedValue) || normalizedValue.startsWith('//');
}

export function isMobileUserAgent(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window?.navigator?.userAgent);
}

export function isHTMLElement<T = HTMLElement>(el: unknown): el is T {
  return el instanceof Element && Boolean(el);
}

export function formatPrice(value: unknown): string {
  return Number(value).toLocaleString('ru-RU');
}

export const declOfNum = (number: number, titles: string[]): string => {
  const cases: number[] = [2, 0, 1, 1, 1, 2];

  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

export function assertNever(x: never): never {
  throw new Error(`Неожиданное значение: ${x}`);
}
