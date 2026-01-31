const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

export async function strapiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = new URL(path, STRAPI_URL);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const result = await fetch(url, {
      ...init,
      headers: {
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });

    if (!result.ok) {
      const text = await result.text().catch(() => '');
      throw new Error(`Strapi ${result.status}: ${text || result.statusText}`);
    }

    const response = await result.json();

    return response as T;
  } finally {
    clearTimeout(timeout);
  }
}
