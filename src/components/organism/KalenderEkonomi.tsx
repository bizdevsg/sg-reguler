import { useState, useEffect } from "react";
import React from "react";
import CountryFlag from "react-country-flag";
import { useI18n } from "@/i18n/useI18n";

// Definisikan interface untuk item data
interface DataItem {
  time: string; // Waktu yang dikirim dari API
  currency: string;
  impact: string;
  event: string;
  previous: string;
  forecast: string;
  actual: string;
  details: {
    sources: string;
    measures: string;
    usualEffect: string;
    frequency: string;
    nextReleased: string;
    notes: string;
    whyTraderCare: string;
    history: {
      date: string;
      previous: string;
      forecast: string;
      actual: string;
    }[];
  };
}

// Daftar filter yang tersedia
const filters = [
  { value: "Today", labelKey: "calendar.filters.today" },
  { value: "This Week", labelKey: "calendar.filters.thisWeek" },
  { value: "Previous Week", labelKey: "calendar.filters.previousWeek" },
  { value: "Next Week", labelKey: "calendar.filters.nextWeek" },
];

// Pemetaan mata uang ke kode negara ISO Alpha-2
const currencyToCountry: Record<string, string> = {
  "U.S": "US",
  EUR: "EU", // Menggunakan Jerman karena EU tidak valid di react-country-flag
  JPY: "JP",
  JPN: "JP", // Alias JPN dari API
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  CHF: "CH",
  CHN: "CN",
  HKD: "HK",
  IDR: "ID",
};

