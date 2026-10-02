// File: @/components/organism/PivotFibonacci.tsx
import React, { useMemo, useState } from "react";
import { useI18n } from "@/i18n/useI18n";

// Small helpers
const normalizeNumber = (raw: string) => {
    const v = raw.trim().replace(/\s+/g, "");
    if (v === "") return "";
    const hasComma = v.includes(",");
    const hasDot = v.includes(".");
    if (hasComma && hasDot) {
        const lastComma = v.lastIndexOf(",");
        const lastDot = v.lastIndexOf(".");
        const decimalSep = lastComma > lastDot ? "," : ".";
        const thousandSep = decimalSep === "," ? "." : ",";
        return v.split(thousandSep).join("").replace(decimalSep, ".");
    }
    if (hasComma) return v.replace(",", ".");
    return v;
};
const num = (v: string) => (v.trim() === "" ? NaN : Number(normalizeNumber(v)));
const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(2) : "-");

// ---- Calculators (use the CORRECT formulas) ----
function calcClassic({ H, L, C }: { H: number; L: number; C: number }) {
    const range = H - L;
    const P = (H + L + C) / 3;
    return {
        PP: P,
        R1: 2 * P - L,
        S1: 2 * P - H,
        R2: P + range,
        S2: P - range,
        R3: (2 * P - L) + range,
        S3: (2 * P - H) - range,
        R4: P + range * 1.618,
        S4: P - range * 1.618,
    } as const;
}

function calcWoodie({ O, H, L }: { O: number; H: number; L: number }) {
    const range = H - L;
    const P = (H + L + 2 * O) / 4;
    return {
        PP: P,
        R1: 2 * P - L,
        S1: 2 * P - H,
        R2: P + range,
        S2: P - range,
        R3: (2 * P - L) + range,
        S3: (2 * P - H) - range,
        R4: (P + range) + range,
        S4: (P - range) - range,
    } as const;
}

function calcCamarilla({ H, L, C }: { H: number; L: number; C: number }) {
    const range = H - L;
    const k = 1.1; // standard Camarilla constant
    const R1 = C + (range * k) / 12;
    const R2 = C + (range * k) / 6;
    const R3 = C + (range * k) / 4;
    const R4 = C + (range * k) / 2;
    const S1 = C - (range * k) / 12;
    const S2 = C - (range * k) / 6;
    const S3 = C - (range * k) / 4;
    const S4 = C - (range * k) / 2;
    const P = (H + L + C) / 3;
    return { PP: P, R1, R2, R3, R4, S1, S2, S3, S4 } as const;
}

// Fibonacci retracements & extensions (levels as requested)
const FIB_RETR = [0.236, 0.382, 0.5, 0.618, 0.786];
const FIB_EXT_LEVELS = [1.382, 1.5, 1.618, 2.0, 2.382, 2.618];
function fibRetracements({ A, B }: { A: number; B: number }) {
    const diff = Math.abs(B - A);
    const isUp = B >= A;
    const retr = FIB_RETR.map((p) => (isUp ? B - diff * p : A + diff * p));
    const ext = FIB_EXT_LEVELS.map((p) => (isUp ? B + diff * (p - 1) : A - diff * (p - 1)));
    return { retr, r: FIB_RETR, ext, extLevels: FIB_EXT_LEVELS, isUp } as const;
}

