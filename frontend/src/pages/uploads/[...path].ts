import type { APIRoute } from 'astro';

const getStrapiBaseUrl = (): string => {
  const base = import.meta.env.PUBLIC_STRAPI_URL;

  if (!base) {
    throw new Error('STRAPI_URL is not set');
  }
  return base.replace(/\/$/, '');
};

export const GET: APIRoute = async ({ params, request }) => {
  const segments = (params.path ?? '').split('/').filter(Boolean);
  const upstreamUrl = `${getStrapiBaseUrl()}/uploads/${segments.join('/')}`;

  const upstream = await fetch(upstreamUrl, {
    method: 'GET',
    headers: {
      range: request.headers.get('range') ?? '',
    },
  });

  const headers = new Headers(upstream.headers);
  headers.set('cache-control', headers.get('cache-control') ?? 'public, max-age=3600');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
};
