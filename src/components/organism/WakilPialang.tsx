import useSWR from "swr";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/useI18n";

const API_BASE = (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://sg-admin.newsmaker.id"
).replace(/\/+$/, "");

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? "SGB-c7b0604664fd48d9";

type WakilPialang = {
    id: number;
    nomor_id: string;
    nama: string;
    status: "Aktif" | "Non-Aktif" | string;
    kantor_cabang_id?: string | number | null;
    kantor_cabang?: { id: number; nama_kantor_cabang: string } | null;
};

type KantorCabang = {
    id: number;
    nama_kantor_cabang: string;
};

type ApiResponseMaybe<T> = {
    data?: T;
} & Record<string, unknown>;

function normalizeStatus(v: unknown): WakilPialang["status"] {
    if (typeof v === "boolean") return v ? "Aktif" : "Non-Aktif";
    const s = String(v ?? "").trim();
    if (!s) return "-";
    return s;
}

function normalizeWakilPialang(item: Record<string, unknown>, fallbackId: number): WakilPialang {
    const idRaw = item.id ?? item.ID ?? item.wakil_pialang_id ?? fallbackId;
    const id = Number(idRaw);

    const nama =
        String(item.nama ?? item.name ?? item.nama_wakil ?? item.full_name ?? "").trim() ||
        "-";

    const nomorId =
        String(item.nomor_id ?? item.no_id ?? item.nomorid ?? item.license_no ?? "").trim() ||
        "-";

    const status = normalizeStatus(
        item.status ?? item.is_active ?? item.aktif ?? item.active
    );


    const kantorCabangId = (item.kantor_cabang_id ?? null) as string | number | null;
    const kantorCabangRaw = item.kantor_cabang;
    const kantorCabang =
        kantorCabangRaw && typeof kantorCabangRaw === "object"
            ? {
                id: Number((kantorCabangRaw as any).id),
                nama_kantor_cabang: String((kantorCabangRaw as any).nama_kantor_cabang ?? ""),
            }
            : null;

    return {
        id: Number.isFinite(id) ? id : fallbackId,
        nama,
        nomor_id: nomorId,
        status,
        kantor_cabang_id: kantorCabangId,
        kantor_cabang: kantorCabang?.nama_kantor_cabang ? kantorCabang : null,
    };
}

