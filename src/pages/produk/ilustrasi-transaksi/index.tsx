import React from 'react';
import PageTemplates from "@/components/templates/PageTemplates";
import { FaCalculator, FaExchangeAlt, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { useI18n } from "@/i18n/useI18n";

const IlustrasiTransaksi = () => {
  const { t } = useI18n();
  return (
    <PageTemplates title={t("product.illustration.title")}>
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("product.illustration.title")}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Formula Section */}
        <section className="mb-12 bg-neutral-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4 flex items-center">
            <FaCalculator className="mr-2" /> {t("product.illustration.formulaTitle")}
          </h2>
          <div className="bg-neutral-900 p-4 rounded-md mb-4 overflow-x-auto">
            <code className="text-lg text-yellow-400">
              [ (Selling Price – Buying Price) x Contract Size x n Lot ] – [ (Facility Fee + VAT) x n Lot ]
            </code>
          </div>
          
          <div className="space-y-4 text-gray-200">
            <p className="text-yellow-400 font-medium">{t("product.illustration.notes")}</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-semibold text-white">{t("product.illustration.contractSizeLabel")}</span> 
                <ul className="list-[circle] pl-6 mt-2 space-y-1">
                  <li className="text-gray-300">{t("product.illustration.contractSizeItem1")}</li>
                  <li className="text-gray-300">{t("product.illustration.contractSizeItem2")}</li>
                </ul>
              </li>
              <li className="text-gray-300"><span className="font-semibold text-white">{t("product.illustration.nLotLabel")}</span> {t("product.illustration.nLotDesc")}</li>
              <li className="text-gray-300"><span className="font-semibold text-white">{t("product.illustration.feeLabel")}</span> {t("product.illustration.feeDesc")}</li>
              <li className="text-gray-300"><span className="font-semibold text-white">{t("product.illustration.totalFeeLabel")}</span> {t("product.illustration.totalFeeDesc")}</li>
              <li className="text-gray-300"><span className="font-semibold text-white">{t("product.illustration.vatLabel")}</span> {t("product.illustration.vatDesc")}</li>
              <li className="text-gray-300"><span className="font-semibold text-white">{t("product.illustration.totalVatLabel")}</span> {t("product.illustration.totalVatDesc")}</li>
            </ul>
          </div>
        </section>

        {/* Roll Over Fees */}
        <section className="mb-12 bg-neutral-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">{t("product.illustration.rolloverTitle")}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-neutral-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-yellow-600 text-white">
                  <th className="px-4 py-2">{t("product.illustration.contract")}</th>
                  <th className="px-4 py-2">{t("product.illustration.feePerNight")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                <tr className="hover:bg-neutral-700/50 transition-colors">
                  <td className="px-4 py-3 text-gray-200">{t("product.illustration.rollover.row1.contract")}</td>
                  <td className="px-4 py-3 text-yellow-400 font-medium">{t("product.illustration.rollover.row1.fee")}</td>
                </tr>
                <tr className="hover:bg-neutral-700/50 transition-colors">
                  <td className="px-4 py-3 text-gray-200">{t("product.illustration.rollover.row2.contract")}</td>
                  <td className="px-4 py-3 text-yellow-400 font-medium">{t("product.illustration.rollover.row2.fee")}</td>
                </tr>
                <tr className="hover:bg-neutral-700/50 transition-colors">
                  <td className="px-4 py-3 text-gray-200">{t("product.illustration.rollover.row3.contract")}</td>
                  <td className="px-4 py-3 text-yellow-400 font-medium">{t("product.illustration.rollover.row3.fee")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Example Sections */}
        <div className="space-y-12">
          {/* Example 1 */}
          <section className="bg-neutral-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center">
              <FaExchangeAlt className="mr-2" /> {t("product.illustration.example1Title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-200">{t("product.illustration.example1Desc")}</p>
              
              <div className="bg-neutral-700/30 p-4 rounded-md overflow-x-auto border border-neutral-600/30">
                <code className="text-yellow-300 font-mono text-sm sm:text-base">
                  P/L = [ ( Selling Price – Buying Price ) x Contract Size x n Lot ] – [ ( Fee US $ 10 + VAT ) x n Lot ]<br />
                  P/L = [ ( 24.700 – 24.600 ) x US $ 5 x 2 lot ] – [ ( US $ 30 + US $ 3.3 ) x 2 lot ]<br />
                  P/L = ( 100 poin x US $ 5 x 2 lot ) – ( US $ 33.3 x 2 )<br />
                  P/L = US $ 1000 – US $ 66.6<br />
                  P/L = <span className="text-green-400 font-bold">US $ 933.4 ({t("product.illustration.netProfitLabel")})</span>
                </code>
              </div>
            </div>
          </section>

          {/* Example 2 */}
          <section className="bg-neutral-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center">
              <FaExchangeAlt className="mr-2" /> {t("product.illustration.example2Title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-200">{t("product.illustration.example2Desc")}</p>
              
              <div className="bg-neutral-700/30 p-4 rounded-md overflow-x-auto border border-neutral-600/30">
                <code className="text-yellow-300 font-mono text-sm sm:text-base">
                  P/L = [ ( Selling Price – Buying Price ) x Contract Size x n Lot ] – [ ( Fee US $ 30 + VAT ) x n Lot ]<br />
                  P/L = [ ( 24.550 – 24.600 ) x US $ 5 x 1 lot ] – [ ( US $ 30 + US $ 3.3 ) x 1 lot ]<br />
                  P/L = ( – 50 poin x US $ 5 x 1 lot ) – ( US $ 33.3 x 1 lot )<br />
                  P/L = – US $ 250 – US $ 33.3<br />
                  P/L = <span className="text-red-400 font-bold">– US $ 283.3 ({t("product.illustration.netLossLabel")})</span>
                </code>
              </div>
            </div>
          </section>

          {/* Example 3 */}
          <section className="bg-neutral-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center">
              <FaExchangeAlt className="mr-2" /> {t("product.illustration.example3Title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-200">{t("product.illustration.example3Desc")}</p>
              
              <div className="bg-neutral-700/30 p-4 rounded-md overflow-x-auto border border-neutral-600/30">
                <code className="text-yellow-300 font-mono text-sm sm:text-base">
                  P/L = [ ( Selling Price – Buying Price ) x Contract Size x n Lot ] - [ ( Fee US $ 30 + VAT ) x n Lot ]<br />
                  P/L = [ ( 14.850 – 14.650 ) x US $ 5 x 2 lot ] – [ ( US $ 30 + US $ 3.3 ) x 2 lot ]<br />
                  P/L = ( 200 poin x US $ 5 x 2 lot ) – ( US $ 33.3 x 2 lot )<br />
                  P/L = US $ 2000 – US $ 66.6<br />
                  P/L = <span className="text-green-400 font-medium">US $ 1933.4 ({t("product.illustration.grossProfitLabel")})</span>
                </code>
                
                <div className="mt-4 p-3 bg-neutral-800/50 rounded-md">
                  <p className="text-yellow-300">
                    <span className="text-gray-300">{t("product.illustration.grossProfit")}</span> = US $ 1933.4<br />
                    <span className="text-gray-300">{t("product.illustration.rolloverFeeLine")}</span> = <span className="text-red-400">- US $ 8</span><br />
                    <span className="font-bold text-white">{t("product.illustration.netProfit")} = US $ 1925.4</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Forex Section */}
          <section className="bg-neutral-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">{t("product.illustration.contractTypesTitle")}</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-neutral-900 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-yellow-600 text-white">
                    <th className="px-4 py-2">{t("product.illustration.contractCode")}</th>
                    <th className="px-4 py-2">{t("product.illustration.base")}</th>
                    <th className="px-4 py-2">{t("product.illustration.rateCategory")}</th>
                    <th className="px-4 py-2">{t("product.illustration.contractType")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  {[
                    ['GU1010_BBJ', 'GBP/USD', 'DIRECT', t("product.illustration.desc1")],
                    ['EU1010_BBJ', 'EUR/USD', 'DIRECT', t("product.illustration.desc2")],
                    ['AU1010_BBJ', 'AUD/USD', 'DIRECT', t("product.illustration.desc3")],
                    ['UC1010_BBJ', 'USD/CHF', 'INDIRECT', t("product.illustration.desc4")],
                    ['UJ1010_BBJ', 'USD/JPY', 'INDIRECT', t("product.illustration.desc5")]
                  ].map(([code, base, category, desc], idx) => (
                    <tr key={idx} className="hover:bg-neutral-700/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-yellow-400">{code}</td>
                      <td className="px-4 py-3 font-medium text-gray-200">{base}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category === 'DIRECT' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-8">
              <div className="bg-neutral-700/30 p-4 rounded-lg border border-neutral-600/30">
                <h3 className="text-xl font-semibold text-yellow-500 mb-3">{t("product.illustration.calcTitle")}</h3>
                <div className="space-y-2">
                  <p className="text-gray-200">
                    <span className="font-semibold text-white">{t("product.illustration.directRates")}</span><br />
                    <code className="block mt-1 bg-neutral-800/50 p-2 rounded text-yellow-300 font-mono text-sm">
                      {t("product.illustration.formulaPL")}
                    </code>
                  </p>
                  <p className="text-gray-200">
                    <span className="font-semibold text-white">{t("product.illustration.indirectRates")}</span><br />
                    <code className="block mt-1 bg-neutral-800/50 p-2 rounded text-yellow-300 font-mono text-sm">
                      {t("product.illustration.formulaPL")}
                    </code>
                  </p>
                </div>
              </div>

              <div className="bg-neutral-700/30 p-4 rounded-lg border border-neutral-600/30">
                <h4 className="text-lg font-semibold text-yellow-500 mb-3">{t("product.illustration.example4Title")}</h4>
                <p className="mb-3 text-gray-200">{t("product.illustration.example4Desc")}</p>
                <div className="bg-neutral-800/50 p-3 rounded-md mb-4 border border-neutral-700/50">
                  <code className="text-yellow-300 font-mono text-sm sm:text-base">
                    P/L = (1.3540 - 1.3530) x 100,000 x 2 - [($30 + $3.3) x 2]<br />
                    = 0.0010 x 100,000 x 2 - ($33.3 x 2)<br />
                    = $200 - $66.6<br />
                    = <span className="text-green-400 font-bold">$133.4 ({t("product.illustration.profitLabel")})</span>
                  </code>
                </div>
                <p className="mb-2 text-gray-300 text-sm">{t("product.illustration.example4Down")}</p>
                <div className="bg-neutral-800/50 p-3 rounded-md border border-neutral-700/50">
                  <code className="text-yellow-300 font-mono text-sm sm:text-base">
                    P/L = (1.3525 - 1.3530) x 100,000 x 2 - [($30 + $3.3) x 2]<br />
                    = -0.0005 x 100,000 x 2 - $66.6<br />
                    = -$100 - $66.6<br />
                    = <span className="text-red-400 font-bold">-$166.6 ({t("product.illustration.lossLabel")})</span>
                  </code>
                </div>
              </div>

              <div className="bg-neutral-700/30 p-4 rounded-lg border border-neutral-600/30 mt-6">
                <h4 className="text-lg font-semibold text-yellow-500 mb-3">{t("product.illustration.example5Title")}</h4>
                <p className="mb-3 text-gray-200">{t("product.illustration.example5Desc")}</p>
                <div className="bg-neutral-800/50 p-3 rounded-md mb-4 border border-neutral-700/50">
                  <code className="text-yellow-300 font-mono text-sm sm:text-base">
                    P/L = (102.20 - 102.12) / 102.12 x 100,000 x 1 - [($30 + $3.3) x 1]<br />
                    = 0.0007834 x 100,000 - $33.3<br />
                    = $78.34 - $33.3<br />
                    = <span className="text-green-400 font-bold">$45.04 ({t("product.illustration.profitLabel")})</span>
                  </code>
                </div>
                <p className="mb-2 text-gray-300 text-sm">{t("product.illustration.example5Up")}</p>
                <div className="bg-neutral-800/50 p-3 rounded-md border border-neutral-700/50">
                  <code className="text-yellow-300 font-mono text-sm sm:text-base">
                    P/L = (102.20 - 102.27) / 102.27 x 100,000 x 1 - [($30 + $3.3) x 1]<br />
                    = -0.0006844 x 100,000 - $33.3<br />
                    = -$68.44 - $33.3<br />
                    = <span className="text-red-400 font-bold">-$101.74 ({t("product.illustration.lossLabel")})</span>
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTemplates>
  );
};

export default IlustrasiTransaksi;
