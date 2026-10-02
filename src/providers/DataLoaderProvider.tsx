"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

/** Context type */
type Ctx = {
    /** jumlah request yang belum selesai */
    pendingCount: number;
    /** daftarkan promise fetch; provider akan menunggu sampai resolve/reject */
    track<T>(p: Promise<T>): Promise<T>;
    /** reset manual (misal saat pindah route) */
    reset(): void;
};

const DataLoaderContext = createContext<Ctx | null>(null);

export function DataLoaderProvider({ children }: { children: React.ReactNode }) {
    const [pendingCount, setPendingCount] = useState(0);
    const mounted = useRef(true);

    const inc = () => setPendingCount((c) => c + 1);
    const dec = () => setPendingCount((c) => Math.max(0, c - 1));

    const track = useCallback(async <T,>(p: Promise<T>): Promise<T> => {
        inc();
        try {
            return await p;
        } finally {
            if (mounted.current) dec();
        }
    }, []);

    const reset = useCallback(() => setPendingCount(0), []);

    const value = useMemo(() => ({ pendingCount, track, reset }), [pendingCount, track, reset]);

    return <DataLoaderContext.Provider value={value}>{children}</DataLoaderContext.Provider>;
}

export function useDataLoader() {
    const ctx = useContext(DataLoaderContext);
    if (!ctx) throw new Error("useDataLoader must be used within DataLoaderProvider");
    return ctx;
}
