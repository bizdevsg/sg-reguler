// src/components/organism/HistoricalPivotHistory.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useI18n } from "@/i18n/useI18n";

type AnyRow = Record<string, unknown>;

type Row = {
  id: string;
  date?: string;
  symbol?: string;
  open?: unknown;
  high?: unknown;
  low?: unknown;
  close?: unknown;
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

function pickArray(raw: any): AnyRow[] {
  if (Array.isArray(raw)) return raw as AnyRow[];
  if (raw && Array.isArray(raw.data)) return raw.data as AnyRow[];
  if (raw && raw.data && Array.isArray(raw.data.data)) return raw.data.data as AnyRow[];
  return [];
}

function pickField(row: AnyRow, keys: string[]): unknown {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null) return row[key];
  }
  return undefined;
}

function parseApiDate(value: string | undefined): number {
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

function normalizeItem(item: AnyRow, symbol?: string, idx = 0): Row {
  const dateVal = pickField(item, ["date", "tanggal", "created_at", "createdAt", "updated_at", "updatedAt"]);
  const openVal = pickField(item, ["open", "buka"]);
  const highVal = pickField(item, ["high", "tertinggi"]);
  const lowVal = pickField(item, ["low", "terendah"]);
  const closeVal = pickField(item, ["close", "tutup"]);
  const symVal = pickField(item, ["symbol", "category", "kode", "code"]);
  const date = typeof dateVal === "string" ? dateVal : dateVal ? String(dateVal) : undefined;
  const sym = typeof symVal === "string" ? symVal : symbol;
  return {
    id: String((item as any).id ?? `${sym ?? "row"}-${date ?? "nodate"}-${idx}`),
    date,
    symbol: sym,
    open: openVal,
    high: highVal,
    low: lowVal,
    close: closeVal,
  };
}

function normalizeApi(raw: any): Row[] {
  if (!raw) return [];
  const rows: Row[] = [];
  const top = pickArray(raw);

    top.forEach((entry: AnyRow, i: number) => {
      if (Array.isArray(entry?.data)) {
      const symbol = String(entry?.symbol || entry?.category || "");
        entry.data.forEach((item: AnyRow, idx: number) => {
          rows.push(normalizeItem(item, symbol, idx));
        });
      return;
    }

    rows.push(normalizeItem(entry, undefined, i));
  });

  return rows;
}

function formatDate(value: string | undefined, locale: string): string {
  if (!value) return "-";
  const parsed = parseApiDate(value);
  const d = Number.isNaN(parsed) ? new Date(value) : new Date(parsed);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatNumber(value: unknown, locale: string): string {
  if (value === null || typeof value === "undefined") return "-";

  const raw = String(value).trim();
  if (!raw) return "-";

  // Keep decimal precision exactly as API provides while still adding locale grouping.
  const normalized = raw.replace(/\s/g, "").replace(/,/g, "");
  if (!/^[+-]?\d+(\.\d+)?$/.test(normalized)) return raw;

  const sign = normalized.startsWith("-") ? "-" : normalized.startsWith("+") ? "+" : "";
  const unsigned = sign ? normalized.slice(1) : normalized;
  const [intPart, fracPart] = unsigned.split(".");
  const thousandsSep = locale === "en" ? "," : ".";
  const decimalSep = locale === "en" ? "." : ",";

  const groupedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
  return fracPart !== undefined ? `${sign}${groupedInt}${decimalSep}${fracPart}` : `${sign}${groupedInt}`;
}

const FILTERS = [
  "LGD Daily",
  "BCO Daily",
  "HSI Daily",
  "SNI Daily",
  "AUD/USD",
  "EUR/USD",
  "GBP/USD",
  "USD/CHF",
  "USD/JPY",
] as const;

type FilterType = (typeof FILTERS)[number];

const ALIAS: Record<string, string> = {
  "lgs daily": "lgd daily",
};

const NOTES: Partial<Record<FilterType, string>> = {
  "LGD Daily": "Senin - Jum'at (Summer : 06:00 - 03:30 WIB, Winter : 06:00 - 04:30 WIB)",
  "BCO Daily": "Senin - Jum'at (Summer : 07:00 - 03:45 WIB, Winter : 08:00 - 03:45 WIB)",
  "HSI Daily": "Senin - Jum'at (08:15 - 11:00 WIB, 12:00 - 15:30 WIB, 16:15 - 02:00 WIB*)",
  "SNI Daily": "Senin - Jum'at (Sesi I : 06:30 - 13:55 WIB, Sesi II : 14:10 - 03:45 WIB)",
  "USD/JPY": "Senin - Jumat (Summer: 07:00-03:00 WIB, Winter: 07:00-04:00 WIB)",
  "USD/CHF": "Senin - Jumat (Summer: 07:00-03:00 WIB, Winter: 07:00-04:00 WIB)",
  "GBP/USD": "Senin - Jumat (Summer: 07:00-03:00 WIB, Winter: 07:00-04:00 WIB)",
  "EUR/USD": "Senin - Jumat (Summer: 07:00-03:00 WIB, Winter: 07:00-04:00 WIB)",
  "AUD/USD": "Senin - Jumat (Summer: 07:00-03:00 WIB, Winter: 07:00-04:00 WIB)",
};

function buildPageInfo(locale: string, from: number, to: number, total: number) {
  if (locale === "en") return `Showing ${from}-${to} of ${total} data`;
  return `Menampilkan ${from} - ${to} dari ${total} data`;
}

export default function HistoricalPivotHistory() {
  const { t, locale } = useI18n();
  const { data, error, isLoading, mutate } = useSWR(API_URL, fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    keepPreviousData: true,
  });

  const rows = useMemo(() => {
    const arr = normalizeApi(data);
    return arr
      .slice()
      .sort((a, b) => {
        const ta = parseApiDate(a.date);
        const tb = parseApiDate(b.date);
        return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
      });
  }, [data]);

  const [activeFilter, setActiveFilter] = useState<FilterType>(FILTERS[0]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, dateFrom, dateTo]);

  const filteredRows = useMemo(() => {
    if (rows.length === 0) return [] as Row[];

    const hasSymbol = rows.some((r) => !!r.symbol);
    let list = rows;

    if (hasSymbol) {
      const targetRaw = activeFilter.toLowerCase();
      const target = (ALIAS[targetRaw] ?? targetRaw).trim();
      list = list.filter((r) => (r.symbol || "").toLowerCase().trim() === target);
    }

    if (dateFrom) {
      const start = new Date(`${dateFrom}T00:00:00`).getTime();
      list = list.filter((r) => {
        const t = parseApiDate(r.date);
        return Number.isNaN(t) ? true : t >= start;
      });
    }

    if (dateTo) {
      const end = new Date(`${dateTo}T23:59:59`).getTime();
      list = list.filter((r) => {
        const t = parseApiDate(r.date);
        return Number.isNaN(t) ? true : t <= end;
      });
    }

    return list;
  }, [rows, activeFilter, dateFrom, dateTo]);

  const pageSize = 10;
  const total = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = total === 0 ? 0 : (currentPage - 1) * pageSize;
  const pageRows = filteredRows.slice(startIndex, startIndex + pageSize);
  const from = total === 0 ? 0 : startIndex + 1;
  const to = total === 0 ? 0 : Math.min(startIndex + pageSize, total);

  const pages = useMemo(() => {
    const maxButtons = 5;
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - maxButtons + 1));
    const count = Math.min(totalPages, maxButtons);
    return Array.from({ length: count }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const activeNote = NOTES[activeFilter];

  const handleReset = () => {
    setActiveFilter(FILTERS[0]);
    setDateFrom("");
    setDateTo("");
  };

  const handlePdf = async () => {
    if (pageRows.length === 0) return;
    const [{ default: jsPDF }, autoTableMod] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);
    const autoTable = (autoTableMod as any).default || autoTableMod;

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const title = t("history.title");
    const instrumentLabel = locale === "en" ? "Instrument" : "Instrumen";
    const pageLabel = "Page";

    const drawHeader = (pageNumber: number, totalPages: number) => {
      const pageWidth = doc.internal.pageSize.getWidth();
      // Clear header band to avoid overlaps when re-drawing.
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, 22, "F");
      doc.setFontSize(12);
      doc.text(title, pageWidth / 2, 14, { align: "center" });
      doc.setFontSize(9);
      doc.text(`${instrumentLabel}: ${activeFilter}`, 14, 18);
      doc.text(`${pageLabel} ${pageNumber} of ${totalPages}`, pageWidth - 14, 18, {
        align: "right",
      });
    };

    const watermarkDataUrl = await (async () => {
      try {
        const res = await fetch("/assets/logo-sgb-watermark.png");
        const blob = await res.blob();
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(blob);
        });
      } catch {
        return "";
      }
    })();
    const watermarkSize = await (async () => {
      if (!watermarkDataUrl) return { w: 0, h: 0 };
      return await new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.naturalWidth || img.width, h: img.naturalHeight || img.height });
        img.onerror = () => resolve({ w: 0, h: 0 });
        img.src = watermarkDataUrl;
      });
    })();

    const head = [["Tanggal", "Buka", "Tertinggi", "Terendah", "Tutup"]];
    const body = pageRows.map((r) => [
      formatDate(r.date, locale),
      formatNumber(r.open, locale),
      formatNumber(r.high, locale),
      formatNumber(r.low, locale),
      formatNumber(r.close, locale),
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 24,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 18, 64], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      didDrawPage: () => {
        if (!watermarkDataUrl) return;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const baseWidth = 260;
        const ratio =
          watermarkSize.w > 0 && watermarkSize.h > 0 ? watermarkSize.h / watermarkSize.w : 0.4;
        const wmWidth = baseWidth;
        const wmHeight = Math.max(1, Math.round(baseWidth * ratio));
        const x = (pageWidth - wmWidth) / 2;
        const y = (pageHeight - wmHeight) / 2;
        const gs = new (doc as any).GState({ opacity: 0.14 });
        doc.setGState(gs);
        doc.addImage(watermarkDataUrl, "PNG", x, y, wmWidth, wmHeight, undefined, "NONE");
        doc.setGState(new (doc as any).GState({ opacity: 1 }));
      },
    });

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    const pdfPages =
      typeof (doc as any).getNumberOfPages === "function"
        ? (doc as any).getNumberOfPages()
        : (doc as any).internal?.getNumberOfPages?.() ?? 1;
    for (let i = 1; i <= pdfPages; i += 1) {
      doc.setPage(i);
      drawHeader(i, totalPages);
    }

    const safeProduct = activeFilter
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    const filename = `historical-data-${safeProduct}-${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
  };


  return (
    <div className="w-full mb-8">
      <div className="mb-6 text-center">
        <h2 className="text-white text-2xl font-semibold">{t("history.title")}</h2>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as FilterType)}
              className="min-w-[180px] rounded border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {FILTERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <span>s/d</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded border border-emerald-500 px-3 py-2 text-xs text-emerald-300 hover:bg-emerald-500/10"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handlePdf}
              className="rounded bg-emerald-500 px-3 py-2 text-xs text-white hover:bg-emerald-400"
            >
              Unduh PDF
            </button>
            <button
              type="button"
              onClick={() => mutate()}
              className="rounded border border-yellow-500 px-3 py-2 text-xs text-yellow-300 hover:bg-yellow-500/10"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-auto rounded-lg border border-neutral-300 bg-white relative">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
          <img
            src="/assets/logo-sgb-watermark.png"
            alt="Watermark"
            className="w-[640px] opacity-6"
          />
        </div>
        <table className="min-w-[900px] w-full text-sm text-neutral-900 relative z-10">
          <thead className="bg-neutral-100 text-neutral-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">{t("history.date")}</th>
              <th className="px-4 py-3 text-right">{t("history.open")}</th>
              <th className="px-4 py-3 text-right">{t("history.high")}</th>
              <th className="px-4 py-3 text-right">{t("history.low")}</th>
              <th className="px-4 py-3 text-right">{t("history.close")}</th>
            </tr>
          </thead>
          <tbody className="text-neutral-900">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={`sk-${i}`} className="animate-pulse border-t border-neutral-200">
                  <td className="px-4 py-3" colSpan={5}>
                    <div className="h-4 w-40 rounded bg-neutral-200" />
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-600">
                  {t("history.error")}
                </td>
              </tr>
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-600">
                  {t("history.empty", { category: activeFilter })}
                </td>
              </tr>
            ) : (
              pageRows.map((r) => (
                <tr key={r.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="px-4 py-3">{formatDate(r.date, locale)}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(r.open, locale)}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(r.high, locale)}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(r.low, locale)}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(r.close, locale)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex flex-col gap-3 border-t border-neutral-200 p-4 text-sm text-neutral-700 md:flex-row md:items-center md:justify-between relative z-10">
          <div>{buildPageInfo(locale, from, to, total)}</div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 w-8 rounded border border-neutral-700 text-neutral-300 hover:bg-neutral-800"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {pages.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`h-8 w-8 rounded border ${
                  p === currentPage
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                    : "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 w-8 rounded border border-neutral-700 text-neutral-300 hover:bg-neutral-800"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {activeNote ? (
        <div className="mt-5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
          <div className="font-semibold text-emerald-300">Catatan Jam Perdagangan {activeFilter}</div>
          <ul className="mt-1 list-disc pl-4">
            <li>{activeNote}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
