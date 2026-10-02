import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

interface Quote {
    symbol: string;
    last: number;
    lastDisplay?: string;
    valueChange: number;
    percentChange: number;
}

interface Props {
    quote: Quote;
}

const getFractionDigits = (reference: number) => {
    const abs = Math.abs(reference);

    if (abs >= 1000) return 2;
    if (abs >= 100) return 3;
    if (abs >= 1) return 4;
    return 4;
};

const formatValue = (value: number, reference: number) =>
    value.toLocaleString("en-US", {
        minimumFractionDigits: getFractionDigits(reference),
        maximumFractionDigits: getFractionDigits(reference),
    });

const formatPriceLabel = (raw: string | undefined, fallback: number) => {
    if (!raw) return formatValue(fallback, fallback);

    const numeric = Number(raw);
    if (!Number.isFinite(numeric)) return raw;

    const decimals = raw.includes(".") ? Math.min(Math.max(raw.split(".")[1]?.length ?? 0, 2), 4) : 0;

    return numeric.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export default function MarketUpdateCard({ quote }: Props) {
    const isUp = quote.valueChange >= 0;
    const priceLabel = formatPriceLabel(quote.lastDisplay, quote.last);
    const changeLabel = formatValue(quote.valueChange, quote.last);

    return (
        <div
            className="bg-cover bg-center rounded-lg overflow-hidden min-w-[220px] mx-2"
            style={{ backgroundImage: "url('/assets/bg_welcome.png')" }}
        >
            <div className="flex h-full items-center justify-between gap-3 text-white bg-black/50 p-4">
                {/* Harga dan persentase */}
                <div className="text-left">
                    <h5 className="text-xl font-bold">{quote.symbol}</h5>
                    <p>{priceLabel}</p>
                    <p className={isUp ? "text-green-400 font-medium text-sm" : "text-red-400 font-medium text-sm"}>
                        {isUp ? "+" : ""}{changeLabel} ({quote.percentChange.toFixed(2)}%)
                    </p>
                </div>

                {/* Ikon arah naik/turun */}
                <div className={`flex items-center justify-center ${isUp ? "bg-green-500" : "bg-red-500"} rounded p-2`}>
                    {isUp ? <FaChevronUp className="text-white text-2xl" /> : <FaChevronDown className="text-white text-2xl" />}
                </div>
            </div>
        </div>
    );
}
