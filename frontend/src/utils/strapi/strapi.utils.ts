import { STRAPI_REQUEST_FAILED_MESSAGE, STRAPI_REQUEST_TIMEOUT_MS } from './strapi.constants';
import { StrapiRequestError } from './strapi.errors';

const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL;
const strapiToken = import.meta.env.STRAPI_TOKEN;

function getErrorMessage(body: unknown): string {
  if (!body || typeof body !== 'object' || !('error' in body)) return STRAPI_REQUEST_FAILED_MESSAGE;

  const error = body.error;
  if (!error || typeof error !== 'object' || !('message' in error)) return STRAPI_REQUEST_FAILED_MESSAGE;

  return typeof error.message === 'string' ? error.message : STRAPI_REQUEST_FAILED_MESSAGE;
}

export async function strapiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = new URL(path, strapiUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STRAPI_REQUEST_TIMEOUT_MS);

  try {
    const result = await fetch(url, {
      ...init,
      headers: {
        ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });

    if (!result.ok) {
      const body: unknown = await result.json().catch(() => null);
      throw new StrapiRequestError(result.status, getErrorMessage(body));
    }

    return (await result.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