export default function PivotFibonacciWidget() {
    const { t } = useI18n();
    // Inputs for Pivot
    const [open, setOpen] = useState("");
    const [high, setHigh] = useState("");
    const [low, setLow] = useState("");
    const [close, setClose] = useState("");
    const [showPivot, setShowPivot] = useState(true);

    // Inputs for Fibonacci (Up & Down blocks share the same logic; we flip values)
    const [upA, setUpA] = useState(""); // Low price
    const [upB, setUpB] = useState(""); // High price
    const [downA, setDownA] = useState(""); // High price
    const [downB, setDownB] = useState(""); // Low price

    // 🧮 Hitung Pivot
    const values = useMemo(() => {
        const H = num(high), L = num(low), C = num(close), O = num(open);
        if (![H, L, C, O].every(Number.isFinite)) return null;
        return {
            classic: calcClassic({ H, L, C }),
            woodie: calcWoodie({ O, H, L }),
            camarilla: calcCamarilla({ H, L, C }),
        } as const;
    }, [open, high, low, close]);

    const fibUp = useMemo(() => {
        const A = num(upA), B = num(upB);
        if (![A, B].every(Number.isFinite)) return null;
        return fibRetracements({ A, B });
    }, [upA, upB]);

    const fibDown = useMemo(() => {
        const A = num(downA), B = num(downB);
        if (![A, B].every(Number.isFinite)) return null;
        // For downtrend we pass high as A and low as B but the formula handles direction
        return fibRetracements({ A, B });
    }, [downA, downB]);

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2">
                <button
                    onClick={() => setShowPivot(true)}
                    className={`px-4 py-2 rounded-xl font-medium shadow transition duration-300 cursor-pointer ${showPivot
                        ? "btn-primary"
                        : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                        }`}
                >
                    {t("analysis.pivotTab")}
                </button>
                <button
                    onClick={() => setShowPivot(false)}
                    className={`px-4 py-2 rounded-xl font-medium shadow transition duration-300 cursor-pointer ${!showPivot
                        ? "btn-primary"
                        : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                        }`}
                >
                    {t("analysis.fibTab")}
                </button>
            </div>

            {showPivot ? (
                <section className="space-y-4">
                    {/* Inputs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-neutral-300 text-sm">{t("analysis.open")}</label>
                            <input
                                className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                type="text"
                                inputMode="decimal"
                                value={open}
                                onChange={(e) => setOpen(e.target.value)}
                                placeholder="Open"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-neutral-300 text-sm">{t("analysis.high")}</label>
                            <input
                                className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                type="text"
                                inputMode="decimal"
                                value={high}
                                onChange={(e) => setHigh(e.target.value)}
                                placeholder="High"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-neutral-300 text-sm">{t("analysis.low")}</label>
                            <input
                                className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                type="text"
                                inputMode="decimal"
                                value={low}
                                onChange={(e) => setLow(e.target.value)}
                                placeholder="Low"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-neutral-300 text-sm">{t("analysis.close")}</label>
                            <input
                                className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                type="text"
                                inputMode="decimal"
                                value={close}
                                onChange={(e) => setClose(e.target.value)}
                                placeholder="Close"
                            />
                        </div>
                    </div>

                    <button className="btn-primary rounded-xl px-4 py-2 shadow cursor-pointer">
                        {t("analysis.calculatePivot")}
                    </button>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-2xl border border-neutral-800 shadow">
                        <table className="min-w-full text-sm">
                            <thead className="bg-neutral-900 text-neutral-200">
                                <tr>
                                    <th className="p-3 text-left">{t("analysis.level")}</th>
                                    <th className="p-3 text-left">{t("analysis.classic")}</th>
                                    <th className="p-3 text-left">{t("analysis.woodie")}</th>
                                    <th className="p-3 text-left">{t("analysis.camarilla")}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-neutral-950/60 text-neutral-100">
                                {["R4", "R3", "R2", "R1", "PP", "S1", "S2", "S3", "S4"].map((row) => (
                                    <tr key={row} className="border-t border-neutral-800/70">
                                        <td className="p-3 text-neutral-300">{row === "PP" ? "Pivot" : row}</td>
                                        <td className="p-3">{fmt((values as any)?.classic[row] ?? NaN)}</td>
                                        <td className="p-3">{fmt((values as any)?.woodie[row] ?? NaN)}</td>
                                        <td className="p-3">{fmt((values as any)?.camarilla[row] ?? NaN)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : (
                <section className="space-y-8">
                    {/* Up Trend */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 shadow">
                            <h3 className="text-lime-400 font-bold text-lg mb-4">{t("analysis.upTrend")}</h3>
                            <img src="/assets/Uptrend.jpg" alt="Uptrend" className="mb-5" />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-neutral-300 text-sm">{t("analysis.priceALow")}</label>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={upA}
                                        onChange={(e) => setUpA(e.target.value)}
                                        className="bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                        placeholder={t("analysis.lowPrice")}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-neutral-300 text-sm">{t("analysis.priceBHigh")}</label>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={upB}
                                        onChange={(e) => setUpB(e.target.value)}
                                        className="bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                        placeholder={t("analysis.highPrice")}
                                    />
                                </div>
                            </div>

                            {/* Retracement */}
                            <div className="mt-5">
                                <h4 className="text-neutral-200 font-semibold mb-2">{t("analysis.retracement")}</h4>
                                <div className="grid grid-cols-5 gap-2 text-center text-xs md:text-sm">
                                    {fibUp?.r.map((p, i) => (
                                        <div key={p} className="bg-neutral-950 border border-neutral-800 rounded-xl p-2">
                                            <div className="text-neutral-400">{(p * 100).toFixed(1)}%</div>
                                            <div className="font-semibold text-neutral-200">{fmt(fibUp!.retr[i])}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Projection */}
                            <div className="mt-5">
                                <h4 className="text-neutral-200 font-semibold mb-2">{t("analysis.extension")}</h4>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-sm">
                                    {fibUp?.extLevels.map((p, i) => (
                                        <div key={p} className="bg-neutral-950 border border-neutral-800 rounded-xl p-2">
                                            <div className="text-neutral-400">{(p * 100).toFixed(1)}%</div>
                                            <div className="font-semibold text-neutral-200">{fmt(fibUp!.ext[i])}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Down Trend */}
                        <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 shadow">
                            <h3 className="text-rose-400 font-bold text-lg mb-4">{t("analysis.downTrend")}</h3>
                            <img src="/assets/Downtren.jpg" alt="Downtrend" className="mb-5" />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-neutral-300 text-sm">{t("analysis.priceAHigh")}</label>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={downA}
                                        onChange={(e) => setDownA(e.target.value)}
                                        className="bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                        placeholder={t("analysis.highPrice")}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-neutral-300 text-sm">{t("analysis.priceBLow")}</label>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={downB}
                                        onChange={(e) => setDownB(e.target.value)}
                                        className="bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-neutral-100"
                                        placeholder={t("analysis.lowPrice")}
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <h4 className="text-neutral-200 font-semibold mb-2">{t("analysis.retracement")}</h4>
                                <div className="grid grid-cols-5 gap-2 text-center text-xs md:text-sm">
                                    {fibDown?.r.map((p, i) => (
                                        <div key={p} className="bg-neutral-950 border border-neutral-800 rounded-xl p-2">
                                            <div className="text-neutral-400">{(p * 100).toFixed(1)}%</div>
                                            <div className="font-semibold text-neutral-200">{fmt(fibDown!.retr[i])}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5">
                                <h4 className="text-neutral-200 font-semibold mb-2">{t("analysis.extension")}</h4>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-sm">
                                    {fibDown?.extLevels.map((p, i) => (
                                        <div key={p} className="bg-neutral-950 border border-neutral-800 rounded-xl p-2">
                                            <div className="text-neutral-400">{(p * 100).toFixed(1)}%</div>
                                            <div className="font-semibold text-neutral-200">{fmt(fibDown!.ext[i])}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
