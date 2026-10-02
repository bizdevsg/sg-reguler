import { useI18n } from "@/i18n/useI18n";

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

interface ProdukDetailProps {
    data?: Produk; // dibuat optional supaya aman saat render
    kategoriProduk?: "multilateral" | "bilateral";
}

export default function ProdukDetail({ data, kategoriProduk }: ProdukDetailProps) {
    const { t, locale } = useI18n();
    // Guard: bila data tidak tersedia, tampilkan pesan ramah (menghindari crash)
    if (!data) {
        return (
            <div className="text-red-400 bg-neutral-900 border border-red-800 rounded p-4">
                {t("product.notAvailable")}
            </div>
        );
    }

    // Pastikan BASE tanpa trailing slash
    const BASE = (
        process.env.NEXT_PUBLIC_MEDIA_BASE_URL ??
        process.env.NEXT_PUBLIC_API_BASE_URL ??
        process.env.NEXT_PUBLIC_BASE_URL ??
        "https://sg-admin.newsmaker.id"
    ).replace(/\/+$/, "");
    // Normalisasi path image (tanpa leading slash)
    const relImage = (data.image ?? "").replace(/^\/+/, "");
    const imgSrc = relImage ? `${BASE}/${relImage}` : "https://placehold.co/800x450";

    // Label dari route (jika ada)
    const labelFromRoute =
        kategoriProduk === "multilateral"
            ? t("product.multilateralHeader")
            : kategoriProduk === "bilateral"
                ? t("product.bilateralHeader")
                : undefined;

    // Fallback label dari data API
    const up = (data.kategori || "").toUpperCase();
    const labelFromData =
        up === "JFX"
            ? t("product.multilateralHeader")
            : up === "SPA"
                ? t("product.bilateralHeader")
                : data.kategori || "-";

    const headerTitle = labelFromRoute ?? labelFromData;

    return (
        <article className="text-white">
            <div className="bg-neutral-800 rounded-lg shadow overflow-hidden">
                <div className="w-full h-[320px] md:h-[420px] overflow-hidden">
                    <img src={imgSrc} alt={data.nama_produk} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold">{data.nama_produk}</h1>
                    <p className="text-sm text-gray-400 mt-1">{headerTitle}</p>

                    <div className="mt-5 prose prose-invert max-w-none">
                        <p>{data.deskripsi_produk}</p>
                    </div>

                    {data.specs && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">
                                {t("product.specs", { name: data.nama_produk })}
                            </h2>
                            <div
                                className="prose prose-invert max-w-none product-specs"
                                dangerouslySetInnerHTML={{ __html: data.specs }}
                            />
                        </div>
                    )}
                    <div className="text-xs text-neutral-500">
                        {(() => {
                            const ts = data?.updated_at;
                            if (!ts) return t("product.lastUpdateEmpty");
                            const d = new Date(ts);
                            if (isNaN(d.getTime())) return t("product.lastUpdateEmpty");

                            const formatted = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
                                year: "numeric",
                                month: "long",   // contoh: Agu
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                timeZone: "Asia/Jakarta",
                            }).format(d);

                            return t("product.lastUpdate", { datetime: formatted });
                        })()}
                    </div>
                </div>
            </div>
        </article>
    );
}
