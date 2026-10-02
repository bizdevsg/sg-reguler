// components/ReadMore.tsx
"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";

interface ReadMoreProps {
  kategoriSlug: string; // terima kategoriSlug sebagai prop
}

// mapping kategoriSlug → URL
const readMoreUrlMap: Record<string, string> = {
  indexNews: "https://www.newsmaker.id/index.php/en/market-news/index",
  commodityNews: "https://www.newsmaker.id/index.php/en/market-news/commodity",
  currenciesNews: "https://www.newsmaker.id/index.php/en/market-news/currencies",
  economicNews: "https://www.newsmaker.id/index.php/en/economic-news/economy",
  analisisMarket: "https://www.newsmaker.id/index.php/en/analysis/analysis-market",
  analisisOpini: "https://www.newsmaker.id/index.php/en/analysis/analysis-opinion",
  fiscalMoneter: "https://www.newsmaker.id/index.php/en/economic-news/fiscal-moneter"
};

export default function ReadMore({ kategoriSlug }: ReadMoreProps) {
  const { t } = useI18n();
  const url = readMoreUrlMap[kategoriSlug] ?? "#"; // fallback jika slug tidak ada
  return (
    <Link
      className="btn-primary w-fit px-5 py-3 rounded-lg inline-block"
      href={url}
      target="_blank" // opsional: buka tab baru
      rel="noopener noreferrer"
    >
      {t("news.readMoreCta")}
    </Link>
  );
}