async function fetchJson(url: string, withAuth: boolean) {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (withAuth && API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;
    const r = await fetch(url, { headers, cache: "no-store" });
    return r;
}

function parseList(json: unknown): WakilPialang[] {
    const root = json as ApiResponseMaybe<unknown>;
    const maybeArray =
        (Array.isArray(root?.data) && (root.data as unknown[])) ||
        (Array.isArray((root?.data as any)?.data) && ((root.data as any).data as unknown[])) ||
        (Array.isArray(json) && (json as unknown[])) ||
        [];

    return maybeArray
        .filter((x): x is Record<string, unknown> => Boolean(x) && typeof x === "object")
        .map((it, idx) => normalizeWakilPialang(it, idx + 1));
}

const fetcher = async (url: string): Promise<WakilPialang[]> => {
    const fallbackUrl = url.replace("/wakil-pialang", "/wakil_pialang");

    // 1) Coba endpoint publik (tanpa auth)
    let r = await fetchJson(url, false);

    // 2) Kalau 401 dan ada token, coba endpoint yg sama pakai auth
    if (r.status === 401 && API_TOKEN) {
        r = await fetchJson(url, true);
    }

    // 3) Kalau masih error (mis. 5xx), coba varian underscore (biasanya butuh auth)
    if (!r.ok) {
        const r2 = await fetchJson(fallbackUrl, Boolean(API_TOKEN));
        if (r2.ok) {
            const json2: unknown = await r2.json();
            return parseList(json2);
        }
    }

    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const json: unknown = await r.json();
    return parseList(json);
};

function statusClass(status: string) {
    const s = status.trim().toLowerCase();
    if (s === "aktif") return "text-green-400";
    if (s === "non-aktif" || s === "nonaktif" || s === "non aktif") return "text-red-400";
    return "text-yellow-400";
}

export default function WakilPialangSection() {
    const { t } = useI18n();
    const [selectedCabangId, setSelectedCabangId] = useState<string>("0");

    const wakilUrl = useMemo(() => {
        const sp = new URLSearchParams();
        sp.set("per_page", "100");
        if (selectedCabangId) sp.set("kantor_cabang_id", selectedCabangId);
        return `${API_BASE}/api/v1/wakil-pialang?${sp.toString()}`;
    }, [selectedCabangId]);

    const { data, error, isLoading } = useSWR<WakilPialang[]>(wakilUrl, fetcher);

    const kantorFetcher = async (url: string): Promise<KantorCabang[]> => {
        const headers: Record<string, string> = { Accept: "application/json" };
        const r = await fetch(url, { headers, cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = (await r.json()) as ApiResponseMaybe<unknown>;
        const arr = Array.isArray(json?.data) ? (json.data as unknown[]) : [];
        return arr
            .filter((x): x is Record<string, unknown> => Boolean(x) && typeof x === "object")
            .map((it) => ({
                id: Number(it.id),
                nama_kantor_cabang: String(it.nama_kantor_cabang ?? ""),
            }))
            .filter((it) => Number.isFinite(it.id) && it.nama_kantor_cabang.trim().length > 0);
    };

    const { data: kantorCabangList } = useSWR<KantorCabang[]>(
        `${API_BASE}/api/v1/kantor-cabang`,
        kantorFetcher
    );

    return (
        <section className="text-white space-y-7 mb-5" data-aos="fade-up">
            <div className="text-center mx-auto max-w-xl px-4">
                <p className="font-bold mb-2 uppercase text-yellow-500 text-sm md:text-base">
                    {t("wakil.title")}
                </p>
                <h2 className="font-bold mb-4 uppercase text-lg md:text-2xl">
                    {t("wakil.sectionTitle")}
                </h2>
            </div>

            {/* Filter Cabang */}
            <div className="px-4 flex justify-center">
                <div className="w-full max-w-5xl">
                    <div className="block text-sm text-gray-300 mb-2 text-center">{t("wakil.pickBranch")}</div>
                    <div className="w-full">
                        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/40 p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex gap-2 whitespace-nowrap w-max mx-auto">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCabangId("0")}
                                    className={`px-4 py-2 rounded-lg border text-sm transition-colors ${selectedCabangId === "0"
                                        ? "btn-primary border-yellow-500 shadow"
                                        : "bg-neutral-950 text-white border-neutral-700 hover:border-yellow-500"
                                        }`}
                                >
                                    {t("common.hqJakarta")}
                                </button>
                                {(kantorCabangList ?? []).map((k) => {
                                    const id = String(k.id);
                                    const active = selectedCabangId === id;
                                    return (
                                        <button
                                            key={k.id}
                                            type="button"
                                            onClick={() => setSelectedCabangId(id)}
                                            className={`px-4 py-2 rounded-lg border text-sm transition-colors shrink-0 ${active
                                                ? "btn-primary border-yellow-500 shadow"
                                                : "bg-neutral-950 text-white border-neutral-700 hover:border-yellow-500"
                                                }`}
                                        >
                                            {k.nama_kantor_cabang}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* State */}
            {isLoading && (
                <div className="px-4">
                    <div className="rounded-xl bg-[#1e1e1e] p-6 text-center text-gray-300">
                        {t("wakil.loading")}
                    </div>
                </div>
            )}

            {error && (
                <div className="px-4">
                    <div className="rounded-xl bg-red-900/40 border border-red-700 p-6 text-center">
                        {t("wakil.errorDetail")}
                    </div>
                </div>
            )}

            {/* Grid */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    {(data ?? []).map((pialang) => (
                        <div
                            key={pialang.id}
                            className="rounded-xl overflow-hidden bg-[#1e1e1e] text-center shadow-md"
                        >
                            {/* Konten */}
                            <div className="px-6 py-6 space-y-1">
                                <p className="text-gray-300 font-medium text-sm tracking-wide">
                                    {pialang.nama}
                                </p>
                                <p className="text-white font-bold text-base font-mono">
                                    {pialang.nomor_id}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {pialang.kantor_cabang?.nama_kantor_cabang ??
                                        (pialang.kantor_cabang_id === 0 ||
                                            pialang.kantor_cabang_id === "0" ||
                                            pialang.kantor_cabang_id == null ||
                                            String(pialang.kantor_cabang_id).trim() === ""
                                            ? t("common.hqJakarta")
                                            : "-")}
                                </p>
                                <p className={`font-semibold text-sm ${statusClass(pialang.status)}`}>
                                    {pialang.status?.toUpperCase()}
                                </p>
                                <div className="pt-2 text-yellow-500 text-sm font-medium">{t("common.details")}</div>
                            </div>
                        </div>
                    ))}

                    {/* Fallback jika kosong */}
                    {data && data.length === 0 && (
                        <div className="col-span-full">
                            <div className="rounded-xl bg-[#1e1e1e] p-6 text-center text-gray-300">
                                {t("wakil.empty")}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
