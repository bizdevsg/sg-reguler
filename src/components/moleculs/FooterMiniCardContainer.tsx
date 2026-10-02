import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";

export default function FooterMiniCardContainer() {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-start gap-3 w-full">
      <a href="https://www.komdigi.go.id/">
        <div className="bg-gradient-to-br w-full from-white via-zinc-100 to-zinc-200 p-3 rounded-2xl shadow-xl border border-zinc-300 w-fit hover:scale-105 hover:shadow-2xl transition transform duration-300 ease-in-out">
          <Image
            src="/assets/logo-komdigi.png"
            alt={t("footer.logoKomdigiAlt")}
            width={3840}
            height={2687}
            className="h-10 w-auto drop-shadow-lg"
          />
        </div>
      </a>
      <a
        href="https://layanan.kan.or.id/sertifikat/14895"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="bg-gradient-to-br w-full from-white via-zinc-100 to-zinc-200 p-3 rounded-2xl shadow-xl border border-zinc-300 w-fit hover:scale-105 hover:shadow-2xl transition transform duration-300 ease-in-out">
          <Image
            src="/assets/ISMS 24137 PT_SGB.png"
            alt={t("footer.logoKanAlt")}
            width={1534}
            height={682}
            className="h-10 w-auto drop-shadow-lg"
          />
        </div>
      </a>
    </div>
  );
}
