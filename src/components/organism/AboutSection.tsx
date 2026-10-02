"use client";

import useSWR from "swr";
import { useI18n } from "@/i18n/useI18n";

type Setting = {
    id: number;
    web_title: string;
    web_description: string;
    address: string;
    maps_link?: string | null;
    phone: string;
    fax: string;
    email: string;
    created_at?: string;
    updated_at?: string;
};

// fetcher dengan bearer token + mengambil data.data
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
        return json.data as Setting[]; // hanya ambil bagian data
    });

export default function AboutSection() {
    const { t } = useI18n();
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 mb-16">
                    {/* Left Section - Image */}
                    <div className="w-full md:w-5/12 lg:w-1/2" data-aos="fade-right">
                        <div className="bg-neutral-800 p-6 md:p-8 lg:p-10 rounded-lg h-full flex items-center justify-center">
                            <img
                                src="/assets/sglogo.png"
                                alt="Tentang Kami - PT Solid Gold Berjangka"
                                className="w-full max-h-80 object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="w-full md:w-7/12 lg:w-1/2 text-left" data-aos="fade-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-500 uppercase tracking-wider">
                            {t("about.profileTitle")}
                        </h2>
                        <div className="space-y-6 text-white">
                            <p className="leading-relaxed">{t("home.profile.p1")}</p>
                            <p className="leading-relaxed">{t("home.profile.p2")}</p>
                        </div>
                    </div>    
                </div>

                {/* Visi Misi Section */}
                <div className="mx-auto bg-neutral-800/50 p-8 rounded-lg border border-neutral-600/30" data-aos="fade-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-500 text-center uppercase tracking-wider">
                        {t("about.visionMissionTitle")}
                    </h2>
                    
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-yellow-500/30 pb-2">
                                {t("home.mission")}
                            </h3>
                            <ul className="space-y-3 text-white pl-5">
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    <span>{t("home.mission.item1")}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    <span>{t("home.mission.item2")}</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-yellow-500/30 pb-2">
                                {t("home.vision")}
                            </h3>
                            <ul className="space-y-3 text-white pl-5">
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    <span>{t("home.vision.item1")}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-500 mr-2">•</span>
                                    <span>{t("home.vision.item2")}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 text-white">
                            <p>{t("about.visionClosing")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
