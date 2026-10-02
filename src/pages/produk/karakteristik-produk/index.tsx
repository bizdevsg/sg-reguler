import PageTemplates from "@/components/templates/PageTemplates";
import { FaExchangeAlt, FaChartLine, FaMoneyBillWave, FaDollarSign, FaLock, FaGlobe } from 'react-icons/fa';
import { useI18n } from "@/i18n/useI18n";

export default function KarakteristikProduk() {
  const { t } = useI18n();
  return (
    <PageTemplates title={t("product.characteristics.title")}>
      <div className="container mx-auto px-4 py-12 text-gray-200">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("product.characteristics.title")}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Efisiensi Modal */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-full mr-4">
                <FaMoneyBillWave className="text-yellow-500 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-yellow-400">{t("product.characteristics.items.1.title")}</h2>
            </div>
            <p>
              {t("product.characteristics.items.1.desc")}
            </p>
          </div>

          {/* Fleksibilitas Transaksi */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-full mr-4">
                <FaExchangeAlt className="text-yellow-500 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-yellow-400">{t("product.characteristics.items.2.title")}</h2>
            </div>
            <p>
              {t("product.characteristics.items.2.desc")}
            </p>
          </div>

          {/* Pergerakan Harga Sangat Fluktuatif */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-full mr-4">
                <FaChartLine className="text-yellow-500 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-yellow-400">{t("product.characteristics.items.3.title")}</h2>
            </div>
            <p>
              {t("product.characteristics.items.3.desc")}
            </p>
          </div>

          {/* Likuiditas Tinggi */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-full mr-4">
                <FaGlobe className="text-yellow-500 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-yellow-400">{t("product.characteristics.items.4.title")}</h2>
            </div>
            <p>
              {t("product.characteristics.items.4.desc")}
            </p>
          </div>
        </div>

        {/* Jenis Investasi */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center">
            <FaLock className="mr-2" /> {t("product.characteristics.investmentTypes")}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Fixed Rate */}
            <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t("product.characteristics.fixedTitle")}</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>{t("product.characteristics.fixedItem1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>{t("product.characteristics.fixedItem2")}</span>
                </li>
              </ul>
            </div>

            {/* Floating Rate */}
            <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t("product.characteristics.floatingTitle")}</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>{t("product.characteristics.floatingItem1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>{t("product.characteristics.floatingItem2")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageTemplates>
  );
}
