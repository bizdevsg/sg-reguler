"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NewsCard from "../moleculs/NewsCard";
import { useDataLoader } from "@/providers/DataLoaderProvider";
import { useI18n } from "@/i18n/useI18n";
import { newsApiListUrl } from "@/lib/newsApi";

interface Kategori {
    id: number;
    name: string;
    slug: string;
}

interface Berita {
    id: number;
    title: string;
    slug: string;
    content: string;
    category_id: number;
    kategori: Kategori | null;
    images: string[];
    created_at: string;
    updated_at: string;
}

interface NewsContainerProps {
    // contoh: "index", "commodity", "currencies", "economic"
    kategoriSlug: string;
}

// Mapping kategori berdasarkan slug
const kategoriMap: Record<string, string[]> = {
    index: ["Nikkei", "Hangseng"],
    commodity: ["Gold", "Silver", "Oil"],
    currencies: ["EUR/USD", "USD/JPY", "USD/CHF", "AUD/USD", "GBP/USD", "US DOLLAR"],
    economic: ["Global & Economic"],

    // kategori baru
    analisisMarket: ["Analisis Market"],
    analisisOpini: ["Analisis & Opini"],
};


export default function NewsContainer({ kategoriSlug }: NewsContainerProps) {
    const { track } = useDataLoader();
    const { t, locale } = useI18n();

    const allFilterValue = "all";
    const [activeFilter, setActiveFilter] = useState(allFilterValue);
    const [searchQuery, setSearchQuery] = useState("");
    const [newsData, setNewsData] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);
    const abortRef = useRef<AbortController | null>(null);

    const filters = useMemo(
        () => [
            { value: allFilterValue, label: t("common.all") },
            ...(kategoriMap[kategoriSlug] || []).map((item) => ({ value: item, label: item })),
        ],
        [kategoriSlug, t]
    );

    useEffect(() => {
        setActiveFilter(allFilterValue);
    }, [kategoriSlug]);

    // Fetch data dari API route + laporkan ke provider agar overlay global menunggu
    useEffect(() => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);

        const p = fetch(newsApiListUrl(locale), {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
            headers: { accept: "application/json" },
        })
            .then(async (res) => {
                if (!res.ok) throw new Error(t("news.fetchError", { status: res.status }));
                const data: unknown = await res.json();
                setNewsData(Array.isArray(data) ? (data as Berita[]) : []);
            })
            .catch((err) => {
                if (!controller.signal.aborted) {
                    console.error(err);
                    setNewsData([]);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        track(p);
        return () => controller.abort();
    }, [kategoriSlug, locale, track, t]);

    // Filter + urutkan terbaru + batasi 9 item
    const filteredNews = useMemo(() => {
        const allowed = (kategoriMap[kategoriSlug] || []).map((c) => c.toLowerCase());

        const byKategoriSlug =
            allowed.length > 0
                ? newsData.filter((item) => {
                    const name = item.kategori?.name?.toLowerCase?.() || "";
                    return allowed.includes(name);
                })
                : newsData;

        const q = searchQuery.trim().toLowerCase();

        const result = byKategoriSlug.filter((news) => {
            const katName = news.kategori?.name || "";
                const matchFilter =
                activeFilter === allFilterValue ||
                katName.toLowerCase() === activeFilter.toLowerCase();

            const text =
                (news.title || "").toLowerCase() + " " + stripHtml(news.content || "").toLowerCase();

            const matchSearch = q === "" || text.includes(q);

            return matchFilter && matchSearch;
        });

        // urutkan (terbaru dulu) lalu ambil 9 teratas
        return result
            .slice() // hindari mutasi
            .sort(
                (a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
            .slice(0, 9);
    }, [newsData, kategoriSlug, activeFilter, searchQuery]);

    if (loading) {
        return (
            <div className="space-y-5">
                {/* Skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800"
                        >
                            <div className="h-40 w-full bg-neutral-800 animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse" />
                                <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Filter + Search */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`uppercase border border-yellow-500 px-3 py-2 rounded-lg transition-all duration-300 ${activeFilter === filter.value
                                ? "btn-primary"
                                : "bg-gray-100/5 hover:bg-gray-100/10 text-white"
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder={t("common.search")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-transparent text-white placeholder:text-neutral-400"
                    />
                </div>
            </div>

            {/* Grid berita */}
            {filteredNews.length === 0 ? (
                <div className="text-neutral-300 border border-neutral-800 rounded-lg p-6">
                    {t("news.emptyList")}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {filteredNews.map((news) => {
                        const cleanDescription = stripHtml(news.content).replace(/&nbsp;/g, " ").trim();

                        return (
                            <NewsCard
                                key={news.id}
                                image={
                                    news.images?.[0]
                                        ? `http://portal-backpanel.test/${news.images[1]}`
                                        : "/placeholder.jpg"
                                }
                                title={news.title}
                                category={news.kategori?.name || "-"}
                                date={news.created_at}
                                description={cleanDescription}
                                href={`/${kategoriSlug}/${encodeURIComponent(news.slug)}`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* Utils */
function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ");
}
