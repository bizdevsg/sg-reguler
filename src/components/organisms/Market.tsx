import LiveQuotesTable from "./LiveQuotesTable";

type MarketProps = {
  className?: string;
  locale?: "id" | "en";
};

export default function Market({ className, locale = "id" }: MarketProps) {
  return (
    <section className={className}>
      <LiveQuotesTable locale={locale} />
    </section>
  );
}
