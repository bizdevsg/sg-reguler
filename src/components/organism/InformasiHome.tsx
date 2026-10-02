"use client";

import useSWR from "swr";
import InformasiCard from "@/components/molecules/InformasiCard";
import { useI18n } from "@/i18n/useI18n";

interface InformasiItem {
  id: number | string;
  slug: string;
  image?: string | null;
  title?: string | null;
  content?: string | null;
  date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
  tanggal?: string | null;
}

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://sg-admin.newsmaker.id"
).replace(/\/+$/, "");

const FALLBACK_IMAGE = "/assets/Informasi-1.jpg";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: "Bearer SGB-c7b0604664fd48d9",
      Accept: "application/json",
    },
    cache: "no-store",
  }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
    return r.json();
  });

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const normalizeImage = (value?: string | null) => {
  if (!value) return FALLBACK_IMAGE;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${API_BASE}${value}`;
  return `${API_BASE}/${value}`;
};

const formatDate = (value?: string | null, locale?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const loc = locale === "en" ? "en-US" : "id-ID";
  const datePart = parsed.toLocaleDateString(loc, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timePart = parsed.toLocaleTimeString(loc, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} | ${timePart}`;
};

const normalizeInformasi = (item: InformasiItem, locale?: string) => {
  const title =
    item?.title ??
    (item as any)?.judul ??
    (item as any)?.nama ??
    (item as any)?.heading ??
    "Informasi";
  const content =
    item?.content ??
    (item as any)?.deskripsi ??
    (item as any)?.body ??
    (item as any)?.isi ??
    "";
  const slug =
    item?.slug ??
    (item as any)?.slug_informasi ??
    (item as any)?.slugInformasi ??
    String(item?.id ?? "");

  const rawDate =
    item?.date ??
    item?.tanggal ??
    item?.created_at ??
    item?.published_at ??
    item?.updated_at ??
    null;

  return {
    id: item?.id ?? slug,
    slug,
    image: normalizeImage(item?.image ?? (item as any)?.thumbnail ?? (item as any)?.gambar ?? (item as any)?.cover),
    title: String(title || "Informasi"),
    date: formatDate(rawDate, locale),
    content: stripHtml(String(content || "")),
  };
};

function pickArray<T = unknown>(raw: any): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && Array.isArray(raw.data)) return raw.data as T[];
  if (raw && raw.data && Array.isArray(raw.data.data)) return raw.data.data as T[];
  return [];
}

export default function InformasiHome() {
  const { t, locale } = useI18n();
  const hideHeader = false;
  const hideSection = false;
  const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/informasi`, fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    keepPreviousData: true,
    dedupingInterval: 10_000,
  });

  const informasi = pickArray<InformasiItem>(data)
    .map((item) => normalizeInformasi(item, locale))
    .slice(0, 3);

  return (
    <section
      className={`px-4 sm:px-6 lg:px-8 py-10 ${hideSection ? "hidden" : ""}`}
      data-aos="fade-up"
    >
      {!hideHeader && (
        <div className="text-center mb-10">
          <p className="text-yellow-500 font-semibold">
            {t("home.informasiLabel")}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t("home.informasiTitle")}
          </h2>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700"
            >
              <div className="h-48 w-full bg-neutral-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-24 bg-neutral-700 rounded animate-pulse" />
                <div className="h-5 w-3/4 bg-neutral-700 rounded animate-pulse" />
                <div className="h-4 w-full bg-neutral-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400">{t("common.errorLoad")}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {informasi.map((item) => (
            <InformasiCard
              key={item.id}
              slug={item.slug}
              image={item.image}
              title={item.title}
              date={item.date}
              content={item.content}
            />
          ))}

          {informasi.length === 0 && (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-6 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-yellow-500">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v2h12V8H6zm0 4v2h8v-2H6z" />
                  </svg>
                </div>
                <p className="text-gray-200 font-semibold">{t("common.emptyData")}</p>
                <p className="text-gray-400 text-sm">Konten akan segera diperbarui.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
