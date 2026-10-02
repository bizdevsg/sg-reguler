"use client";

import useSWR from "swr";
import { useI18n } from "@/i18n/useI18n";

const API_BASE = (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://sg-admin.newsmaker.id"
).replace(/\/+$/, "");

type Kantor = {
    id: number;
    nama_kantor_cabang: string;
    alamat_kantor_cabang: string;
    telepon_kantor_cabang?: string | null;
    fax_kantor_cabang?: string | null;
    email_kantor_cabang?: string | null;
    maps_kantor_cabang?: string | null;
    created_at?: string;
    updated_at?: string;
};

// Karena API internal sudah mengembalikan array langsung, fetcher cukup return r.json()
const fetcher = (url: string) =>
    fetch(url, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer SGB-c7b0604664fd48d9",
        },
        cache: "no-store",
    }).then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        return json.data as Kantor[]; // hanya ambil bagian data
    });

export default function KantorCabangSection() {
    const { t } = useI18n();
    const { data, error, isLoading } = useSWR<Kantor[]>(`${API_BASE}/api/v1/kantor-cabang`, fetcher, {
        refreshInterval: 30_000,   // auto-refresh tiap 30 detik
        revalidateOnFocus: true,    // revalidate saat tab kembali aktif
        revalidateOnReconnect: true,
        keepPreviousData: true,     // jaga UI tetap isi sambil fetch data baru
        dedupingInterval: 0,        // jangan dedupe; pastikan tiap interval fetch
    });

    const kantorList = data ?? [];

    return (
        <div className="mb-5">
            <h2 className="font-bold mb-4 uppercase text-yellow-500 text-xl" data-aos="fade-right">
                {t("contact.branchOffice")}
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white" data-aos="fade-up">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="border border-neutral-700 rounded-lg p-5 bg-neutral-900">
                            <div className="h-6 w-2/3 bg-neutral-700 rounded animate-pulse mb-3" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-neutral-700 rounded animate-pulse" />
                                <div className="h-4 w-5/6 bg-neutral-700 rounded animate-pulse" />
                                <div className="h-4 w-3/5 bg-neutral-700 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-red-400" data-aos="fade-up">{t("contact.branchError")}</div>
            ) : kantorList.length === 0 ? (
                <div className="text-neutral-300" data-aos="fade-up">{t("contact.branchEmpty")}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white" data-aos="fade-up">
                    {kantorList.map((k) => {
                        const title = k.nama_kantor_cabang;
                        const href = k.maps_kantor_cabang || "#";
                        const isLink = Boolean(k.maps_kantor_cabang);
                        const complaintPhone = "021-29675088";
                        const complaintExt = title.toLowerCase().includes("semarang")
                            ? "116"
                            : title.toLowerCase().includes("makassar")
                                ? "157"
                                : null;

                        const CardInner = (
                            <>
                                <h3 className="font-bold mb-2 uppercase text-2xl">{title}</h3>
                                <div className="space-y-3">
                                    <p>{k.alamat_kantor_cabang}</p>
                                    <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                                        <p>
                                            <strong>{t("contact.phone")}:</strong> {k.telepon_kantor_cabang || "-"}
                                        </p>
                                        <span>|</span>
                                        <p>
                                            <strong>{t("contact.fax")}:</strong> {k.fax_kantor_cabang || "-"}
                                        </p>
                                    </div>
                                    {complaintExt && (
                                        <p className="text-sm md:text-base">
                                            <strong>Unit Pelayanan Pengaduan : </strong>
                                            Telp. {complaintPhone} (Ext. {complaintExt})
                                        </p>
                                    )}
                                    {k.email_kantor_cabang && (
                                        <p className="text-sm md:text-base">
                                            <strong>{t("contact.email")}:</strong> {k.email_kantor_cabang}
                                        </p>
                                    )}
                                </div>
                            </>
                        );

                        return isLink ? (
                            <a
                                key={k.id}
                                href={href!}
                                className="border border-neutral-700 rounded-lg p-5 shadow hover:shadow-yellow-500 transition-shadow"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {CardInner}
                            </a>
                        ) : (
                            <div
                                key={k.id}
                                className="border border-neutral-700 rounded-lg p-5 bg-neutral-900"
                                title={t("contact.mapsUnavailable")}
                            >
                                {CardInner}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
