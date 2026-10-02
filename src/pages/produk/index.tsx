"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import PageTemplates from "@/components/templates/PageTemplates";
import ProdukCard from "@/components/moleculs/ProdukCard";
import Header from "@/components/moleculs/Header";

type Produk = {
    id: number;
    nama_produk: string;
    slug: string;
    deskripsi_produk: string;
    specs?: string;
    image?: string;
    kategori?: string; // "JFX" | "SPA"
    created_at?: string;
    updated_at?: string;
};

export default function ProdukPage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    
    const API_BASE = useMemo(
        () =>
            (
                process.env.NEXT_PUBLIC_API_BASE_URL ??
                process.env.NEXT_PUBLIC_BASE_URL ??
                "https://sg-admin.newsmaker.id"
            ).replace(/\/+$/, ""),
        []
    );

    const [produk, setProduk] = useState<Produk[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        
        let isRequestMounted = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_BASE}/api/v1/produk`, {
                    cache: "no-store",
                    headers: {
                        "Authorization": "Bearer SGB-c7b0604664fd48d9",
                        "Accept": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Gagal memuat data produk");

                // JSON dari server
                const json = await res.json();
                // ambil array data
                const data: Produk[] = json.data;

                if (!Array.isArray(data)) throw new Error("Format data tidak valid");
                if (!isRequestMounted) return;

                // Tampilkan semua produk (JFX dan SPA)
                setProduk(data);
            } catch (e: any) {
                if (!isRequestMounted) return;
                setError(e?.message ?? "Terjadi kesalahan saat memuat data");
            } finally {
                if (isRequestMounted) setLoading(false);
            }
        })();

        return () => {
            isRequestMounted = false;
        };
    }, [API_BASE, isMounted]);

    // Show loading or fallback during hydration
    if (!isMounted) {
        return (
            <PageTemplates title="Produk">
                <div className="container mx-auto px-4 py-12 text-gray-200">
                    <Header title="Semua Produk" subtitle="PT. Solid Gold Berjangka" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-neutral-800 rounded-lg shadow animate-pulse">
                                <div className="w-full h-48 bg-neutral-700 rounded-t-lg" />
                                <div className="p-4">
                                    <div className="h-6 bg-neutral-700 rounded w-2/3 mb-3" />
                                    <div className="h-4 bg-neutral-700 rounded w-full mb-2" />
                                    <div className="h-4 bg-neutral-700 rounded w-5/6 mb-4" />
                                    <div className="h-10 bg-neutral-700 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageTemplates>
        );
    }

    return (
        <PageTemplates title="Produk">
            <div className="containe text-gray-200">
                <Header title="Semua Produk" subtitle="PT. Solid Gold Berjangka" />

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-neutral-800 rounded-lg shadow animate-pulse">
                                <div className="w-full h-48 bg-neutral-700 rounded-t-lg" />
                                <div className="p-4">
                                    <div className="h-6 bg-neutral-700 rounded w-2/3 mb-3" />
                                    <div className="h-4 bg-neutral-700 rounded w-full mb-2" />
                                    <div className="h-4 bg-neutral-700 rounded w-5/6 mb-4" />
                                    <div className="h-10 bg-neutral-700 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-red-400 bg-neutral-900 border border-red-800 rounded p-4 text-center">
                        {error}
                    </div>
                )}

                {/* Produk Grid */}
                {!loading && !error && (
                    <>
                        {produk.length === 0 ? (
                            <div className="text-gray-300 bg-neutral-900 border border-neutral-700 rounded p-4 text-center">
                                Tidak ada produk tersedia.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                                {produk.map((p) => (
                                    <ProdukCard
                                        key={p.id}
                                        title={p.nama_produk}
                                        description={p.deskripsi_produk}
                                        slug={p.slug}
                                        imagePath={p.image}
                                        href={`/produk/${(p.kategori || "").toLowerCase() === "jfx" ? "multilateral" : "bilateral"}/${p.slug}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </PageTemplates>
    );
}