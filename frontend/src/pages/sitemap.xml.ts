import type { TPropertySlugList } from '@contracts';
import type { APIRoute } from 'astro';
import { isString } from 'es-toolkit';

import { getPublicSiteUrl, toAbsoluteUrl } from '@/helpers';
import { strapiFetch } from '@/utils';

const STATIC_PAGE_MODULES = import.meta.glob('./**/*.astro', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;
const CACHE_CONTROL_HEADER = 'public, max-age=300, s-maxage=300';
const ERROR_PAGE_FILE_PATTERN = /^\.\/(?:404|500)\.astro$/;
const NOINDEX_ROBOTS_PATTERN = /robots\s*=\s*["'][^"']*\bnoindex\b/i;

type TPropertySitemapItem = {
  slug: string;
  lastModified: string;
};

type TUrlEntry = {
  loc: string;
  lastmod?: string;
};

function xmlEscape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function normalizeLastModified(value: string): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function isPublicStaticPage(filePath: string, source: string): boolean {
  return !filePath.includes('[') && !ERROR_PAGE_FILE_PATTERN.test(filePath) && !NOINDEX_ROBOTS_PATTERN.test(source);
}

function pageFilePathToUrlPath(filePath: string): string {
  const routePath = filePath.replace(/^\.\//, '').replace(/\.astro$/, '');
  const segments = routePath.split('/');

  if (segments.at(-1) === 'index') {
    segments.pop();
  }

  return segments.length ? `/${segments.join('/')}/` : '/';
}

function getStaticPagePaths(): string[] {
  return Object.entries(STATIC_PAGE_MODULES)
    .filter(([filePath, source]) => isPublicStaticPage(filePath, source))
    .map(([filePath]) => pageFilePathToUrlPath(filePath))
    .sort((a, b) => a.localeCompare(b));
}

async function getPropertySlugs(): Promise<TPropertySitemapItem[]> {
  if (!import.meta.env.PUBLIC_STRAPI_URL) {
    return [];
  }

  try {
    const payload = await strapiFetch<TPropertySlugList>('/api/property/slugs');
    if (!payload || !Array.isArray(payload.list)) {
      return [];
    }

    return payload.list
      .filter((item) => isString(item?.slug) && item.slug.length > 0)
      .map((item) => ({
        slug: item.slug,
        lastModified: isString(item.lastModified) ? item.lastModified : '',
      }));
  } catch {
    return [];
  }
}
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = getPublicSiteUrl(request.url);
  const sitemapItems = await getPropertySlugs();

  const dynamicPropertyUrls: TUrlEntry[] = sitemapItems.map((item) => ({
    loc: toAbsoluteUrl(`/properties/${encodeURIComponent(item.slug)}/`, `${siteUrl}/`),
    lastmod: normalizeLastModified(item.lastModified) ?? undefined,
  }));
  const staticUrls: TUrlEntry[] = getStaticPagePaths().map((path) => ({ loc: toAbsoluteUrl(path, `${siteUrl}/`) }));
  const urls = [...new Map([...staticUrls, ...dynamicPropertyUrls].map((item) => [item.loc, item])).values()];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((item) =>
      item.lastmod
        ? `  <url><loc>${xmlEscape(item.loc)}</loc><lastmod>${xmlEscape(item.lastmod)}</lastmod></url>`
        : `  <url><loc>${xmlEscape(item.loc)}</loc></url>`,
    ),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  });
};
