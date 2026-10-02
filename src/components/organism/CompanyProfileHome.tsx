"use client";

import Link from "next/link";
import Image from "next/image";
import { FiCheckCircle, FiEye, FiTarget } from "react-icons/fi";
import { useI18n } from "@/i18n/useI18n";

export default function CompanyProfileHome() {
    const { t } = useI18n();
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12" data-aos="fade-up">
            <div className="max-w-6xl mx-auto mb-8 text-center">
                <p className="text-yellow-500 font-semibold uppercase text-sm md:text-base">
                    {t("home.aboutLabel")}
                </p>
                <h2 className="text-white font-bold text-xl md:text-2xl">
                    {t("home.companyProfile")}
                </h2>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="order-2 lg:order-2">
                    <div className="space-y-5 text-gray-300 leading-relaxed">
                        <p>{t("home.profile.p1")}</p>
                        <p>{t("home.profile.p2")}</p>

                        <div className="pt-2 space-y-5">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-yellow-500 text-lg">
                                        <FiTarget />
                                    </span>
                                    <h3 className="text-white font-semibold">{t("home.mission")}</h3>
                                </div>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <FiCheckCircle className="text-yellow-500 mt-1" />
                                        <span>{t("home.mission.item1")}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FiCheckCircle className="text-yellow-500 mt-1" />
                                        <span>{t("home.mission.item2")}</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-yellow-500 text-lg">
                                        <FiEye />
                                    </span>
                                    <h3 className="text-white font-semibold">{t("home.vision")}</h3>
                                </div>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <FiCheckCircle className="text-yellow-500 mt-1" />
                                        <span>{t("home.vision.item1")}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FiCheckCircle className="text-yellow-500 mt-1" />
                                        <span>{t("home.vision.item2")}</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="mt-6 flex justify-center lg:justify-start">
                        <Link
                            href="/tentang-kami/profil"
                            className="btn-primary inline-flex items-center justify-center px-5 py-2 rounded"
                        >
                            {t("common.learnMore")}
                        </Link>
                    </div>
                </div>

                <div className="order-1 lg:order-1 self-start">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex items-center justify-center">
                        <Image
                            src="/assets/TCC TOWER SGB.png"
                            alt="TCC Tower - Solid Gold Berjangka"
                            width={729}
                            height={1029}
                            className="w-full max-w-md h-auto object-contain"
                            sizes="(max-width: 1024px) 100vw, 28rem"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}
