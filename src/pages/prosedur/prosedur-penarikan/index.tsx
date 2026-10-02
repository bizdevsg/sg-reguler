import PageTemplates from "@/components/templates/PageTemplates";
import { FaMoneyBillWave, FaFileAlt, FaClock, FaExchangeAlt, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from "@/i18n/useI18n";

export default function ProsedurPenarikan() {
  const { t } = useI18n();
  return (
    <PageTemplates title={t("procedure.withdrawal.title")}>
      <div className="container mx-auto px-4 py-12 text-white">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("procedure.withdrawal.title")}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-neutral-800/50 p-8 rounded-lg border border-neutral-600/30">
          <div className="mb-8">
            <div className="flex items-start mb-6">
                <FaMoneyBillWave className="text-yellow-500 text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.withdrawal.generalTitle")}</h2>
                <p className="leading-relaxed">
                  {t("procedure.withdrawal.generalDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="p-3 bg-yellow-500/20 rounded-full mr-4 mt-1 flex-shrink-0">
                <FaExchangeAlt className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.withdrawal.stepsTitle")}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-500/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-yellow-400 text-sm font-semibold">1</span>
                    </div>
                    <p>{t("procedure.withdrawal.step1")}</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-500/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-yellow-400 text-sm font-semibold">2</span>
                    </div>
                    <p>{t("procedure.withdrawal.step2")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start">
                <FaFileAlt className="text-yellow-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">{t("procedure.withdrawal.accountTitle")}</h3>
                  <p>{t("procedure.withdrawal.accountDesc")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start p-6 bg-neutral-800/30 rounded-lg border-l-4 border-yellow-500">
              <FaClock className="text-yellow-500 text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t("procedure.withdrawal.timeTitle")}</h3>
                <p>{t("procedure.withdrawal.timeDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplates>
  );
}
