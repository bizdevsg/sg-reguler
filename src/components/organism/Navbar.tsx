"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import LanguageToggle from "@/components/atoms/LanguageToggle";
import { useI18n } from "@/i18n/useI18n";

const MAIN_SITE_URL = "https://mini.sg-berjangka.com/";

type MenuLink = { label: string; href: string };
type MenuGroup = { category: string; children: MenuLink[] };
type SubMenuItem = { label: string; href: string; subDropdown?: MenuLink[] };
type MenuItem =
    | { label: string; key?: string; href: string }
    | { label: string; key: string; dropdown: (MenuLink | MenuGroup | SubMenuItem)[] };

export default function Navbar() {
    const router = useRouter();
    const [clientPathname, setClientPathname] = useState<string | null>(null);
    const pathname = clientPathname ?? "";
    const { t } = useI18n();

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navRef = useRef<HTMLDivElement | null>(null);

    const menuItems: MenuItem[] = [
        { label: t("nav.about.broker"), href: "/tentang-kami/wakil-pialang" },
        {
            label: t("nav.products"),
            key: "produk",
            dropdown: [
                { label: t("nav.products.multilateral"), href: "/produk/multilateral" },
                { label: t("nav.products.bilateral"), href: "/produk/bilateral" },
                { label: t("nav.products.characteristics"), href: "/produk/karakteristik-produk" },
                { label: t("nav.products.illustration"), href: "/produk/ilustrasi-transaksi" },
            ],
        },
        {
            label: t("nav.procedures"),
            key: "prosedur",
            dropdown: [
                { label: t("nav.procedures.guide"), href: "/prosedur/petunjuk-transaksi" },
                { label: t("nav.procedures.withdrawal"), href: "/prosedur/prosedur-penarikan" },
                { label: t("nav.procedures.regol"), href: "/prosedur/prosedur-regol" },
                { label: t("nav.education.screen"), href: "/edukasi/tampilan-transaksi-online" },
            ],
        },
    ];

    /** Utils Active */
    const isActiveHref = (href?: string): boolean => {
        if (!href) return false;
        return pathname === href || pathname.startsWith(href + "/");
    };

    const getDropdownLinks = (dropdown: (MenuLink | MenuGroup | SubMenuItem)[]): MenuLink[] => {
        if (!dropdown?.length) return [];
        if (isGroupArray(dropdown)) {
            return (dropdown as MenuGroup[]).flatMap((g) => g.children);
        }
        
        const links: MenuLink[] = [];
        (dropdown as (MenuLink | SubMenuItem)[]).forEach(item => {
            if (isSubMenuItem(item)) {
                links.push({ label: item.label, href: item.href });
                if (item.subDropdown) {
                    links.push(...item.subDropdown);
                }
            } else {
                links.push(item);
            }
        });
        return links;
    };

    const isDropdownActive = (dropdown: (MenuLink | MenuGroup | SubMenuItem)[]) =>
        getDropdownLinks(dropdown).some((l) => isActiveHref(l.href));

    // Scroll state
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 150);
                    ticking = false;
                });
                ticking = true;
            }
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll saat mobile menu terbuka
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    // Tutup saat klik di luar & tombol Esc
    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!navRef.current) return;
            if (!navRef.current.contains(e.target as Node)) {
                setActiveDropdown(null);
                setActiveSubDropdown(null);
                setMobileDropdown(null);
                setMobileSubDropdown(null);
                setIsOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveDropdown(null);
                setActiveSubDropdown(null);
                setMobileDropdown(null);
                setMobileSubDropdown(null);
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    // ✅ Tutup menu saat route berubah
    useEffect(() => {
        const nextPath = (router.asPath || "").split("?")[0];
        setClientPathname(nextPath);
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
        setIsOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileDropdown(null);
        setMobileSubDropdown(null);
    }, [pathname]);

    // Hover handlers (desktop)
    const handleMouseEnter = (key: string, isSubDropdown?: string) => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        if (isSubDropdown) {
            setActiveSubDropdown(isSubDropdown);
        } else {
            setActiveDropdown(key);
        }
    };
    const handleMainMouseLeave = () => {
        timeoutId.current = setTimeout(() => {
            setActiveDropdown(null);
            setActiveSubDropdown(null);
        }, 300);
    };
    const handleDropdownMouseEnter = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
    };

    const closeAllMenus = () => {
        setIsOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileDropdown(null);
        setMobileSubDropdown(null);
    };

    const linkBase = "text-base hover:text-yellow-500 transition-colors";

    return (
        <nav
            className={`w-full top-0 left-0 z-30 transition-all duration-300 ${isScrolled ? "fixed py-1" : "absolute py-4"
                }`}
            aria-label="Primary"
        >
            <div className="max-w-7xl mx-auto px-2 md:px-0">
                <div
                    ref={navRef}
                    className={`backdrop-blur-3xl px-4 md:px-6 w-full rounded-md ${isScrolled || isOpen ? "py-2 bg-neutral-700/40" : "lg:py-2"
                        } min-h-[60px] flex items-center`}
                >
                    <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center gap-y-4 lg:gap-y-0">
                        {/* Brand + Mobile Toggle */}
                        <div className="w-full flex flex-row justify-between items-center lg:w-auto">
                            <Link href="/" aria-label="Beranda" onClick={closeAllMenus}>
                                <Image
                                    src="/assets/sglogo.png"
                                    alt="Solid Gold"
                                    width={160}
                                    height={40}
                                    className="h-8   md:h-10 w-auto"
                                    priority
                                />
                            </Link>
                            <button
                                className="lg:hidden text-white text-2xl p-2"
                                onClick={() => setIsOpen((v) => !v)}
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                aria-controls="primary-navigation"
                            >
                                {isOpen ? <FiX /> : <FiMenu />}
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div
                            id="primary-navigation"
                            className={`flex flex-col lg:flex-row items-start lg:items-center gap-y-2 lg:gap-x-6 transition-all duration-300 ${isOpen ? "block" : "hidden"
                                } lg:flex`}
                        >
                            {menuItems.map((item, idx) => {
                                const hasDropdown = (item as any).dropdown;
                                const key = "key" in item ? item.key ?? item.label : item.label;

                                if (hasDropdown) {
                                    const dropdown = (item as Extract<MenuItem, { dropdown: any }>).dropdown;
                                    const desktopOpen = activeDropdown === key;
                                    const parentActive = isDropdownActive(dropdown);

                                    return (
                                        <div
                                            key={idx}
                                            className="relative w-full lg:w-auto"
                                        >
                                            <button
                                                type="button"
                                                className={`${linkBase} flex justify-between items-center gap-2 w-full lg:w-auto cursor-pointer ${parentActive ? "text-yellow-400" : "text-white"
                                                    }`}
                                                aria-haspopup="menu"
                                                aria-expanded={(desktopOpen || mobileDropdown === key) || undefined}
                                                onClick={() =>
                                                    setMobileDropdown(mobileDropdown === key ? null : key)
                                                }
                                                onFocus={() => handleMouseEnter(key)}
                                                onMouseEnter={() => handleMouseEnter(key)}
                                            >
                                                {item.label}
                                                <FiChevronDown />
                                            </button>

                                            {/* Desktop Dropdown Wrapper */}
                                            <div
                                                className="hidden lg:block"
                                                onMouseEnter={() => handleMouseEnter(key)}
                                                onMouseLeave={handleMainMouseLeave}
                                            >
                                                <div
                                                    role="menu"
                                                    aria-label={item.label}
                                                    className={`absolute left-0 mt-2 bg-neutral-800 text-white rounded-md shadow-lg ring-1 ring-white/10 w-[15rem] ${desktopOpen ? "block" : "hidden"
                                                        }`}
                                                >
                                                {isGroupArray(dropdown) ? (
                                                    <div className="py-2">
                                                        {dropdown.map((group, gIdx) => (
                                                            <div key={gIdx} className="px-4 py-3">
                                                                <span className="block font-semibold text-lg text-gray-300 mb-2">
                                                                    {group.category}
                                                                </span>
                                                                <ul className="space-y-1 ms-2">
                                                                    {group.children.map((child, cIdx) => {
                                                                        const childActive = isActiveHref(child.href);
                                                                        return (
                                                                            <li key={cIdx}>
                                                                                <Link
                                                                                    href={child.href}
                                                                                    className={`block py-1 ${childActive
                                                                                        ? "text-yellow-400"
                                                                                        : "text-gray-300 hover:text-yellow-500"
                                                                                        }`}
                                                                                    aria-current={childActive ? "page" : undefined}
                                                                                    onClick={closeAllMenus}
                                                                                >
                                                                                    {child.label}
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <ul className="py-2">
                                                        {(dropdown as (MenuLink | SubMenuItem)[]).map((link, lIdx) => {
                                                            const hasSubDropdown = 'subDropdown' in link && link.subDropdown;
                                                            const childActive = isActiveHref(link.href);
                                                            const subKey = `${key}-${lIdx}`;
                                                            
                                                            return (
                                                                <li key={lIdx} className="relative">
                                                                    {hasSubDropdown ? (
                                                                        <div
                                                                            className="relative"
                                                                            onMouseEnter={() => setActiveSubDropdown(subKey)}
                                                                            onMouseLeave={() => setActiveSubDropdown(null)}
                                                                        >
                                                                            <button
                                                                                className={`flex justify-between items-center w-full py-2 px-4 ${childActive
                                                                                    ? "text-yellow-400"
                                                                                    : "text-gray-300 hover:text-yellow-500"
                                                                                    }`}
                                                                                aria-haspopup="menu"
                                                                                aria-expanded={activeSubDropdown === subKey}
                                                                            >
                                                                                {link.label}
                                                                                <FiChevronDown className="ml-1" />
                                                                            </button>
                                                                            
                                                                            {/* Sub Dropdown */}
                                                                            <div
                                                                                role="menu"
                                                                                className={`absolute left-full top-0 ml-1 bg-neutral-800 text-white rounded-md shadow-lg ring-1 ring-white/10 w-[15rem] ${activeSubDropdown === subKey ? "block" : "hidden"
                                                                                    }`}
                                                                                onMouseEnter={() => setActiveSubDropdown(subKey)}
                                                                                onMouseLeave={() => setActiveSubDropdown(null)}
                                                                            >
                                                                                <ul className="py-2">
                                                                                    {link.subDropdown!.map((subLink, subIdx) => {
                                                                                        const subActive = isActiveHref(subLink.href);
                                                                                        return (
                                                                                            <li key={subIdx}>
                                                                                                <Link
                                                                                                    href={subLink.href}
                                                                                                    className={`block py-2 px-4 ${subActive
                                                                                                        ? "text-yellow-400"
                                                                                                        : "text-gray-300 hover:text-yellow-500"
                                                                                                        }`}
                                                                                                    aria-current={subActive ? "page" : undefined}
                                                                                                    onClick={closeAllMenus}
                                                                                                >
                                                                                                    {subLink.label}
                                                                                                </Link>
                                                                                            </li>
                                                                                        );
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <Link
                                                                            href={link.href}
                                                                            className={`block py-2 px-4 ${childActive
                                                                                ? "text-yellow-400"
                                                                                : "text-gray-300 hover:text-yellow-500"
                                                                                }`}
                                                                            aria-current={childActive ? "page" : undefined}
                                                                            onClick={closeAllMenus}
                                                                            onMouseEnter={() => setActiveSubDropdown(null)}
                                                                        >
                                                                            {link.label}
                                                                        </Link>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                            </div> {/* Close Desktop Dropdown Wrapper */}

                                            {/* Mobile Dropdown */}
                                            {mobileDropdown === key && (
                                                <div className="lg:hidden pl-3 pt-1" role="menu">
                                                    {isGroupArray(dropdown) ? (
                                                        <div className="space-y-2">
                                                            {dropdown.map((group, gIdx) => (
                                                                <div key={gIdx}>
                                                                    <span className="block font-semibold text-gray-300 mb-1">
                                                                        {group.category}
                                                                    </span>
                                                                    <ul>
                                                                        {group.children.map((child, cIdx) => {
                                                                            const childActive = isActiveHref(child.href);
                                                                            return (
                                                                                <li key={cIdx}>
                                                                                    <Link
                                                                                        href={child.href}
                                                                                        className={`block py-1 pl-1 ${childActive
                                                                                            ? "text-yellow-400"
                                                                                            : "text-gray-300 hover:text-yellow-500"
                                                                                            }`}
                                                                                        aria-current={childActive ? "page" : undefined}
                                                                                        onClick={closeAllMenus}
                                                                                    >
                                                                                        {child.label}
                                                                                    </Link>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <ul>
                                                            {(dropdown as (MenuLink | SubMenuItem)[]).map((link, lIdx) => {
                                                                const hasSubDropdown = 'subDropdown' in link && link.subDropdown;
                                                                const childActive = isActiveHref(link.href);
                                                                const subKey = `${key}-${lIdx}`;
                                                                
                                                                return (
                                                                    <li key={lIdx}>
                                                                        {hasSubDropdown ? (
                                                                            <div>
                                                                                <button
                                                                                    className={`flex justify-between items-center w-full py-2 pl-2 ${childActive
                                                                                        ? "text-yellow-400"
                                                                                        : "text-gray-300 hover:text-yellow-500"
                                                                                        }`}
                                                                                    onClick={() =>
                                                                                        setMobileSubDropdown(mobileSubDropdown === subKey ? null : subKey)
                                                                                    }
                                                                                >
                                                                                    {link.label}
                                                                                    <FiChevronDown className={`ml-1 transition-transform ${mobileSubDropdown === subKey ? "rotate-180" : ""}`} />
                                                                                </button>
                                                                                
                                                                                {/* Mobile Sub Dropdown */}
                                                                                {mobileSubDropdown === subKey && (
                                                                                    <ul className="pl-4 pt-1">
                                                                                        {link.subDropdown!.map((subLink, subIdx) => {
                                                                                            const subActive = isActiveHref(subLink.href);
                                                                                            return (
                                                                                                <li key={subIdx}>
                                                                                                    <Link
                                                                                                        href={subLink.href}
                                                                                                        className={`block py-2 pl-2 ${subActive
                                                                                                            ? "text-yellow-400"
                                                                                                            : "text-gray-300 hover:text-yellow-500"
                                                                                                            }`}
                                                                                                        aria-current={subActive ? "page" : undefined}
                                                                                                        onClick={closeAllMenus}
                                                                                                    >
                                                                                                        {subLink.label}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            );
                                                                                        })}
                                                                                    </ul>
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <Link
                                                                                href={link.href}
                                                                                className={`block py-2 pl-2 ${childActive
                                                                                    ? "text-yellow-400"
                                                                                    : "text-gray-300 hover:text-yellow-500"
                                                                                    }`}
                                                                                aria-current={childActive ? "page" : undefined}
                                                                                onClick={closeAllMenus}
                                                                            >
                                                                                {link.label}
                                                                            </Link>
                                                                        )}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Simple link
                                const simple = item as Extract<MenuItem, { href: string }>;
                                const simpleActive = isActiveHref(simple.href);
                                return (
                                    <Link
                                        key={idx}
                                        href={simple.href}
                                        className={`${linkBase} ${simpleActive ? "text-yellow-400" : "text-white"
                                            }`}
                                        aria-current={simpleActive ? "page" : undefined}
                                        onClick={closeAllMenus}
                                    >
                                        {simple.label}
                                    </Link>
                                );
                            })}

                            {/* Back to main website */}
                            <a
                                href={MAIN_SITE_URL}
                                className="inline-flex items-center rounded-md border border-yellow-400 px-3 py-1.5 text-sm text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                            >
                                {t("nav.mainSite")}
                            </a>

                            {/* Language */}
                            <div className="lg:block w-full lg:w-auto mt-1 lg:mt-0 flex items-center gap-3">
                                <LanguageToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

/** Helper */
function isGroupArray(arr: (MenuLink | MenuGroup | SubMenuItem)[]): arr is MenuGroup[] {
    return typeof (arr?.[0] as any)?.category === "string";
}

function isSubMenuItem(item: MenuLink | MenuGroup | SubMenuItem): item is SubMenuItem {
    return 'subDropdown' in item;
}
