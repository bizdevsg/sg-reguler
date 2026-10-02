import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";

export default function Banner() {
    const { t } = useI18n();
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">

                {/* Image Section */}
                <div className="flex-shrink-0 order-1 lg:order-2" data-aos="fade-left">
                    <Image
                        src="/assets/People-SGB.png"
                        alt="Banner"
                        width={2509}
                        height={2619}
                        className="max-w-md w-full h-auto object-contain"
                        sizes="(max-width: 1024px) 100vw, 28rem"
                        priority
                    />
                </div>

                {/* Text Section */}
                <div className="text-center max-w-lg order-2 lg:order-1 md:-translate-x-2" data-aos="fade-right">
                    <p className="text-lg text-yellow-500 font-semibold mb-2">
                        {t("banner.company")}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t("banner.member")}
                    </p>
                    {/* Buttons */}
                    <div className="mt-8 flex flex-col md:flex-row justify-center gap-3 px-4">
                        <Link
                            href="https://regol.solidgold.co.id/" target="_blank"
                            className="btn-primary px-4 py-3 rounded-xl text-center shadow text-sm md:text-base whitespace-nowrap"
                        >
                            {t("banner.regol")}
                        </Link>
                        <Link
                            href="https://etrade.sgberjangka.com/login" target="_blank"
                            className="btn-primary px-4 py-3 rounded-xl text-center shadow text-sm md:text-base whitespace-nowrap"
                        >
                            {t("banner.live")}
                        </Link>
                        <Link
                            href="https://demo.sgberjangka.com/login" target="_blank"
                            className="btn-primary px-4 py-3 rounded-xl text-center shadow text-sm md:text-base whitespace-nowrap"
                        >
                            {t("banner.demo")}
                        </Link>
                    </div>
                </div>

            </div>
        </div >
    );
}
