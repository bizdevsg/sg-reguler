"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";

interface NewsCardProps {
    title: string;
    category: string;
    description?: string;
    image?: string;
    date?: string;
    href: string; // <- WAJIB
    allowFallback?: boolean;
}

export default function NewsCard({
    title,
    category,
    description,
    image,
    date,
    href,
    allowFallback = true,
}: NewsCardProps) {
    const { t, locale } = useI18n();
    const fallbackImage = allowFallback ? "/assets/Downtren.jpg" : undefined;
    const [imgSrc, setImgSrc] = useState(image || fallbackImage);
    const safeDescription = description ?? t("news.noDescription");
    const formattedDate = formatDate(date, locale, t("common.invalidFormat"));
    const isRemoteImage = typeof imgSrc === "string" && /^https?:\/\//i.test(imgSrc);

    useEffect(() => {
        setImgSrc(image || fallbackImage);
    }, [image, fallbackImage]);

    return (
        <Link href={href} prefetch={false} className="block h-full">
            <article className="bg-neutral-800 hover:bg-neutral-900 h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <div className="relative w-full h-40 bg-neutral-700">
                    {imgSrc ? (
                        <Image
                            src={imgSrc}
                            alt={title || t("news.alt")}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized={isRemoteImage}
                            className="object-cover"
                            priority={false}
                            onError={() => {
                                if (imgSrc !== fallbackImage) setImgSrc(fallbackImage);
                            }}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wider text-neutral-300">
                            No Image
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col h-full">
                    <div>
                        <h2 className="text-sm uppercase font-semibold text-yellow-500 tracking-wide">
                            {category || "-"}
                        </h2>
                        {formattedDate && (
                            <p className="text-xs text-gray-400 mb-1">{formattedDate}</p>
                        )}
                        <h3 className="text-lg sm:text-xl line-clamp-2 font-bold text-white mb-2">
                            {title}
                        </h3>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                        {safeDescription}
                    </p>
                </div>
            </article>
        </Link>
    );
}

function formatDate(value?: string, locale?: string, fallback?: string) {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return fallback ?? "";
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
}
