// Redis cache helper wrapper with in-memory fallback for high-throughput SEO pages
const memoryCache = new Map<string, { value: any; expiresAt: number }>();

export async function getCachedData<T>(key: string): Promise<T | null> {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return item.value as T;
}

export async function setCachedData(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}
