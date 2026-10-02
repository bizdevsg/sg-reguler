"use client";

import useSWR from "swr";
import { useRouter } from "next/router"; // <-- Pages Router
import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import NewsCard from "../moleculs/NewsCard";
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
    content: string;
    category_id: number;
    kategori: Kategori | null;
    images: string[];
    created_at: string;
    updated_at: string;
}

interface NewsContainerProps {
    kategoriSlug: string;
}

const kategoriMap: Record<string, string[]> = {
    indexNews: ["Nikkei", "Hang seng", "Market Update"],
    commodityNews: ["Gold", "Silver", "Oil"],
    currenciesNews: ["EUR/USD", "USD/JPY", "USD/CHF", "AUD/USD", "GBP/USD", "US DOLLAR"],
    economicNews: ["Global Economics"],
    fiscalMoneter: ["Fiscal & Moneter"],
    analisisMarket: ["Analisis Market"],
    analisisOpini: ["Analisis & Opini"],
};

/* Utils */
function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ");
}
function mediaUrl(p?: string) {
    if (!p) return "/assets/Downtren.jpg";
    if (/^https?:\/\//i.test(p)) return p;
    const envBase = (process.env.NEXT_PUBLIC_PORTALNEWS_MEDIA_BASE_URL ?? "").trim();
    const base = (envBase && envBase.startsWith("/") ? envBase : "/api/portalnews-media").replace(/\/+$/, "");
    return `${base}/${p.replace(/^\/+/, "")}`;
}
function pickTitle(item: Berita): string {
    const t = item.titles ?? {};
    const candidates = [t.sg, t.default, item.title];
    return candidates.find((s): s is string => !!s && s.trim().length > 0) ?? "";
}
const fetcher = (url: string) =>
    fetch(url, {
        headers: {
            "Accept": "application/json",
        }, cache: "no-store"
    }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
        return r.json();
    });
function pickArray<T = unknown>(raw: any): T[] {
    if (Array.isArray(raw)) return raw as T[];
    if (raw && Array.isArray(raw.data)) return raw.data as T[];
    if (raw && raw.data && Array.isArray(raw.data.data)) return raw.data.data as T[];
    return [];
}

export default function NewsContainer({ kategoriSlug }: NewsContainerProps) {
    const router = useRouter();
    const { t, locale } = useI18n();

    // 404 guard manual
    const allowedSlugs = useMemo(() => new Set(Object.keys(kategoriMap)), []);
    if (!allowedSlugs.has(kategoriSlug)) {
        // render fallback 404
        return (
            <div className="text-center text-red-400 py-20">
                <h1>{t("common.notFound")}</h1>
                <button
                    className="btn-primary mt-4 px-4 py-2 rounded"
                    onClick={() => router.push("/")}
                >
                    {t("common.backHome")}
                </button>
            </div>
        );
    }

    const allFilterValue = "all";
    const [activeFilter, setActiveFilter] = useState(allFilterValue);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        AOS.init({ once: true });
    }, []);
    useEffect(() => {
        const id = requestAnimationFrame(() => AOS.refreshHard());
        return () => cancelAnimationFrame(id);
    });

    useEffect(() => {
        setActiveFilter(allFilterValue);
        setSearchQuery("");
    }, [kategoriSlug]);

    const filters = useMemo(
        () => [
            { value: allFilterValue, label: t("common.all") },
            ...(kategoriMap[kategoriSlug] || []).map((item) => ({ value: item, label: item })),
        ],
        [kategoriSlug, t]
    );

    const { data, error } = useSWR(newsApiListUrl(locale), fetcher, {
        refreshInterval: 15_000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        keepPreviousData: true,
        dedupingInterval: 5000,
    });

    const newsData: Berita[] = useMemo(
        () =>
            pickArray<Berita>(data).filter(
                (b) =>
                    b &&
                    typeof b.id === "number" &&
                    typeof b.slug === "string"
            ),
        [data]
    );

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

        return byKategoriSlug
            .filter((n) => {
                const katName = n.kategori?.name || "";
                const matchFilter =
                    activeFilter === allFilterValue ||
                    katName.toLowerCase() === activeFilter.toLowerCase();

                const text = (pickTitle(n) || "").toLowerCase() + " " + katName.toLowerCase();

                const matchSearch = q === "" || text.includes(q);

                return matchFilter && matchSearch;
            })
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 9);
    }, [newsData, kategoriSlug, activeFilter, searchQuery]);

    const showSkeleton = typeof data === "undefined";
    const showNoData = data !== undefined && filteredNews.length === 0;
    const skeletonCount = filteredNews.length > 0 ? filteredNews.length : 9;

    if (error) return <div className="text-red-400">{t("common.errorNews")}</div>;

    return (
        <div className="space-y-5">
            {/* Filter + Search */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3" data-aos="fade-up" data-aos-once="true">
                <div className="flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`uppercase border border-yellow-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${activeFilter === filter.value
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

            {/* Konten */}
            {showSkeleton ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" data-aos="fade-up" data-aos-once="true">
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
                            <div className="h-40 w-full bg-neutral-800 animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse" />
                                <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : showNoData ? (
                <div className="text-neutral-300 border border-neutral-800 rounded-lg py-52 aos-init aos-animate" data-aos="fade-up" data-aos-once="true">
                    <div className="flex justify-center">
                        <img src="/assets/No Data Available Illustration.png" alt={t("common.noDataAlt")} className="h-50" />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" data-aos="fade-up" data-aos-once="true">
                    {filteredNews.map((news) => {
                        const cleanDescription = stripHtml(news.content).replace(/&nbsp;/g, " ").trim();

                        return (
                            <NewsCard
                                key={news.id}
                                image={mediaUrl(news.images?.[0])}
                                title={pickTitle(news)}
                                category={news.kategori?.name || "-"}
                                date={news.created_at}
                                description={cleanDescription}
                                href={`/${encodeURIComponent(kategoriSlug)}/${encodeURIComponent(news.slug)}`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
