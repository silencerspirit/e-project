import type { TPropertySlugList } from '@contracts';
import type { APIRoute } from 'astro';

import { getPublicSiteUrl, toAbsoluteUrl } from '@/helpers';

const STATIC_PATHS = ['/', '/properties/'];
const CACHE_CONTROL_HEADER = 'public, max-age=300, s-maxage=300';

type TPropertySitemapItem = {
  slug: string;
  lastModified: string;
};

type TUrlEntry = {
  loc: string;
  lastmod?: string;
};

function getStrapiBaseUrl(): string | null {
  const base = import.meta.env.PUBLIC_STRAPI_URL;
  return base ? base.replace(/\/$/, '') : null;
}

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

async function getPropertySlugs(): Promise<TPropertySitemapItem[]> {
  const base = getStrapiBaseUrl();

  if (!base) {
    return [];
  }

  const token = import.meta.env.STRAPI_TOKEN;
  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${base}/api/property/slugs`, { headers });
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as TPropertySlugList;
    if (!payload || !Array.isArray(payload.list)) {
      return [];
    }

    return payload.list
      .filter((item) => typeof item?.slug === 'string' && item.slug.length > 0)
      .map((item) => ({
        slug: item.slug,
        lastModified: typeof item.lastModified === 'string' ? item.lastModified : '',
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
  const staticUrls: TUrlEntry[] = STATIC_PATHS.map((path) => ({ loc: toAbsoluteUrl(path, `${siteUrl}/`) }));
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
