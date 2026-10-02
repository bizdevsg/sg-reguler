import Link from "next/link";
import MiniHeader from "../atoms/MiniHeader";
import { useI18n } from "@/i18n/useI18n";

type LogoItem = {
    src: string;
    alt: string;
    href?: string;
};

function isValidHref(href?: string): boolean {
    return !!href && href.trim() !== "";
}

function isExternal(href: string): boolean {
    return /^https?:\/\//i.test(href);
}

const LogoGrid = ({
    title,
    items,
    Aos,
    AosHeader,
    className = "space-y-5",
    gridClassName = "grid grid-cols-2 gap-5 md:grid-cols-3",
    lastItemFullMobile = false, // opsi baru
}: {
    title: string;
    Aos: string;
    AosHeader: string;
    items: LogoItem[];
    className?: string;
    gridClassName?: string;
    lastItemFullMobile?: boolean;
}) => {
    return (
        <div className={className}>
            <div className="flex justify-center w-full" data-aos={AosHeader}>
                <MiniHeader title={title} />
            </div>

            <div className={gridClassName} data-aos={Aos}>
                {items.map((item, index) => {
                    const href = item.href?.trim();
                    const key = `${item.alt}-${item.src}`;

                    const cardContent = (
                        <div className="h-full flex items-center justify-center px-4 py-7 bg-neutral-800 rounded hover:shadow hover:shadow-yellow-500 transition duration-300">
                            <img
                                src={encodeURI(item.src)}
                                alt={item.alt}
                                className="max-h-[65px] w-auto object-contain"
                            />
                        </div>
                    );

                    // hanya item terakhir yg col-span-2 jika lastItemFullMobile true
                    const spanClass =
                        lastItemFullMobile && index === items.length - 1
                            ? "col-span-2 md:col-span-1"
                            : "";

                    // No href → show just the card
                    if (!isValidHref(href)) {
                        return (
                            <div key={key} className={spanClass}>
                                {cardContent}
                            </div>
                        );
                    }

                    // External link
                    if (isExternal(href!)) {
                        return (
                            <a
                                key={key}
                                href={href!}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.alt}
                                className={spanClass}
                            >
                                {cardContent}
                            </a>
                        );
                    }

                    // Internal link
                    return (
                        <Link
                            key={key}
                            href={href!}
                            aria-label={item.alt}
                            className={spanClass}
                        >
                            {cardContent}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default function Watcher() {
    const { t } = useI18n();
    const logoPengawas: LogoItem[] = [
        {
            src: "/assets/bappeti.png",
            alt: t("watcher.alt.bappebti"),
            href: "https://bappebti.go.id/pialang_berjangka/detail/049",
        },
        {
            src: "/assets/OJK_Logo.png",
            alt: t("watcher.alt.ojk"),
            href: "https://www.ojk.go.id/id/Default.aspx",
        },
        {
            src: "/assets/Logo-BI.png",
            alt: t("watcher.alt.bi"),
            href: "https://www.bi.go.id/id/default.aspx",
        },
    ];

    const logoMember: LogoItem[] = [
        {
            src: "/assets/logo JFX.png",
            alt: t("watcher.alt.jfx"),
            href: "https://www.jfx.co.id/MarketMaker/market_maker/Pialang",
        },
        {
            src: "/assets/logo KBI.png",
            alt: t("watcher.alt.kbi"),
            href: "https://www.ptkbi.com/our-partner/perdagangan-berjangka-komoditi",
        },
        {
            src: "/assets/aspebtindo.png",
            alt: t("watcher.alt.aspebtindo"),
            href: "https://aspebtindo.org/anggota/497",
        },
    ];

    return (
        <div
            className="border-y border-white/25 space-y-10 py-10 px-5"
            data-aos="zoom-in"
        >
            {/* logoPengawas normal */}
            <LogoGrid
                title={t("watcher.supervised")}
                items={logoPengawas}
                Aos="fade-left"
                AosHeader="fade-right"
                gridClassName="grid grid-cols-2 md:grid-cols-3 gap-5"
                lastItemFullMobile={true}
            />

            {/* logoMember: baris pertama 2, baris kedua 1 full di mobile */}
            <LogoGrid
                title={t("watcher.membership")}
                items={logoMember}
                Aos="fade-left"
                AosHeader="fade-right"
                gridClassName="grid grid-cols-2 md:grid-cols-3 gap-5"
                lastItemFullMobile={true}
            />
        </div>
    );
}
