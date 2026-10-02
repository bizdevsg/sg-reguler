"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { newsApiListUrl } from "@/lib/newsApi";

interface Kategori {
  id: number;
  name: string;
  slug: string;
}

type TitleVariants = {
  default?: string;
  sg?: string;
  [key: string]: string | undefined;
};

interface Berita {
  id: number;
  title: string;
  titles?: TitleVariants;
  slug: string;
  kategori?: Kategori | null;
  created_at?: string;
}

type DisplayItem =
  | { type: "news"; content: string; href: string }
  | { type: "sep"; value: string };

const kategoriMap: Record<string, string[]> = {
  indexNews: ["Nikkei", "Hang seng", "Market Update"],
  commodityNews: ["Gold", "Silver", "Oil"],
  currenciesNews: ["EUR/USD", "USD/JPY", "USD/CHF", "AUD/USD", "GBP/USD", "US DOLLAR"],
  economicNews: ["Global Economics"],
  analisisMarket: ["Analisis Market"],
  analisisOpini: ["Analisis & Opini"],
  fiscalMoneter: ["Fiscal & Moneter"],
};

function getKategoriSlugFromName(name?: string): string | null {
  if (!name) return null;
  const lower = name.trim().toLowerCase();
  for (const [slug, names] of Object.entries(kategoriMap)) {
    if (names.some((n) => n.trim().toLowerCase() === lower)) return slug;
  }
  return null;
}

const baseFetcher = (url: string) =>
  fetch(url, {
    headers: { accept: "application/json" },
    cache: "no-store",
  }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
    return r.json();
  });

function pickArray<T = unknown>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { data?: unknown[] }).data)) {
    return (raw as { data: T[] }).data;
  }
  if (
    raw &&
    typeof raw === "object" &&
    (raw as { data?: { data?: unknown[] } }).data &&
    Array.isArray((raw as { data: { data: T[] } }).data.data)
  ) {
    return (raw as { data: { data: T[] } }).data.data;
  }
  return [];
}

function pickTitle(item: Berita): string {
  const t = item.titles ?? {};
  const candidates = [t.sg, t.default, item.title];
  return candidates.find((s): s is string => !!s && s.trim().length > 0) ?? "";
}

function normalizeNews(raw: unknown): Berita[] {
  const arr = pickArray<Berita>(raw).filter(
    (b) => b && typeof b.id === "number" && typeof b.slug === "string"
  );
  return arr.sort((a, b) => {
    const ta = a.created_at ? Date.parse(a.created_at) : 0;
    const tb = b.created_at ? Date.parse(b.created_at) : 0;
    return tb - ta;
  });
}

function buildDisplayItems(news: Berita[], t: (key: string) => string): DisplayItem[] {
  const newsItems: DisplayItem[] = news.slice(0, 8).map((n) => {
    const mapped = getKategoriSlugFromName(n.kategori?.name);
    const href = mapped && n.slug ? `/${encodeURIComponent(mapped)}/${encodeURIComponent(n.slug)}` : "/#";
    return {
      type: "news",
      content: pickTitle(n).trim() || n.title?.trim() || t("news.noTitle"),
      href,
    };
  });

  const list =
    newsItems.length > 0 ? newsItems : [{ type: "news" as const, content: t("news.emptyLatest"), href: "/#" }];

  const out: DisplayItem[] = [];
  list.forEach((it, idx) => {
    if (idx > 0) out.push({ type: "sep", value: "•" });
    out.push(it);
  });
  return out;
}

export default function TopNews() {
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [marqueeDuration, setMarqueeDuration] = useState<number>(25);
  const [marqueeActive, setMarqueeActive] = useState<boolean>(true);
  const [newsRaw, setNewsRaw] = useState<unknown>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchNews() {
      try {
        setLoading(true);
        setError(false);
        const newsRes = await baseFetcher(newsApiListUrl(locale));
        if (!mounted) return;
        setNewsRaw(newsRes);
      } catch {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchNews();
    return () => {
      mounted = false;
    };
  }, [locale]);

  const news = useMemo(() => normalizeNews(newsRaw), [newsRaw]);
  const items = useMemo(() => buildDisplayItems(news, t), [news, t]);
  const displayItems = useMemo(() => (items.length ? [...items, ...items] : []), [items]);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;
    const contentWidth = contentRef.current.scrollWidth;
    const containerWidth = containerRef.current.clientWidth;

    if (contentWidth <= containerWidth) {
      setMarqueeActive(false);
      return;
    }

    const speed = 140;
    const duration = contentWidth / speed;
    setMarqueeDuration(Math.max(8, Math.min(duration, 50)));
    setMarqueeActive(true);
  }, [displayItems]);

  return (
    <div className="w-full overflow-hidden rounded bg-[#111827]">
      <div className="flex items-center p-2">
        <div className="select-none rounded bg-red-600 px-3 py-1 text-sm font-bold text-white">
          {t("news.top")}
        </div>

        <div className="relative ml-3 flex-1 overflow-hidden" ref={containerRef}>
          {loading ? (
            <div className="flex items-center gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-28 animate-pulse rounded bg-neutral-700" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-400">{t("common.errorLoad")}</div>
          ) : displayItems.length === 0 ? (
            <div className="text-gray-300">{t("common.emptyData")}</div>
          ) : (
            <div
              ref={contentRef}
              className={`flex whitespace-nowrap gap-6 will-change-transform ${marqueeActive ? "marquee" : ""}`}
              style={
                marqueeActive
                  ? ({ ["--marquee-duration" as string]: `${marqueeDuration}s` } as CSSProperties)
                  : undefined
              }
              aria-live="polite"
              aria-label={t("news.tickerLabel")}
            >
              {displayItems.map((item, idx) => {
                if (item.type === "sep") {
                  return (
                    <span key={`sep-${idx}`} className="flex-shrink-0 text-neutral-500" aria-hidden="true">
                      {item.value}
                    </span>
                  );
                }

                if (item.href && item.href !== "/#") {
                  return (
                    <Link
                      key={`news-${idx}`}
                      href={item.href}
                      className="flex-shrink-0 italic text-gray-200 transition-colors hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm"
                      aria-label={`${t("news.read")} ${item.content}`}
                      prefetch
                    >
                      {item.content}
                    </Link>
                  );
                }

                return (
                  <span key={`news-${idx}`} className="flex-shrink-0 italic text-gray-400">
                    {item.content}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee {
          display: inline-flex;
          animation: marquee var(--marquee-duration, 25s) linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
