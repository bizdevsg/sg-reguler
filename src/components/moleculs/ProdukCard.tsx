import { useI18n } from "@/i18n/useI18n";

type ProdukCardProps = {
    title: string;
    description: string;
    slug: string;
    imagePath?: string | null;
    href: string; // final URL untuk tombol Detail
};

export default function ProdukCard({
    title,
    description,
    imagePath,
    href,
}: ProdukCardProps) {
    const { t } = useI18n();
    const safeDescription = description.replace(/\s(Kg|kg|KG)\b/g, "\u00A0$1");
    const BASE_URL =
        (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ??
            process.env.NEXT_PUBLIC_API_BASE_URL ??
            process.env.NEXT_PUBLIC_BASE_URL ??
            "https://sg-admin.newsmaker.id"
        ).replace(/\/+$/, "") + "/";
    const imgSrc = imagePath
        ? `${BASE_URL}${imagePath.startsWith("/") ? imagePath.slice(1) : imagePath}`
        : "https://placehold.co/600x400";

    return (
        <div className="bg-neutral-800 rounded-lg shadow overflow-hidden flex flex-col">
            <div className="overflow-hidden">
                <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 text-white flex flex-col flex-1">
                <h5 className="text-xl font-bold line-clamp-1">{title}</h5>
                <p className="text-gray-400 mt-2 line-clamp-2">{safeDescription}</p>
                <a
                    href={href}
                    className="btn-primary w-full text-center px-5 py-2 rounded-full mt-auto pt-3 inline-block"
                >
                    {t("common.details")}
                </a>
            </div>
        </div>
    );
}
