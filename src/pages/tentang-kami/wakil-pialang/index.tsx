import PageTemplates from "@/components/templates/PageTemplates";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/useI18n";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://sg-admin.newsmaker.id"
).replace(/\/+$/, "");

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? "SGB-c7b0604664fd48d9";

type WakilPialang = {
  id: number;
  nomor_id: string;
  nama: string;
  status: string;
  kantor_cabang_id?: string | number | null;
  kantor_cabang?: { id: number; nama_kantor_cabang: string } | null;
};

type KantorCabang = {
  id: number;
  nama_kantor_cabang: string;
};

type ApiResponse<T> = { data: T } & Record<string, unknown>;

const fetcher = async (url: string): Promise<WakilPialang[]> => {
  const r = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = (await r.json()) as ApiResponse<WakilPialang[]>;
  return Array.isArray(json?.data) ? json.data : [];
};

const kantorFetcher = async (url: string): Promise<KantorCabang[]> => {
  const r = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = (await r.json()) as ApiResponse<KantorCabang[]>;
  return Array.isArray(json?.data) ? json.data : [];
};

export default function WakilPialangPage() {
  const { t } = useI18n();

  const [selectedCabangId, setSelectedCabangId] = useState<string>("0");

  const wakilUrl = useMemo(() => {
    const sp = new URLSearchParams();
    sp.set("per_page", "100");
    if (selectedCabangId) sp.set("kantor_cabang_id", selectedCabangId);
    return `${API_BASE}/api/v1/wakil-pialang?${sp.toString()}`;
  }, [selectedCabangId]);

  const { data, error, isLoading } = useSWR<WakilPialang[]>(
    wakilUrl,
    fetcher,
    { refreshInterval: 60_000 }
  );

  const { data: kantorCabangList } = useSWR<KantorCabang[]>(
    `${API_BASE}/api/v1/kantor-cabang`,
    kantorFetcher
  );

  const stats = useMemo(() => {
    const list = data ?? [];
    const active = list.filter((x) => String(x.status).toLowerCase() === "aktif").length;
    return { total: list.length, active, inactive: list.length - active };
  }, [data]);

  return (
    <PageTemplates title={t("wakil.title")}>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("wakil.title")}
            </h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
              {t("wakil.subtitle")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-8">
            <div className="block text-sm text-gray-300 mb-2 text-center">{t("wakil.pickBranch")}</div>
            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/40 p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 whitespace-nowrap w-max mx-auto">
                <button
                  type="button"
                  onClick={() => setSelectedCabangId("0")}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    selectedCabangId === "0"
                      ? "btn-primary border-yellow-500 shadow"
                      : "bg-neutral-950 text-white border-neutral-700 hover:border-yellow-500"
                  }`}
                >
                  {t("common.hqJakarta")}
                </button>
                {(kantorCabangList ?? []).map((k) => {
                  const id = String(k.id);
                  const active = selectedCabangId === id;
                  return (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setSelectedCabangId(id)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-colors shrink-0 ${
                        active
                          ? "btn-primary border-yellow-500 shadow"
                          : "bg-neutral-950 text-white border-neutral-700 hover:border-yellow-500"
                      }`}
                    >
                      {k.nama_kantor_cabang}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-300">{t("wakil.loading")}</div>
          ) : error ? (
            <div className="text-center text-red-400">{t("wakil.error")}</div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm">
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-gray-200">
                  {t("wakil.total")}: {stats.total}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-green-300">
                  {t("wakil.active")}: {stats.active}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-red-300">
                  {t("wakil.inactive")}: {stats.inactive}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/40">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-neutral-900/80 text-gray-300 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">Nama</th>
                      <th className="px-4 py-3">{t("wakil.idNumber")}</th>
                      <th className="px-4 py-3">{t("wakil.branch")}</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {(data ?? []).map((wp, index) => (
                      <tr key={wp.id} className="hover:bg-neutral-800/40">
                        <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                        <td className="px-4 py-3 text-white font-medium">{wp.nama}</td>
                        <td className="px-4 py-3 text-gray-300">{wp.nomor_id}</td>
                        <td className="px-4 py-3 text-gray-300">
                          {wp.kantor_cabang?.nama_kantor_cabang ??
                            (wp.kantor_cabang_id === 0 ||
                            wp.kantor_cabang_id === "0" ||
                            wp.kantor_cabang_id == null ||
                            String(wp.kantor_cabang_id).trim() === ""
                              ? t("common.hqJakarta")
                              : "-")}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              String(wp.status).toLowerCase() === "aktif"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {wp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(data ?? []).length === 0 && (
                  <div className="p-6 text-center text-gray-300">{t("wakil.empty")}</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PageTemplates>
  );
}