export default function KalenderEkonomi() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<DataItem[]>([]); // Tipe data yang benar
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Menentukan jumlah item per halaman
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Pemetaan endpoint berdasarkan filter
  const endpointMap: Record<string, string> = {
    Today: "today",
    "This Week": "this-week",
    "Previous Week": "previous-week",
    "Next Week": "next-week",
  };

  const fetchData = async (filter: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://endpoapi-production-3202.up.railway.app/api/calendar/${endpointMap[filter]}`
      );
      if (!res.ok) throw new Error(t("calendar.fetchError"));
      const json = await res.json();
      setData(Array.isArray(json.data) ? json.data : []);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeFilter);
  }, [activeFilter]);

  // Handle accordion toggle
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const getCountryCode = (currency: string) =>
    currencyToCountry[currency?.toUpperCase()] || "UN"; // UN → logo bendera putih (fallback)

  const getActualClass = (actual: string, forecast: string) => {
    // Hilangkan semua karakter kecuali angka, titik, koma, minus
    const cleanActual = actual?.replace(/[^0-9.,-]+/g, "") || "";
    const cleanForecast = forecast?.replace(/[^0-9.,-]+/g, "") || "";

    // Ganti koma dengan titik agar parseFloat tidak gagal
    const actualNum = parseFloat(cleanActual.replace(",", "."));
    const forecastNum = parseFloat(cleanForecast.replace(",", "."));

    if (isNaN(actualNum) || isNaN(forecastNum)) return "text-neutral-100";
    if (actualNum > forecastNum) return "text-green-500";
    if (actualNum < forecastNum) return "text-red-500";
    return "text-neutral-100";
  };


  const getColorImpact = (impact: string) => {
    if (!impact) return "text-neutral-100"; // default

    const i = impact.toLowerCase();

    if (i.includes("★★★")) return "text-red-500 font-semibold";
    if (i.includes("★★")) return "text-yellow-500 font-semibold";
    if (i.includes("★")) return "text-green-500 font-semibold";

    return "text-neutral-100"; // fallback
  };

  // Logika pagination untuk filter selain "Today"
  const handlePagination = (groupedData: DataItem[]) => {
    const totalPages = Math.ceil(groupedData.length / itemsPerPage);

    // Logika pagination
    const paginatedData = groupedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return { paginatedData, totalPages };
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Untuk "Today", tidak ada pagination, tampilkan data secara langsung
  const groupedData = activeFilter === "Today" ? data : data;
  const { paginatedData, totalPages } =
    activeFilter !== "Today" ? handlePagination(groupedData) : { paginatedData: groupedData, totalPages: 1 };

  return (
    <div className="space-y-5">
      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`uppercase border text-white border-yellow-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${activeFilter === filter.value
                ? "bg-yellow-500 text-black font-semibold"
                : "bg-gray-100/5 hover:bg-gray-100/10"
                }`}
            >
              {t(filter.labelKey)}
            </button>
          ))}
        </div>

        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder={t("calendar.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-white border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="w-full">
        <div className="inline-block w-full align-middle">
          <div className="border border-yellow-500 rounded-lg overflow-hidden">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-yellow-500">
                <tr className="divide-x divide-yellow-700">
                  <th className="px-2 md:px-4 py-2 text-left font-bold text-neutral-900 uppercase">
                    {t("calendar.time")}
                  </th>
                  <th className="px-2 md:px-4 py-2 text-left font-bold text-neutral-900 uppercase">
                    {t("calendar.country")}
                  </th>
                  <th className="px-2 md:px-4 py-2 text-center font-bold bg-yellow-400 text-neutral-900 uppercase">
                    {t("calendar.impact")}
                  </th>
                  <th className="px-2 md:px-4 py-2 text-left font-bold text-neutral-900 uppercase">
                    {t("calendar.event")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-600">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-neutral-100">
                      {t("calendar.loading")}
                    </td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className="cursor-pointer hover:bg-neutral-700/30 transition divide-x divide-zinc-800"
                        onClick={() => toggleAccordion(index)}
                      >
                        <td className="px-2 md:px-4 py-2 text-neutral-100 break-words align-middle text-center md:text-left">
                          {item.time || "-"}
                        </td>

                        <td className="px-2 md:px-4 py-2 text-neutral-100 break-words">
                          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                            <CountryFlag
                              countryCode={getCountryCode(item.currency)}
                              svg
                              style={{ width: "1.2em", height: "1.2em" }}
                            />
                            <span>{item.currency}</span>
                          </div>
                        </td>

                        <td
                          className={`px-2 md:px-4 py-2 text-center bg-neutral-600/20 ${getColorImpact(
                            item.impact
                          )}`}
                        >
                          {item.impact}
                        </td>

                        <td className="px-2 md:px-4 py-2 text-neutral-100 break-words align-top">
                          <div className="font-medium">{item.event}</div>
                          <div className="flex flex-wrap gap-1 text-neutral-400">
                            <p><strong>{t("calendar.previous")}:</strong> {item.previous || "-"}</p>
                            <span>|</span>
                            <p><strong>{t("calendar.forecast")}:</strong> {item.forecast || "-"}</p>
                            <span>|</span>
                            <p>
                              <strong>{t("calendar.actual")}:</strong>{" "}
                              <span className={getActualClass(item.actual, item.forecast)}>
                                {item.actual || "-"}
                              </span>
                            </p>
                          </div>
                        </td>
                      </tr>

                      {/* Accordion Detail */}
                      {activeAccordion === index && (
                        <tr>
                          <td colSpan={4} className="bg-neutral-600/20 p-4">
                            <div className="flex flex-col gap-4 md:flex-row">
                              {/* Card Detail */}
                              <div className="text-white space-y-3 border border-yellow-500 p-4 rounded-lg w-full">
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.sources")}:</p> {item.details.sources || "-"}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.measures")}:</p> {item.details.measures || "-"}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.usualEffect")}:</p> {item.details.usualEffect || "-"}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.frequency")}:</p> {item.details.frequency || "-"}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.nextReleased")}:</p> {item.details.nextReleased || "-"}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.notes")}:</p> {item.details.notes || "-"}
                                </div>
                                <div>
                                  <p className="font-bold text-lg">{t("calendar.whyCare")}:</p> {item.details.whyTraderCare || "-"}
                                </div>
                              </div>

                              {/* History Table */}
                              <div className="w-full">
                                <table className="w-full border-collapse text-white rounded-xl overflow-hidden shadow-md table-auto">
                                  <thead>
                                    <tr className="bg-zinc-700 uppercase text-xs">
                                      <th className="px-2 py-2 text-left">{t("calendar.date")}</th>
                                      <th className="px-2 py-2 text-left">{t("calendar.previous")}</th>
                                      <th className="px-2 py-2 text-left">{t("calendar.forecast")}</th>
                                      <th className="px-2 py-2 text-left">{t("calendar.actual")}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.details.history.map((historyItem, idx) => (
                                      <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-neutral-700" : "bg-zinc-800"} hover:bg-zinc-900 transition-colors`}
                                      >
                                        <td className="px-2 py-2 break-words">{historyItem.date}</td>
                                        <td className="px-2 py-2 break-words">{historyItem.previous}</td>
                                        <td className="px-2 py-2 break-words">{historyItem.forecast}</td>
                                        <td
                                          className={`px-2 py-2 break-words font-semibold ${historyItem.actual > historyItem.forecast
                                            ? "text-green-400"
                                            : historyItem.actual < historyItem.forecast
                                              ? "text-red-600"
                                              : ""
                                            }`}
                                        >
                                          {historyItem.actual}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-neutral-100">
                      {t("calendar.empty")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {activeFilter !== "Today" && (
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            {t("calendar.prev")}
          </button>
          <span className="text-neutral-100">
            {t("calendar.pageOf", { current: currentPage, total: totalPages })}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            {t("calendar.next")}
          </button>
        </div>
      )}
    </div>
  );
}
