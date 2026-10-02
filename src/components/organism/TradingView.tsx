import { useI18n } from "@/i18n/useI18n";

export default function TradingView() {
    const { t } = useI18n();
    return (
        <div className="w-full bg-linear-to-r from-background to-zinc-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12">
                <div className="w-full grow">
                    <img
                        src="/assets/TradingView.png"
                        alt="TradingView"
                        className="w-50 object-contain"
                    />
                    <p className="mt-4 text-justify">
                        {t("tradingview.desc.pre")}
                        <a
                            href="https://www.tradingview.com/symbols/EURUSD/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300"
                        >
                            {t("tradingview.desc.link")}
                        </a>
                        {t("tradingview.desc.post")}
                    </p>
                </div>
            </div>
        </div>
    );
}
