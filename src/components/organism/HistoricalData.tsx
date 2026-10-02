// src/components/organism/HistoricalDataTable.tsx
"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/useI18n";

type Row = {
    id: number;
    tanggal: string;
    open: string;
    high: string;
    low: string;
    close: string;
    category: string;
    created_at?: string;
    updated_at?: string;
};

const API_URL = "/api/pivot-history";

const MONTHS: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
};

const fetcher = (url: string) =>
    fetch(url, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
        return r.json();
    });

// Convert API baru ke Row[]
function normalizeApi(raw: any): Row[] {
    const rows: Row[] = [];

    if (!raw || !Array.isArray(raw.data)) return rows;

    raw.data.forEach((entry: any, index: number) => {
        if (Array.isArray(entry?.data)) {
            const symbol = entry.symbol ?? entry.category ?? "";
            entry.data.forEach((item: any, itemIndex: number) => {
                rows.push({
                    id: item.id ?? `${symbol}-${item.date ?? item.tanggal ?? itemIndex}`,
                    tanggal: item.date ?? item.tanggal,
                    open: item.open == null ? "-" : String(item.open),
                    high: item.high == null ? "-" : String(item.high),
                    low: item.low == null ? "-" : String(item.low),
                    close: item.close == null ? "-" : String(item.close),
                    category: String(symbol),
                    created_at: item.createdAt ?? item.created_at,
                    updated_at: item.updatedAt ?? item.updated_at,
                });
            });
            return;
        }

        rows.push({
            id: entry.id ?? index + 1,
            tanggal: entry.date ?? entry.tanggal,
            open: entry.open == null ? "-" : String(entry.open),
            high: entry.high == null ? "-" : String(entry.high),
            low: entry.low == null ? "-" : String(entry.low),
            close: entry.close == null ? "-" : String(entry.close),
            category: String(entry.symbol ?? entry.category ?? ""),
            created_at: entry.createdAt ?? entry.created_at,
            updated_at: entry.updatedAt ?? entry.updated_at,
        });
    });

    return rows;
}

function parseApiDate(value?: string): number {
    if (!value) return Number.NaN;

    const direct = Date.parse(value);
    if (!Number.isNaN(direct)) return direct;

    const match = value.trim().match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
    if (!match) return Number.NaN;

    const [, d, mon, y] = match;
    const month = MONTHS[mon.toLowerCase()];
    if (month === undefined) return Number.NaN;

    return Date.UTC(Number(y), month, Number(d));
}

const numFmtFactory = (locale: string) =>
    new Intl.NumberFormat(locale === "en" ? "en-US" : "id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
const dateFmtFactory = (locale: string) => (s?: string) => {
    if (!s) return "-";
    const parsed = parseApiDate(s);
    const d = Number.isNaN(parsed) ? new Date(s) : new Date(parsed);
    return Number.isNaN(d.getTime())
        ? s
        : d.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
};

// Tanpa "All"
const FILTERS = [
    "LGD Daily",
    "BCO Daily",
    "LSI Daily",
    "HSI Daily",
    "SNI Daily",
    "AUD/USD",
    "EUR/USD",
    "GBP/USD",
    "USD/CHF",
    "USD/JPY",
] as const;
type FilterType = (typeof FILTERS)[number];

// Alias supaya tetap nyambung
const ALIAS: Record<string, string> = {
    "lgs daily": "lgd daily",
};

export default function HistoricalDataTable() {
    const { t, locale } = useI18n();
    const DEFAULT_FILTER: FilterType = "LGD Daily";
    const [activeFilter, setActiveFilter] = useState<FilterType>(DEFAULT_FILTER);
    const numFmt = useMemo(() => numFmtFactory(locale), [locale]);
    const dateFmt = useMemo(() => dateFmtFactory(locale), [locale]);

    const { data, error, isLoading, mutate } = useSWR<unknown>(API_URL, fetcher, {
        refreshInterval: 60_000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        keepPreviousData: true,
    });

    const rows: Row[] = useMemo(() => {
        const arr = normalizeApi(data);
        return arr
            .slice()
            .sort((a, b) => {
                const ta = parseApiDate(a.tanggal);
                const tb = parseApiDate(b.tanggal);
                return (isNaN(tb) ? 0 : tb) - (isNaN(ta) ? 0 : ta);
            });
    }, [data]);

    const filteredRows = useMemo(() => {
        const targetRaw = activeFilter.toLowerCase();
        const target = (ALIAS[targetRaw] ?? targetRaw).trim();
        return rows.filter(
            (r) => (r.category || "").toLowerCase().trim() === target
        );
    }, [rows, activeFilter]);

    const limitedRows = filteredRows.slice(0, 5);

    return (
        <div className="w-full mb-4">
            {/* Header & Controls */}
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-white font-semibold text-lg">{t("history.title")}</h2>
                <div className="flex items-center gap-2">
                    {/* Dropdown filter */}
                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value as FilterType)}
                        className="px-3 py-1.5 text-sm rounded border border-neutral-600 bg-neutral-900 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        {FILTERS.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto rounded border border-neutral-800">
                <table className="min-w-[720px] w-full text-sm">
                    <thead className="bg-neutral-900/70 text-neutral-300">
                        <tr>
                            <th className="px-3 py-2 text-left">{t("history.date")}</th>
                            <th className="px-3 py-2 text-right">{t("history.open")}</th>
                            <th className="px-3 py-2 text-right">{t("history.high")}</th>
                            <th className="px-3 py-2 text-right">{t("history.low")}</th>
                            <th className="px-3 py-2 text-right">{t("history.close")}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-neutral-900/40 text-white">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <tr key={`sk-${i}`} className="animate-pulse">
                                    <td className="px-3 py-2">
                                        <div className="h-4 w-24 bg-neutral-700 rounded" />
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <div className="h-4 w-16 bg-neutral-700 rounded inline-block" />
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <div className="h-4 w-16 bg-neutral-700 rounded inline-block" />
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <div className="h-4 w-16 bg-neutral-700 rounded inline-block" />
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <div className="h-4 w-16 bg-neutral-700 rounded inline-block" />
                                    </td>
                                </tr>
                            ))
                        ) : error ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-3 py-6 text-center text-red-400"
                                >
                                    {t("history.error")}
                                </td>
                            </tr>
                        ) : limitedRows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-3 py-6 text-center text-neutral-300"
                                >
                                    {t("history.empty", { category: activeFilter })}
                                </td>
                            </tr>
                        ) : (
                            limitedRows.map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-t border-neutral-800 hover:bg-neutral-800/40"
                                >
                                    <td className="px-3 py-2">{dateFmt(r.tanggal)}</td>
                                    <td className="px-3 py-2 text-right">
                                        {numFmt.format(parseFloat(r.open))}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        {numFmt.format(parseFloat(r.high))}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        {numFmt.format(parseFloat(r.low))}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        {numFmt.format(parseFloat(r.close))}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
