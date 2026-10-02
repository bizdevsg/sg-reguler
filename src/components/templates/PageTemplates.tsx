"use client";

import Head from "next/head";
import Script from "next/script";
import { FooterSection } from "../organism/FooterSection";
import Navbar from "../organism/Navbar";
import LiveChat from "../atoms/LiveChat";
import { useState, useEffect } from "react";
import Router from "next/router";
import { DataLoaderProvider, useDataLoader } from "@/providers/DataLoaderProvider";
import TradingView from "../organism/TradingView";
import LanguageToggle from "../atoms/LanguageToggle";
import { useI18n } from "@/i18n/useI18n";

// Live chat (Tawk.to) sementara dimatikan.
// Untuk nyalain lagi tanpa ubah kode: set env `NEXT_PUBLIC_ENABLE_LIVE_CHAT=true` lalu rebuild.
const ENABLE_LIVE_CHAT = process.env.NEXT_PUBLIC_ENABLE_LIVE_CHAT === "true";

interface PageTemplatesProps {
    title?: string;
    children?: React.ReactNode;
}

// --- Overlay terpisah biar reuse ---
function GlobalLoadingOverlay({ active }: { active: boolean }) {
    const { t } = useI18n();
    return (
        <div
            className={`pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center 
                  bg-background transition-opacity duration-300
                  ${active ? "opacity-100" : "opacity-0"}`}
            aria-live="polite"
            aria-busy={active}
        >
            <div className="pointer-events-auto flex flex-col items-center gap-4">
                <div className="border-4 border-neutral-700 border-t-yellow-400 rounded-full w-12 h-12 animate-spin" />
                <p className="text-sm text-neutral-300">{t("common.loading")}</p>
            </div>
        </div>
    );
}

// --- Konten halaman yang memakai gate loading ---
function PageInner({ children, title }: PageTemplatesProps) {
    const [navHeight, setNavHeight] = useState(96);
    const [routing, setRouting] = useState(false);
    const { pendingCount } = useDataLoader();
    const [initialLoading, setInitialLoading] = useState(true);

    // hitung tinggi navbar
    useEffect(() => {
        const updateNavHeight = () => {
            const navEl = document.querySelector("nav");
            if (navEl) setNavHeight(navEl.getBoundingClientRect().height || 96);
        };
        updateNavHeight();
        window.addEventListener("resize", updateNavHeight);
        return () => window.removeEventListener("resize", updateNavHeight);
    }, []);

    // deteksi pindah route (Pages Router)
    useEffect(() => {
        const handleStart = () => {
            setRouting(true);
            document.body.classList.add("overflow-hidden");
        };
        const handleEnd = () => {
            setRouting(false);
        };
        Router.events.on("routeChangeStart", handleStart);
        Router.events.on("routeChangeComplete", handleEnd);
        Router.events.on("routeChangeError", handleEnd);
        return () => {
            Router.events.off("routeChangeStart", handleStart);
            Router.events.off("routeChangeComplete", handleEnd);
            Router.events.off("routeChangeError", handleEnd);
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    // Matikan initial loading ketika tidak routing & tidak ada pending fetch.
    useEffect(() => {
        if (!routing && pendingCount === 0) {
            const t = setTimeout(() => setInitialLoading(false), 200);
            return () => clearTimeout(t);
        } else {
            // kalau ada routing atau pending lagi, pastikan overlay aktif kembali
            setInitialLoading(true);
        }
    }, [routing, pendingCount]);

    // overlay aktif jika: awal render / ada routing / ada request pending
    const showOverlay = initialLoading || routing || pendingCount > 0;

    // lock/unlock scroll mengikuti overlay
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", showOverlay);
        return () => document.body.classList.remove("overflow-hidden");
    }, [showOverlay]);

    return (
        <>
            <Head>
                <title>{title} - PT. Solid Gold Berjangka</title>
                <link rel="icon" type="image/png" href="/icon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/icon/favicon.svg" />
                <meta name="apple-mobile-web-app-title" content="SGB" />
                <link rel="manifest" href="/icon/site.webmanifest" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            {/* Global Loading Overlay */}
            <GlobalLoadingOverlay active={showOverlay} />

            {/* Main Content with Adjusted Scroll */}
            <div
                className={`min-h-screen overflow-x-hidden ${showOverlay ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
            >
                <Navbar />
                <div style={{ marginTop: navHeight }}>
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                        <div className="space-y-10">{children}</div>
                    </main>

                    {/* Wrap TradingView and Footer inside Fade-up to prevent double scroll */}
                    <div>
                        <TradingView />
                        <FooterSection />
                    </div>
                </div>
            </div>

            {/* <LanguageToggle /> */}

            <LiveChat />

            {/* Live chat (Tawk.to) - sementara dihilangkan, kodenya tetap ada */}
            {ENABLE_LIVE_CHAT && (
                <Script
                    id="tawk-to"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                            (function(){
                                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                                s1.async=true;
                                s1.src='https://embed.tawk.to/689ee66f35c68d1927d54cb8/1j2mb89if';
                                s1.charset='UTF-8';
                                s1.setAttribute('crossorigin','*');
                                s0.parentNode.insertBefore(s1,s0);
                            })();
                        `,
                    }}
                />
            )}
        </>
    );
}

// --- Export utama: bungkus dengan provider ---
export default function PageTemplates(props: PageTemplatesProps) {
    return (
        <DataLoaderProvider>
            <PageInner {...props} />
        </DataLoaderProvider>
    );
}
