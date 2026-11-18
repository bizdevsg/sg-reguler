import type { AppLocale, AppMessages } from "@/locales";

import type { LiveQuotePayload } from "./live-quote.shared";
import { LiveQuoteCard } from "./LiveQuoteCard";
import { ScrollReveal } from "./ScrollReveal";
import { SnapSlider } from "./SnapSlider";

type LiveQuoteCardsProps = {
  locale: AppLocale;
  mode: "compact" | "full";
  quotes: LiveQuotePayload;
  symbols: string[];
  fieldLabels: AppMessages["liveQuoteTable"]["fields"];
  sliderLabels: { region: string; previous: string; next: string };
};

export function LiveQuoteCards({
  locale,
  mode,
  quotes,
  symbols,
  fieldLabels,
  sliderLabels,
}: LiveQuoteCardsProps) {
  const isCompact = mode === "compact";

  const cards = symbols.map((symbol, index) => (
    <ScrollReveal
      key={symbol}
      className={isCompact ? "w-full shrink-0 snap-start" : undefined}
      effect="fade-up"
      delay={(isCompact ? index % 3 : index) * 100}
    >
      <LiveQuoteCard
        locale={locale}
        mode={mode}
        symbol={symbol}
        tick={quotes[symbol]}
        fieldLabels={fieldLabels}
      />
    </ScrollReveal>
  ));

  if (!isCompact) {
    return <div className="grid gap-4 md:hidden">{cards}</div>;
  }

  return (
    <SnapSlider
      label={sliderLabels.region}
      previousLabel={sliderLabels.previous}
      nextLabel={sliderLabels.next}
    >
      {cards}
    </SnapSlider>
  );
}
