"use client";

import { useI18n } from "@/i18n/useI18n";
import TradingViewMarketQuotes from "@/components/organism/TradingViewMarketQuotes";

export default function MarketUpdate() {
  const { t } = useI18n();

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{t("nav.products.liveQuote")}</h2>
        <p className="text-sm text-neutral-400">
          Dapatkan update terbaru pasangan mata uang, komoditas, dan indeks.
        </p>
      </div>
      <TradingViewMarketQuotes height={460} locale="en" />
    </section>
  );
}
