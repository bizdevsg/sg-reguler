type NewsLang = "id" | "en";

type RawNewsItem = {
  id?: number;
  title?: string;
  link?: string;
  image?: string;
  category?: string;
  date?: string;
  summary?: string;
  detail?: string;
  language?: string;
  published_at?: string;
  createdAt?: string;
  updatedAt?: string;
};

type NormalizedNewsItem = {
  id: number;
  title: string;
  titles: { default: string; sg: string };
  slug: string;
  content: string;
  category_id: number;
  kategori: { id: number; name: string; slug: string } | null;
  images: string[];
  created_at: string;
  updated_at: string;
  source_link?: string;
};

const CATEGORY_MAP: Record<string, { name: string; slug: string }> = {
  "market update": { name: "Market Update", slug: "indexNews" },
  "global economy": { name: "Global Economics", slug: "economicNews" },
  "global economics": { name: "Global Economics", slug: "economicNews" },
  "global economic": { name: "Global Economics", slug: "economicNews" },
  oil: { name: "Oil", slug: "commodityNews" },
  gold: { name: "Gold", slug: "commodityNews" },
  silver: { name: "Silver", slug: "commodityNews" },
  "us dollar": { name: "US DOLLAR", slug: "currenciesNews" },
  "eur/usd": { name: "EUR/USD", slug: "currenciesNews" },
  "usd/jpy": { name: "USD/JPY", slug: "currenciesNews" },
  "usd/chf": { name: "USD/CHF", slug: "currenciesNews" },
  "aud/usd": { name: "AUD/USD", slug: "currenciesNews" },
  "gbp/usd": { name: "GBP/USD", slug: "currenciesNews" },
  nikkei: { name: "Nikkei", slug: "indexNews" },
  "hang seng": { name: "Hang seng", slug: "indexNews" },
  hangseng: { name: "Hang seng", slug: "indexNews" },
};

function extractSlug(link?: string, id?: number, title?: string): string {
  if (link) {
    try {
      const parts = new URL(link).pathname.split("/").filter(Boolean);
      const last = parts[parts.length - 1];
      if (last) return last;
    } catch {
      // fall through to generated slug
    }
  }

  const fallback = `${id ?? "news"}-${title ?? "item"}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return fallback || String(id ?? "news");
}

function formatDetail(detail?: string): string {
  if (!detail) return "";
  const escaped = detail
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function normalizeCategory(category?: string, fallbackId?: number) {
  if (!category) return null;
  const key = category.trim().toLowerCase();
  const mapped = CATEGORY_MAP[key];
  if (!mapped) {
    return {
      id: fallbackId ?? 0,
      name: category,
      slug: "unknown",
    };
  }

  return {
    id: fallbackId ?? 0,
    name: mapped.name,
    slug: mapped.slug,
  };
}

export function normalizeNewsLang(value: unknown): NewsLang {
  const lang = Array.isArray(value) ? value[0] : value;
  return lang === "en" ? "en" : "id";
}

export function normalizeNewsItem(raw: RawNewsItem, lang: NewsLang): NormalizedNewsItem | null {
  if (typeof raw?.id !== "number") return null;

  const title = (raw.title ?? "").trim();
  const slug = extractSlug(raw.link, raw.id, title);
  const category = normalizeCategory(raw.category, raw.id);
  const createdAt = raw.published_at || raw.createdAt || raw.date || "";
  const updatedAt = raw.updatedAt || raw.createdAt || raw.published_at || raw.date || "";
  const content = raw.detail ? formatDetail(raw.detail) : raw.summary ? `<p>${raw.summary}</p>` : "";

  return {
    id: raw.id,
    title,
    titles: { default: title, sg: title },
    slug,
    content,
    category_id: raw.id,
    kategori: category,
    images: raw.image ? [raw.image] : [],
    created_at: createdAt,
    updated_at: updatedAt,
    source_link: raw.link,
  };
}

export function normalizeNewsResponse(payload: unknown, lang: NewsLang) {
  const rawItems = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] } | null)?.data)
      ? (payload as { data: unknown[] }).data
      : [];

  const data = rawItems
    .map((item) => normalizeNewsItem(item as RawNewsItem, lang))
    .filter((item): item is NormalizedNewsItem => item !== null);

  if (Array.isArray(payload)) return data;

  if (payload && typeof payload === "object") {
    return {
      ...(payload as Record<string, unknown>),
      data,
      total: typeof (payload as { total?: unknown }).total === "number" ? (payload as { total: number }).total : data.length,
    };
  }

  return { status: "success", data, total: data.length };
}

export function findNormalizedNewsBySlug(payload: unknown, slug: string, lang: NewsLang) {
  const normalized = normalizeNewsResponse(payload, lang);
  const data = Array.isArray(normalized)
    ? normalized
    : Array.isArray((normalized as { data?: unknown[] }).data)
      ? (normalized as { data: unknown[] }).data
      : [];
  return data.find((item) => (item as NormalizedNewsItem).slug === slug) as NormalizedNewsItem | undefined;
}
