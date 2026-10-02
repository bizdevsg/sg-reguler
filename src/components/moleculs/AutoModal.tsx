"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";

export default function AutoModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useI18n();

    // Tampilkan modal otomatis saat halaman dibuka
    useEffect(() => {
        setModalOpen(true);
    }, []);

    // Disable scroll saat modal terbuka
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [modalOpen]);

    const closeModal = () => setModalOpen(false);

    return (
        <div>
            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-[92vw] sm:max-w-lg p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // klik di dalam modal tidak menutup
                    >
                        {/* Tombol Close di pojok kanan atas */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-lg font-bold cursor-pointer"
                            aria-label="Close Modal"
                        >
                            x
                        </button>

                        <div className="space-y-3">
                            {/* Judul */}
                            <h2 className="text-xl sm:text-2xl text-center text-yellow-500 font-bold mb-4">
                                {t("modal.title")}
                            </h2>
                            {/* Gambar */}
                            <Image
                                src="/assets/mobile.jpg"
                                alt="App"
                                width={1587}
                                height={2245}
                                className="w-full max-w-[220px] sm:max-w-[280px] mx-auto rounded-lg"
                                sizes="(max-width: 640px) 220px, 280px"
                            />
                            {/* Deskripsi */}
                            <p className="text-center text-gray-700 mb-4 px-1 sm:px-2 text-sm sm:text-base">
                                {t("modal.desc")}
                            </p>
                            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.royalassetindo.protrader&pcampaignid=web_share"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center"
                                >
                                    <span className="flex items-center justify-center h-9 w-28 sm:h-10 sm:w-32 overflow-hidden">
                                        <Image
                                            src="/assets/logo-google-play-2.png"
                                            alt={t("modal.playStore")}
                                            width={935}
                                            height={277}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </span>
                                </a>
                                <a
                                    href="https://apps.apple.com/id/app/pro-trader-royalassetindo/id6502900138"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center"
                                >
                                    <span className="flex items-center justify-center h-9 w-28 sm:h-10 sm:w-32 overflow-hidden">
                                        <Image
                                            src="/assets/logo-app-store-2.png"
                                            alt={t("modal.appStore")}
                                            width={646}
                                            height={250}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
