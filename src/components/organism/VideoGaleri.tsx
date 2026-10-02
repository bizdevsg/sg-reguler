"use client";

import useSWR from "swr";
import { useI18n } from "@/i18n/useI18n";
import VideoUmumHome from "@/components/organism/VideoUmumHome";

/* ========= Types ========= */

interface ApiTiktok {
    id: number;
    title: string;
    embed_code: string;
    backup_video_url?: string | null;
    created_at?: string;
    updated_at?: string;
}

interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

/* ========= Utils ========= */
const fetcher = (url: string) => {
    return fetch(url, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
        return r.json();
    });
};

const API_BASE = (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://sg-admin.newsmaker.id"
).replace(/\/+$/, "");


export default function VideoGaleri() {
    const { t } = useI18n();
    /* ===== TikTok ID ===== */
    const { data: tiktokData, error: tiktokErr } = useSWR<
        ApiResponse<ApiTiktok[]>
    >(`${API_BASE}/api/v1/tiktok`, fetcher);

    const latestTiktok = Array.isArray(tiktokData?.data)
        ? [...tiktokData.data].sort((a, b) => {
              const timeA = a.created_at ? Date.parse(a.created_at) : 0;
              const timeB = b.created_at ? Date.parse(b.created_at) : 0;
              if (timeA !== timeB) return timeB - timeA;
              return (b.id ?? 0) - (a.id ?? 0);
          })[0]
        : undefined;

    const rawBackupUrl = latestTiktok?.backup_video_url?.trim() ?? "";
    const backupVideoUrl = rawBackupUrl
        ? rawBackupUrl.startsWith("http")
            ? rawBackupUrl
            : `${API_BASE}${rawBackupUrl.startsWith("/") ? "" : "/"}${rawBackupUrl}`
        : "";

    return (
        <div className="flex flex-col lg:flex-row gap-5 p-4">
            {/* TikTok */}
            <section
                className="flex flex-col items-center text-center space-y-5 lg:w-1/3"
                data-aos="fade-right"
            >
                <div className="bg-neutral-800 px-4 py-2 rounded font-semibold text-yellow-500 w-fit">
                    @solidgold_news
                </div>

                {tiktokErr && (
                    <div className="text-red-400 text-sm">{t("gallery.tiktokError")}</div>
                )}
                {!backupVideoUrl ? (
                    <div className="text-neutral-300 text-sm">{t("gallery.tiktokLoading")}</div>
                ) : (
                    <div className="relative w-full max-w-[360px] overflow-hidden rounded-lg shadow-lg bg-neutral-900">
                        <video
                            className="w-full h-full object-cover rounded-lg bg-neutral-900"
                            controls
                            preload="metadata"
                        >
                            <source src={backupVideoUrl} type="video/mp4" />
                            {t("gallery.embedUnavailable")}
                        </video>
                        <a
                            href="https://www.tiktok.com/@solidgold_news?is_from_webapp=1&sender_device=pc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-2 right-2 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 shadow-md backdrop-blur transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                            aria-label="Buka di TikTok"
                            title="Buka di TikTok"
                        >
                            <svg
                                viewBox="0 0 256 256"
                                className="h-5 w-5 fill-white"
                                aria-hidden="true"
                            >
                                <path d="M168.5 24c6.9 40.7 29.2 65.1 63.5 67.2v35.9c-20.6 1.3-40.7-5.8-63.1-19.1v67.2c0 33.7-27.3 61-61 61s-61-27.3-61-61 27.3-61 61-61c4.1 0 8.1.4 12 1.2v36.2c-3.6-1.2-7.4-1.9-11.5-1.9-14.7 0-26.6 11.9-26.6 26.6s11.9 26.6 26.6 26.6 26.6-11.9 26.6-26.6V24h33.5z" />
                            </svg>
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-white sm:text-xs">
                                Follow TikTok @solidgold_news
                            </span>
                        </a>
                    </div>
                )}
            </section>

            {/* Video */}
            <section className="flex flex-col lg:w-2/3 space-y-6">
                <div
                    className="flex flex-col items-center text-center space-y-5"
                    data-aos="fade-left"
                >
                    <div className="bg-neutral-800 px-4 py-2 rounded font-semibold text-yellow-500 w-fit">
                        {t("gallery.eduVideo")}
                    </div>
                    <div className="relative w-full max-w-3xl overflow-hidden rounded-lg shadow-lg min-h-[16rem] bg-neutral-900">
                        <video
                            className="w-full h-full object-cover rounded-lg bg-neutral-900"
                            controls
                            preload="metadata"
                        >
                            <source src="/assets/Company%20Profile%20SGB%201.2.mp4" type="video/mp4" />
                            {t("gallery.embedUnavailable")}
                        </video>
                    </div>
                </div>

                {/* Video Umum di bawah Company Profile */}
                <div className="w-full max-w-3xl mx-auto">
                    <VideoUmumHome compact hideHeader className="pt-0" />
                </div>
            </section>
        </div>
    );
}
