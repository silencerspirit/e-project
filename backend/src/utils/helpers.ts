export function clampPage(page: string) {
  const n = Number(page);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.trunc(n));
}
