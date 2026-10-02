import { useRouter } from "next/router";

export default function LanguageToggle() {
    const router = useRouter();
    const active = router.locale === "en" ? "en" : "id";

    const setLocale = (nextLocale: "id" | "en") => {
        if (nextLocale === active) return;
        router.push(router.asPath, router.asPath, { locale: nextLocale });
    };

    return (
        <div className="flex items-center gap-1 bg-neutral-900/80 rounded-lg p-1 border border-neutral-700">
            <button
                type="button"
                onClick={() => setLocale("id")}
                className={`w-10 h-8 rounded-md flex items-center justify-center transition ${active === "id"
                    ? "bg-yellow-400"
                    : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                aria-label="Bahasa Indonesia"
            >
                <img src="/assets/icon-id.png" alt="ID" className="w-5 h-5" />
            </button>
            <button
                type="button"
                onClick={() => setLocale("en")}
                className={`w-10 h-8 rounded-md flex items-center justify-center transition ${active === "en"
                    ? "bg-yellow-400"
                    : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                aria-label="English"
            >
                <img src="/assets/icon-us.png" alt="EN" className="w-5 h-5" />
            </button>
        </div>
    );
}
