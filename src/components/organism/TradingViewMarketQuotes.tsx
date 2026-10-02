"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MarketUpdateCard from "@/components/moleculs/MarketUpdateCard";

type TradingViewSymbol = {
    name: string;
    displayName?: string;
};

type MarketFeedItem = {
    price_change?: string;
    price?: string;
    sell?: string;
    buy?: string;
    oprice?: string;
    hprice?: string;
    lprice?: string;
    time?: string;
    date_time?: string;
};

type MarketSnapshot = Record<string, MarketFeedItem>;

type TradingViewMarketQuotesProps = {
    className?: string;
    height?: number;
    locale?: "id" | "en";
    symbols?: TradingViewSymbol[];
};

type QuoteCard = {
    symbol: string;
    last: number;
    lastDisplay?: string;
    valueChange: number;
    percentChange: number;
    time?: string;
};

const DEFAULT_SYMBOLS: TradingViewSymbol[] = [
    { name: "XUL10", displayName: "XUL10 (GOLD)" },
    { name: "BCO10_BBJ", displayName: "BCO10_BBJ (BCO)" },
    { name: "HKK50_BBJ", displayName: "HKK50_BBJ (Hang Seng)" },
    { name: "JPK50_BBJ", displayName: "JPK50_BBJ (NIKKEI)" },
    { name: "AU1010_BBJ", displayName: "AU10F_BBJ (AUD/USD)" },
    { name: "EU1010_BBJ", displayName: "EU10F_BBJ (EUR/USD)" },
    { name: "GU1010_BBJ", displayName: "GU10F_BBJ (GBP/USD)" },
    { name: "UC1010_BBJ", displayName: "UC10F_BBJ (USD/CHF)" },
    { name: "UJ1010_BBJ", displayName: "UJ10F_BBJ (USD/JPY)" },
    { name: "UI1010_BBJ", displayName: "UI10F_BBJ (US30)" },
    { name: "DX1010_BBJ", displayName: "DX10F_BBJ (DXY)" },
];

const WS_URL = "wss://wsprc.royalassetindo.co.id";

const parseSnapshot = (message: string): MarketSnapshot | null => {
    if (!message || message === "Connected to WebSocket proxy") return null;

    try {
        const parsed = JSON.parse(message);

        if (parsed && typeof parsed === "object") {
            if ("data" in parsed && parsed.data && typeof parsed.data === "object") {
                return parsed.data as MarketSnapshot;
            }

            return parsed as MarketSnapshot;
        }
    } catch {
        return null;
    }

    return null;
};

const formatTimestamp = (value: string | undefined, locale: "id" | "en") => {
    if (!value) return "-";

    const date = new Date(value.replace(" ", "T"));
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString(locale === "id" ? "id-ID" : "en-US", {
        dateStyle: "medium",
        timeStyle: "medium",
        hour12: false,
        timeZone: "Asia/Jakarta",
    });
};

export default function TradingViewMarketQuotes({
    className = "",
    height = 500,
    locale = "en",
    symbols = DEFAULT_SYMBOLS,
}: TradingViewMarketQuotesProps) {
    const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
    const [connectionState, setConnectionState] = useState<"connecting" | "connected" | "reconnecting" | "error">(
        "connecting"
    );
    const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
    const reconnectTimerRef = useRef<number | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        let cancelled = false;
        let retryCount = 0;

        const clearReconnectTimer = () => {
            if (reconnectTimerRef.current !== null) {
                window.clearTimeout(reconnectTimerRef.current);
                reconnectTimerRef.current = null;
            }
        };

        const connect = () => {
            if (cancelled) return;

            clearReconnectTimer();
            setConnectionState((state) => (state === "connected" ? "connected" : "connecting"));

            const socket = new WebSocket(WS_URL);
            socketRef.current = socket;

            socket.onopen = () => {
                if (cancelled) return;
                retryCount = 0;
                setConnectionState("connected");
            };

            socket.onmessage = (event) => {
                if (cancelled) return;

                const payload = String(event.data);
                const nextSnapshot = parseSnapshot(payload);

                if (!nextSnapshot) return;

                setSnapshot(nextSnapshot);
                setLastUpdatedAt(new Date().toISOString());
            };

            socket.onerror = () => {
                if (cancelled) return;
                setConnectionState("error");
            };

            socket.onclose = () => {
                if (cancelled) return;

                setConnectionState("reconnecting");
                retryCount += 1;
                const delay = Math.min(1000 * 2 ** Math.min(retryCount, 4), 15000);

                reconnectTimerRef.current = window.setTimeout(connect, delay);
            };
        };

        connect();

        return () => {
            cancelled = true;
            clearReconnectTimer();

            if (socketRef.current && socketRef.current.readyState <= WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, []);

    const quoteCards = useMemo<QuoteCard[]>(() => {
        if (!snapshot) return [];

        return symbols.flatMap((symbol) => {
            const entry = snapshot[symbol.name];
            if (!entry?.price) return [];

            const last = Number(entry.price);
            const open = Number(entry.oprice);
            const valueChange = Number.isFinite(last) && Number.isFinite(open) ? last - open : 0;
            const percentChange = Number.isFinite(open) && open !== 0 ? (valueChange / open) * 100 : 0;

            return [
                {
                    symbol: symbol.displayName || symbol.name,
                    last: Number.isFinite(last) ? last : 0,
                    lastDisplay: entry.price,
                    valueChange,
                    percentChange,
                    time: entry.date_time || entry.time,
                },
            ];
        });
    }, [snapshot, symbols]);

    const updatedLabel = lastUpdatedAt
        ? new Date(lastUpdatedAt).toLocaleString(locale === "id" ? "id-ID" : "en-US", {
              dateStyle: "medium",
              timeStyle: "medium",
              hour12: false,
              timeZone: "Asia/Jakarta",
          })
        : "-";

    const statusLabel =
        connectionState === "connected"
            ? "Live"
            : connectionState === "reconnecting"
              ? "Reconnecting"
              : connectionState === "error"
                ? "Connection issue"
                : "Connecting";

    const statusClass =
        connectionState === "connected"
            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
            : connectionState === "error"
              ? "bg-red-500/15 text-red-300 border-red-500/30"
              : "bg-yellow-500/15 text-yellow-200 border-yellow-500/30";

    return (
        <div className={`w-full ${className}`} style={{ minHeight: height }}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950/70 px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                        {statusLabel}
                    </span>
                    <p className="text-sm text-neutral-300">Data live sedang aktif</p>
                </div>
                <p className="text-xs text-neutral-400">Last updated: {updatedLabel}</p>
            </div>

            {!snapshot || quoteCards.length === 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="min-h-[106px] rounded-lg border border-neutral-800 bg-neutral-900/80 p-4">
                            <div className="mb-3 h-5 w-1/2 animate-pulse rounded bg-neutral-700" />
                            <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-neutral-700" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-700" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {quoteCards.map((quote) => (
                        <div key={quote.symbol} className="rounded-lg shadow-lg">
                            <MarketUpdateCard quote={quote} />
                            <p className="mt-2 px-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                                {quote.time ? `Feed time ${formatTimestamp(quote.time, locale)}` : "Live feed"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
