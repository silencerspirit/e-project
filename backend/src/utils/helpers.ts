export function clampPage(page: string) {
  const n = Number(page);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.trunc(n));
}

export function sortByOrder<T extends Record<string, unknown>, B extends Record<string, unknown>>(a: T, b: B): number {
  return Number(a?.order) - Number(b?.order);
}
