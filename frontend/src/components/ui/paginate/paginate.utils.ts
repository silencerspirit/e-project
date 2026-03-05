export function buildPaginatedTitle(title: string, page: number): string {
  return page > 1 ? `${title} | Страница ${page}` : title;
}

export function buildPaginatedDescription(description: string, page: number): string {
  if (page <= 1) return description;
  return `${description} Страница ${page}.`;
}

export function buildCanonicalUrl(url: URL, page: number, siteUrl?: string): string {
  const base = siteUrl ? new URL(siteUrl) : url;
  const canonicalUrl = new URL(url.pathname, base);

  canonicalUrl.search = url.search;
  if (page <= 1) canonicalUrl.searchParams.delete('page');

  return canonicalUrl.toString();
}
