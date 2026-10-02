import PageTemplates from "@/components/templates/PageTemplates";
import { useI18n } from "@/i18n/useI18n";

type PolicySection = {
  title: string;
  points: string[];
};

export default function PrivacyPolicyPage() {
  const { t, locale } = useI18n();

  const isId = locale === "id";
  const effectiveDate = isId ? "14 Februari 2026" : "February 14, 2026";

  const sections: PolicySection[] = isId
    ? [
        {
          title: "1. Informasi yang Kami Kumpulkan",
          points: [
            "Informasi identitas dan kontak yang Anda berikan secara sukarela ketika berinteraksi dengan layanan kami, termasuk nama, email, nomor telepon, dan data dokumen pada proses pembukaan akun.",
            "Data teknis saat mengakses website, seperti alamat IP, jenis browser, sistem operasi, halaman yang diakses, serta waktu akses untuk kebutuhan keamanan dan operasional.",
            "Data transaksi dan komunikasi terkait layanan perdagangan berjangka sesuai ketentuan regulator yang berlaku.",
          ],
        },
        {
          title: "2. Cara Kami Menggunakan Informasi",
          points: [
            "Memproses permintaan Anda, termasuk pendaftaran, verifikasi, layanan nasabah, serta penyampaian informasi operasional.",
            "Menjalankan kewajiban hukum, kepatuhan, audit internal, dan pelaporan kepada otoritas terkait.",
            "Meningkatkan performa, keamanan, dan pengalaman pengguna pada website serta layanan digital PT. Solid Gold Berjangka.",
          ],
        },
        {
          title: "3. Pengungkapan Informasi",
          points: [
            "Kami tidak menjual data pribadi Anda.",
            "Informasi dapat dibagikan kepada pihak ketiga yang relevan untuk operasional layanan, kewajiban hukum, dan kepatuhan regulator.",
            "Dalam kondisi tertentu, kami dapat mengungkapkan informasi apabila diwajibkan oleh hukum atau permintaan resmi dari instansi berwenang.",
          ],
        },
        {
          title: "4. Cookie dan Teknologi Pihak Ketiga",
          points: [
            "Website ini dapat menggunakan cookie untuk menjaga sesi, preferensi bahasa, dan peningkatan performa.",
            "Website kami juga memuat layanan pihak ketiga seperti Google Maps, TradingView, YouTube, dan TikTok yang memiliki kebijakan privasi masing-masing.",
            "Anda dapat mengatur cookie melalui browser, namun beberapa fitur mungkin tidak berfungsi optimal.",
          ],
        },
        {
          title: "5. Keamanan Data",
          points: [
            "Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data dari akses, perubahan, atau pengungkapan tanpa izin.",
            "Meskipun demikian, tidak ada metode transmisi data melalui internet yang sepenuhnya bebas risiko.",
          ],
        },
        {
          title: "6. Hak Anda",
          points: [
            "Anda dapat mengajukan permintaan akses, pembaruan, atau koreksi data pribadi sesuai peraturan yang berlaku.",
            "Untuk permintaan terkait privasi data, silakan hubungi kami melalui kontak resmi di bawah.",
          ],
        },
        {
          title: "7. Perubahan Kebijakan Privasi",
          points: [
            "Kebijakan Privasi ini dapat diperbarui sewaktu-waktu untuk menyesuaikan perubahan layanan, teknologi, atau regulasi.",
            "Versi terbaru akan dipublikasikan pada halaman ini dengan tanggal berlaku terbaru.",
          ],
        },
      ]
    : [
        {
          title: "1. Information We Collect",
          points: [
            "Identity and contact information you voluntarily provide when interacting with our services, including name, email, phone number, and account opening document data.",
            "Technical data when you access this website, such as IP address, browser type, operating system, visited pages, and access time for security and operational purposes.",
            "Transaction and communication data related to futures brokerage services, in line with applicable regulatory requirements.",
          ],
        },
        {
          title: "2. How We Use Information",
          points: [
            "To process your requests, including registration, verification, client support, and operational communication.",
            "To fulfill legal, compliance, internal audit, and reporting obligations to relevant authorities.",
            "To improve website performance, security, and user experience across PT. Solid Gold Berjangka digital services.",
          ],
        },
        {
          title: "3. Information Disclosure",
          points: [
            "We do not sell your personal data.",
            "Information may be shared with relevant third parties for service operations, legal obligations, and regulatory compliance.",
            "In certain circumstances, information may be disclosed when required by law or by official requests from authorized institutions.",
          ],
        },
        {
          title: "4. Cookies and Third-Party Technologies",
          points: [
            "This website may use cookies to maintain sessions, language preferences, and performance optimization.",
            "Our website also embeds third-party services such as Google Maps, TradingView, YouTube, and TikTok, each with their own privacy policies.",
            "You can manage cookie preferences through your browser settings, though some features may not work optimally.",
          ],
        },
        {
          title: "5. Data Security",
          points: [
            "We apply reasonable technical and organizational safeguards to protect data from unauthorized access, alteration, or disclosure.",
            "However, no internet data transmission method is entirely risk-free.",
          ],
        },
        {
          title: "6. Your Rights",
          points: [
            "You may request access, updates, or corrections to your personal data in accordance with applicable regulations.",
            "For privacy-related requests, please contact us through the official contact details below.",
          ],
        },
        {
          title: "7. Changes to This Privacy Policy",
          points: [
            "This Privacy Policy may be updated from time to time to reflect changes in services, technology, or regulations.",
            "The latest version will be published on this page with the current effective date.",
          ],
        },
      ];

  return (
    <PageTemplates title={t("privacy.title")}>
      <section className="rounded-2xl border border-neutral-700 bg-neutral-900/70 p-6 md:p-10 text-gray-200" data-aos="fade-up">
        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-500">PT. Solid Gold Berjangka</p>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">{t("privacy.title")}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">{t("privacy.intro")}</p>

        <div className="mt-3 text-sm text-gray-400">
          {isId ? "Tanggal Berlaku" : "Effective Date"}: {effectiveDate}
        </div>

        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-xl border border-neutral-800 bg-black/20 p-5">
              <h2 className="text-lg font-semibold text-white md:text-xl">{section.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300 md:text-base">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="mt-8 rounded-xl border border-yellow-500/40 bg-yellow-500/5 p-5">
          <h2 className="text-lg font-semibold text-white md:text-xl">{isId ? "8. Hubungi Kami" : "8. Contact Us"}</h2>
          <div className="mt-3 space-y-1 text-sm text-gray-200 md:text-base">
            <p>PT. Solid Gold Berjangka</p>
            <p>TCC Batavia, Tower One Lt. 10</p>
            <p>Jl. K.H. Mas Mansyur Kav. 126, Jakarta Pusat 10220</p>
            <p>Email: corporate@solidgold.co.id</p>
            <p>Telepon: 021-29675088</p>
          </div>
        </article>
      </section>
    </PageTemplates>
  );
}
