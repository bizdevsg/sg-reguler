// src/pages/404.tsx
import { useI18n } from "@/i18n/useI18n";
export default function Custom404() {
    const { t } = useI18n();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-6">
            <h1 className="text-7xl font-bold text-yellow-500 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                {t("common.notFound")}
            </h2>
            <p className="text-neutral-400 mb-6 max-w-md">
                {t("common.notFoundDesc")}
            </p>
            <a
                href="/"
                className="btn-primary px-6 py-3 rounded-lg"
            >
                {t("common.backHome")}
            </a>
        </div>
    );
}
