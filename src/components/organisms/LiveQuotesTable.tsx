import TradingViewMarketQuotes from "./TradingViewMarketQuotes";

type LiveQuotesTableProps = {
  className?: string;
  height?: number;
  locale?: "id" | "en";
};

export default function LiveQuotesTable({ className, height = 500, locale = "id" }: LiveQuotesTableProps) {
  return <TradingViewMarketQuotes className={className} height={height} locale={locale} />;
}
