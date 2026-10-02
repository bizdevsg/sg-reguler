import PageTemplates from "@/components/templates/PageTemplates";
import { FaGlobe, FaUserEdit, FaFileAlt, FaCheckCircle, FaMoneyBillWave, FaEnvelope, FaMobileAlt } from 'react-icons/fa';
import { useI18n } from "@/i18n/useI18n";

export default function ProsedurRegol() {
  const { t } = useI18n();
  return (
    <PageTemplates title={t("procedure.regol.title")}>
      <div className="container mx-auto px-4 py-12 text-white">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("procedure.regol.title")}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Langkah 1 */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30">
            <div className="flex items-start">
              <div className="bg-yellow-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FaGlobe className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.regol.step1.title")}</h2>
                <p className="leading-relaxed">
                  {t("procedure.regol.step1.desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Langkah 2 */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30">
            <div className="flex items-start">
              <div className="bg-yellow-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FaUserEdit className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.regol.step2.title")}</h2>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step2.item1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step2.item2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step2.item3")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Langkah 3 */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30">
            <div className="flex items-start">
              <div className="bg-yellow-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FaFileAlt className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.regol.step3.title")}</h2>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step3.item1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step3.item2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step3.item3")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step3.item4")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step3.item5")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Langkah 4 */}
          <div className="bg-neutral-800/50 p-6 rounded-lg border border-yellow-500/30">
            <div className="flex items-start">
              <div className="bg-yellow-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FaCheckCircle className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">{t("procedure.regol.step4.title")}</h2>
                <p className="mb-4">
                  {t("procedure.regol.step4.desc")}
                </p>
                <ul className="space-y-2 pl-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step4.item1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{t("procedure.regol.step4.item2")}</span>
                  </li>
                </ul>

                <div className="overflow-x-auto">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">{t("procedure.regol.transferTitle")}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {/* Bank BCA */}
                    <div className="bg-neutral-800/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">{t("procedure.regol.bank.bca")}</h4>
                      <p className="text-sm">{t("procedure.regol.idrAccount")}: 035-311-596-8</p>
                      <p className="text-sm">{t("procedure.regol.usdAccount")}: 035-311-797-9</p>
                    </div>

                    {/* Bank CIMB Niaga */}
                    <div className="bg-neutral-800/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">{t("procedure.regol.bank.cimb")}</h4>
                      <p className="text-sm">{t("procedure.regol.idrAccount")}: 800-12-97469-00</p>
                      <p className="text-sm">{t("procedure.regol.usdAccount")}: 800-00-06176-40</p>
                    </div>

                    {/* Bank BNI */}
                    <div className="bg-neutral-800/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">{t("procedure.regol.bank.bni")}</h4>
                      <p className="text-sm">{t("procedure.regol.idrAccount")}: 017-068–2500</p>
                      <p className="text-sm">{t("procedure.regol.usdAccount")}: 017-075–0300</p>
                    </div>

                    {/* Bank Mandiri */}
                    <div className="bg-neutral-800/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">{t("procedure.regol.bank.mandiri")}</h4>
                      <p className="text-sm">{t("procedure.regol.idrAccount")}: 122-000-665-6063</p>
                      <p className="text-sm">{t("procedure.regol.usdAccount")}: 122-000-665-60710</p>
                    </div>

                    {/* Bank Artha Graha */}
                    <div className="bg-neutral-800/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">{t("procedure.regol.bank.artha")}</h4>
                      <p className="text-sm">{t("procedure.regol.idrAccount")}: 107-996-4073</p>
                    </div>

                    {/* Bank BRI */}
                    <div className="bg-neutral-800/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">{t("procedure.regol.bank.bri")}</h4>
                      <p className="text-sm">{t("procedure.regol.idrAccount")}: 038201001510301</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-white">{t("procedure.regol.transferNote")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Langkah 5-8 */}
          <div className="space-y-4">
            {[
              {
                icon: <FaMoneyBillWave />,
                text: t("procedure.regol.step5")
              },
              {
                icon: <FaUserEdit />,
                text: t("procedure.regol.step6")
              },
              {
                icon: <FaFileAlt />,
                text: t("procedure.regol.step7")
              },
              {
                icon: <FaMobileAlt />,
                text: t("procedure.regol.step8")
              }
            ].map((step, index) => {
              const IconComponent = step.icon.type;
              return (
                <div key={index} className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-600/30">
                  <div className="flex items-start">
                    <div className="flex items-center mr-4">
                      <div className="bg-yellow-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        <IconComponent className="text-yellow-500" />
                      </div>
                      <span className="text-xl font-semibold text-yellow-400">{index + 5}.</span>
                    </div>
                    <p className="mt-0.5">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTemplates>
  );
}
