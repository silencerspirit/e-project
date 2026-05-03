type CacheEntry<T> = {
  expiresAt: number;
  pending?: Promise<T>;
  value?: T;
};

const store: Map<string, CacheEntry<unknown>> = new Map();

export async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = store.get(key) as CacheEntry<T> | undefined;

  if (entry?.value !== undefined && entry.expiresAt > now) {
    return entry.value;
  }

  if (entry?.pending) {
    return entry.pending;
  }

  const pending = fn()
    .then((value) => {
      store.set(key, { value, expiresAt: now + ttlMs });
      return value;
    })
    .catch((err) => {
      store.delete(key);
      throw err;
    });

  store.set(key, { expiresAt: now + ttlMs, pending });

  return pending;
}
