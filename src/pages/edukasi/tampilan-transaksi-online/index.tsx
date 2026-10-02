import React from "react";
import PageTemplates from "@/components/templates/PageTemplates";
import Header from "@/components/moleculs/Header";
import { useI18n } from "@/i18n/useI18n";

type TextMap = { id: string; en: string };
const pick = (locale: string, value: TextMap) => (locale === "en" ? value.en : value.id);

export default function TampilanTransaksiOnlinePage() {
  const { locale } = useI18n();
  const title = locale === "en" ? "Online Trading Screen" : "Tampilan Transaksi Online";
  const subtitle = "PT. Solid Gold Berjangka";

  return (
    <PageTemplates title={title}>
      <div className="container text-gray-200">
        <Header title={title} subtitle={subtitle} />

        {/* HAL YANG PERLU DIKETAHUI DALAM ONLINE TRADING */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-3">
              1
            </span>
            {locale === "en" ? "Key Things to Know in Online Trading" : "HAL YANG PERLU DIKETAHUI DALAM ONLINE TRADING"}
          </h2>

          {/* Updating Harga */}
          <div className="bg-neutral-800 rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">
              {locale === "en" ? "PRICE UPDATE" : "UPDATING HARGA"}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {pick(locale, {
                id: "Pergantian harga pada sistem Online Trading mengacu pada harga Winquote yang bergerak, harga terakhir (last trade) ditambah 10 poin untuk beli dan dikurangi 10 poin untuk jual (spread 20 point).",
                en: "Price changes in the Online Trading system refer to the moving Winquote price. The last trade price is +10 points for buy and -10 points for sell (20-point spread).",
              })}
            </p>
          </div>

          {/* Price Has Change */}
          <div className="bg-neutral-800 rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">PRICE HAS CHANGE</h3>
            <p className="text-gray-300 leading-relaxed">
              {pick(locale, {
                id: "\"Price has change\" dalam pengambilan harga dapat saja terjadi kepada setiap Nasabah atau Kuasa Nasabah yang melakukan transaksi di Online Trading ataupun manual trading, dikarenakan bergeraknya harga yang terus menerus yang mengacu pada pergerakan harga di Winquote.",
                en: "\"Price has change\" can occur for any client or authorized trader using online or manual trading because prices continuously move based on Winquote.",
              })}
            </p>
          </div>

          {/* Harga yang dieksekusi berbeda */}
          <div className="bg-neutral-800 rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">
              {locale === "en"
                ? "Executed price differs from the displayed price (Done)"
                : "Harga yang dieksekusi berbeda dengan harga yang terjadi (Done)"}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {pick(locale, {
                id: "Dalam bertransaksi menggunakan online trading ataupun manual trading (e-quote) kita juga sering jumpai harga yang kita eksekusi berbeda. Dan kejadian tersebut biasa terjadi karena harga yang muncul bergerak terus mengacu pada Winquote (Uptodate).",
                en: "In online or manual trading (e-quote), executed prices can differ from displayed prices because the price keeps moving based on Winquote (up-to-date).",
              })}
            </p>
          </div>

          {/* Kendala yang sering timbul */}
          <div className="bg-neutral-800 rounded-lg p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">
              {locale === "en"
                ? "Common Issues When Using Online Trading"
                : "KENDALA YANG SERING TIMBUL DALAM MENGGUNAKAN ONLINE TRADING"}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(locale, {
                id: "Kendala yang sering terjadi pada saat bertransaksi menggunakan online trading disebabkan oleh beberapa faktor baik dari perangkat keras dan perangkat lunak yang kita gunakan ataupun user yang kurang memahami mekanisme transaksi online trading. Dalam beberapa faktor tersebut lebih banyak kita jumpai dari sisi perangkat lunak yang tidak kasat mata seperti faktor internet provider dan user. Pada saat kita akan bertransaksi sebaiknya user terlebih dahulu memahami mekanisme transaksi online trading dan melakukan simulasi dengan menggunakan account simulasi sebelum user melakukan transaksi pada \"real account\" dengan fasilitas internet yang digunakan mempunyai akses yang cepat dan stabil.",
                en: "Common issues in online trading are caused by hardware/software factors or users who do not fully understand the trading mechanism. Many issues come from unseen software/network factors such as internet providers or user settings. Users should understand the trading mechanism and practice on a demo account before trading on a real account with a fast and stable internet connection.",
              })}
            </p>
          </div>

          {/* Loading lama */}
          <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">
              {locale === "en"
                ? "Execution takes a long time to load"
                : "Pada saat eksekusi harga Loading-nya lama"}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(locale, {
                id: "Kejadian seperti ini juga sering kita jumpai pada saat bertransaksi menggunakan online trading, yang mana pada saat kita mengeksekusi posisi beli/jual, perolehan harganya (loading) sangat lama dan posisi dalam etrade tidak berubah-ubah. Kejadian seperti ini disebabkan oleh faktor perubahan harga secara drastis atau harga tidak stabil (market hectic), ataupun internet koneksi loss dari data yang terkirim ke online trading service, sehingga data tersebut tidak sampai ke online trading service. Apabila nasabah atau kuasa nasabah mengalami hal pada saat market hectic, sebaiknya refresh online trading tersebut, ataumenghubungi ke bagian dealing untuk melakukan pengecekan dari sisi perangkat lunak ataupun perangkat kerasnya.",
                en: "This can happen when executing buy/sell orders: price loading is very slow and the position does not update. Causes include drastic price changes (hectic market) or unstable/lost internet connection so data does not reach the trading service. In hectic markets, refresh the platform or contact the dealing desk to check software/hardware.",
              })}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {pick(locale, {
                id: "Dapat disimpulkan dari penjelasan tersebut apabila mengalami kejadian seperti ini ada 2 sebab yaitu:",
                en: "From the explanation above, there are two main causes:",
              })}
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
              <li>
                {pick(locale, {
                  id: "Market sedang hectic, sehingga pada saat masuk transaksi menggunakan \"Market Order\" akan mengalami kesulitan, oleh karena itu disarankan kepada nasabah untuk menggunakan 2 fasilitas yang tersedia dalam online trading yaitu dengan cara menggunakan \"LIMIT ORDER\" dan \"STOP ORDER\".",
                  en: "The market is hectic, so Market Orders may be difficult to execute. It is recommended to use LIMIT ORDER and STOP ORDER instead.",
                })}
              </li>
              <li>
                {pick(locale, {
                  id: "Murni karena internet koneksi yang loss dan tidak stabil sehingga pada saat eksekusi data yang terkirim tidak sampai ke online trading service.",
                  en: "Purely due to unstable/lost internet connection so the execution data does not reach the online trading service.",
                })}
              </li>
            </ul>
          </div>
        </div>

        {/* PERINGATAN DALAM ONLINE TRADING */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mr-3">
              2
            </span>
            {locale === "en" ? "Warnings in Online Trading" : "PERINGATAN DALAM ONLINE TRADING"}
          </h2>

          <div className="space-y-6">
            {/* 1. Insufficient Margin */}
            <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">1. Insufficient Margin</h3>
              <p className="text-gray-300 leading-relaxed">
                {pick(locale, {
                  id: "Dalam online trading akan tertera peringatan \"Insufficient Margin\" apabila Effective Margin akun anda tidak mencukupi dengan jumlah lot transaksi yang diambil. Insufficient Margin juga akan muncul apabila pada saat mengambil posisi dengan jumlah lot yang lebih dimana pada saat bersamaan anda sedang memasang Limit atau Stop Order sehingga Effective Margin akan terpakai untuk sementara sesuai jumlah lot yang dipasang di Limit atau Stop Order, dana tersebut akan kembali lagi ke Effective Margin apabila pemasangan Limit atau Stop order tersebut dibatalkan (Cancel) sebelum pesanan/order harga beli/jual yang ditempatkan tersebut tereksekusi (Done).",
                  en: "\"Insufficient Margin\" appears when your Effective Margin is not enough for the lots taken. It can also appear if you open more lots while placing Limit/Stop Orders, temporarily using margin. The margin returns when the Limit/Stop Order is canceled before execution.",
                })}
              </p>
            </div>

            {/* 2. Price too Close / Price too Far */}
            <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">2. Price too Close / Price too Far</h3>
              <p className="text-gray-300 leading-relaxed">
                {pick(locale, {
                  id: "\"Price too Close atau Price to Far\" terjadi pada saat menggunakan limit atau stop order, yang mana harga yang di limit terlalu dekat atau terlalu jauh dari ketentuan Mekanisme Transaksi pada Online Trading. Perhatikanlah mekanisme transaksi pengambilan harga dengan menggunkan limit atau stop order tersebut. Apabila anda dalam bertransaksi menggunakan fasilitas tersebut dan dalam pengambilan harga dibawah 10 pts dari harga screen etrade atau diatas 500 pts dari harga screen maka keluarlah peringatan \"price too close / price too far\"",
                  en: "\"Price too Close/Price too Far\" occurs when the limit/stop price is too close or too far from the allowed range. If you set a price below 10 pts from the screen price or above 500 pts from it, the warning appears.",
                })}
              </p>
            </div>

            {/* 3. Validation error */}
            <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">3. Validation error</h3>
              <p className="text-gray-300 leading-relaxed">
                {pick(locale, {
                  id: "\"Validation Error\"terjadiadanya kesalahan user pada saat transaksi menggunakan Market Order atau pun Limit Order dan Stop Order, yang mana kejadian tersebut disebabkan adanya kekurangan pengisian pada kolom-kolom yang tersedia atau pengambilan posisi melebihi batas transaksi lot (diatas 20 lot)",
                  en: "\"Validation Error\" appears when there is user input error while using Market/Limit/Stop Orders, such as incomplete fields or exceeding lot limits (above 20 lots).",
                })}
              </p>
            </div>

            {/* 4. Invalid Stop Order */}
            <div className="bg-neutral-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">4. Invalid Stop Order</h3>
              <p className="text-gray-300 leading-relaxed">
                {pick(locale, {
                  id: "Peringatan \"Invalid Stop Order\"terjadi pada saat anda menggunakan Limit Order untuk pengambilan posisi baru, yang mana dalam pengambilan posisi tersebut tidak sesuai dengan mekanisme transaksi (Pengambilan Harga berlawanan dari mekanisme transaksi Limit order). Contohnya, apabila mengambil posisi menggunakan Limit Order Sell New diharga 20490, sedangkan Screen etrade harga Sell di harga 20593, dan pada saat harga tersebut kita ambil keluarlah pesan \"Invalid Stop Order\" karena harga yang anda ambil berlawanan dengan Mekanisme Limit Order. Jadi harga yang bisa anda ambil adalah harga Sell pada Screen etrade (20593 + 10 pts sampai 500 pts) dan bukannya harga Sell pada Screen etrade (20593 – 10 pts sampai 500 pts).",
                  en: "\"Invalid Stop Order\" appears when you use a Limit Order for a new position that does not follow the transaction mechanism (price direction is opposite). Example: placing Sell New at 20490 while screen sell price is 20593 triggers the warning. The valid range is screen sell price (20593 + 10 pts up to 500 pts), not below it.",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplates>
  );
}
