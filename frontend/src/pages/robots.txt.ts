import type { APIRoute } from 'astro';

import { getPublicSiteUrl } from '@/helpers';

const CACHE_CONTROL_HEADER = 'public, max-age=3600, s-maxage=3600';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = getPublicSiteUrl(request.url);
  const sitemapUrl = new URL('/sitemap.xml', `${siteUrl}/`).toString();

  const body = [`User-agent: *`, `Allow: /`, `Sitemap: ${sitemapUrl}`].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  });
};
