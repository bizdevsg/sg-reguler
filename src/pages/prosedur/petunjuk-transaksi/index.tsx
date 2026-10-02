import PageTemplates from "@/components/templates/PageTemplates";
import { FaLaptop, FaUserLock, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from "@/i18n/useI18n";

export default function PetunjukTransaksi() {
  const { t } = useI18n();
  return (
    <PageTemplates title={t("procedure.guide.title")}>
      <div className="container mx-auto px-4 py-12 text-gray-200">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("procedure.guide.title")}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-neutral-800/50 p-8 rounded-lg border border-neutral-600/30">
          <p className="mb-6 text-lg text-white leading-relaxed">
            {t("procedure.guide.intro")}
          </p>

          <div className="mb-8 p-6 bg-neutral-800/30 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-start">
                <FaUserLock className="text-yellow-500 text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.guide.accessTitle")}</h3>
                <p className="text-white">
                  {t("procedure.guide.accessDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">{t("procedure.guide.requirementsTitle")}</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-white">{t("procedure.guide.req1")}</span>
              </div>
              
              <div className="flex items-start">
                <FaCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-white">
                  {t("procedure.guide.req2Prefix")}{" "}
                  <a href="http://etrade.sgberjangka.com/login.php" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    http://etrade.sgberjangka.com/login.php
                  </a>
                </span>
              </div>
              
              <div className="flex items-start">
                <FaCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-white">{t("procedure.guide.req3")}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start">
              <FaLaptop className="text-yellow-500 text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">{t("procedure.guide.fullGuideTitle")}</h3>
                <p className="text-white">
                  {t("procedure.guide.fullGuideDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplates>
  );
}
