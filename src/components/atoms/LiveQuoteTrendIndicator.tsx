import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getMessages, type AppLocale } from "@/locales";

type LiveQuoteTrendIndicatorProps = {
  direction: string;
  locale: AppLocale;
};

const trendStyles = {
  up: {
    className:
      "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20",
  },
  down: {
    className: "text-rose-400 bg-rose-400/10 border border-rose-400/20",
  },
  neutral: {
    className: "text-white/58 bg-white/10 border border-white/20",
  },
} as const;

function getTrendKey(direction: string) {
  if (direction === "up") {
    return "up";
  }

  if (direction === "down") {
    return "down";
  }

  return "neutral";
}

export function LiveQuoteTrendIndicator({
  direction,
  locale,
}: LiveQuoteTrendIndicatorProps) {
  const trendLabels = getMessages(locale).liveQuoteTable.trend;
  const trendKey = getTrendKey(direction);
  const trend = trendStyles[trendKey];
  const label = trendLabels[trendKey];

  return (
    <div
      aria-label={label}
      title={label}
      className={`text-xs uppercase tracking-[0.18em] p-1 rounded-full ${trend.className}`}
    >
      {trendKey === "up" && <TrendingUp className="h-3 w-3" />}
      {trendKey === "down" && <TrendingDown className="h-3 w-3" />}
      {trendKey === "neutral" && <Minus className="h-3 w-3" />}
    </div>
  );
}
