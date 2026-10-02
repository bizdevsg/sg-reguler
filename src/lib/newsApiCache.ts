type NewsLang = "id" | "en";

type CacheEntry<T> = {
  expiresAt: number;
  value?: T;
  pending?: Promise<T>;
};

const NEWS_API_BASE_URL = "https://endpoapi-production-3202.up.railway.app";
const CACHE_TTL_MS = 5 * 60 * 1000;

const cache = new Map<NewsLang, CacheEntry<unknown>>();

export async function fetchNewsUpstream(lang: NewsLang): Promise<unknown> {
  const cached = cache.get(lang);
  const now = Date.now();

  if (cached?.value && cached.expiresAt > now) {
    return cached.value;
  }

  if (cached?.pending) {
    return cached.pending;
  }

  const upstreamPath = lang === "en" ? "/api/news" : "/api/news-id";
  const pending = fetch(`${NEWS_API_BASE_URL}${upstreamPath}`, {
    headers: { Accept: "application/json" },
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Upstream returned ${res.status}`);
    }
    return res.json();
  });

  cache.set(lang, {
    expiresAt: now + CACHE_TTL_MS,
    pending,
  });

  try {
    const value = await pending;
    cache.set(lang, {
      expiresAt: now + CACHE_TTL_MS,
      value,
    });
    return value;
  } catch (err) {
    cache.delete(lang);
    throw err;
  }
}

export function invalidateNewsCache(lang?: NewsLang) {
  if (lang) {
    cache.delete(lang);
    return;
  }
  cache.clear();
}
