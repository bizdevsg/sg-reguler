import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { SectionContainer } from "@/components/atoms/SectionContainer";
import { BRAND_NAME, footerContent } from "@/data/footer";
import { useI18n } from "@/i18n/useI18n";
import { ChevronRight, Info } from "lucide-react";

export function FooterSection() {
  const { locale, t } = useI18n();
  const footer = footerContent[locale] ?? footerContent.id;

  // Subset menu Navbar.
  const quickLinks = [
    { label: t("nav.about.broker"), href: "/tentang-kami/wakil-pialang" },
    { label: t("nav.products.multilateral"), href: "/produk/multilateral" },
    { label: t("nav.products.bilateral"), href: "/produk/bilateral" },
  ];

  return (
    <footer className="border-t border-line bg-black">
      <SectionContainer className="py-10 sm:py-12">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.5fr_2fr_0.8fr_0.8fr]">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/assets/logo-utama.png"
                  alt={footer.logoAlt}
                  priority
                  sizes="220px"
                  width={500}
                  height={500}
                  className="h-auto w-70 object-contain"
                />
              </Link>

              <p className="text-sm text-white/80 leading-7">{footer.desc}</p>

              <div className="space-y-3">
                <h6 className="font-bold text-yellow-500">{footer.socialsTitle}</h6>

                <div className="grid grid-cols-5 gap-4">
                  {footer.socials.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      title={item.name}
                      aria-label={item.name}
                      className="inline-flex max-w-15 h-auto w-full aspect-square items-center justify-center rounded-full border-2 border-yellow-500 hover:border-yellow-800 text-yellow-500 transition-colors hover:text-yellow-800 mx-auto"
                    >
                      <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h6 className="font-bold text-yellow-500">{footer.legalTitle}</h6>

              <ul className="mt-5">
                {footer.legalItems.map((item) => (
                  <li
                    key={`${item.label}-${item.number}`}
                    className="text-xs leading-7 text-white/70"
                  >
                    <span className="font-semibold text-white/85">{item.label}:</span>{" "}
                    {item.number}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-bold text-yellow-500">{footer.brandTitle}</h6>

              <ul className="mt-5 space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.label} className="text-sm leading-7 text-white/70">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-5 text-yellow-500" />

                      <Link href={item.href} className="hover:underline">
                        {item.label}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {/* Certification */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-xl bg-white p-3">
                  <Image
                    src="/assets/logo-komdigi.png"
                    alt={footer.komdigiAlt}
                    width={100}
                    height={29}
                    className="h-10 max-h-10 w-auto object-contain"
                  />
                </div>

                <div className="flex items-center justify-center rounded-xl bg-white p-3">
                  <Image
                    src="/assets/logo TSI.png"
                    alt={footer.tsiAlt}
                    width={100}
                    height={29}
                    className="h-10 max-h-10 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border border-yellow-50/50" />

          <div className="space-y-2 rounded-lg bg-red-950 p-4 text-xs text-zinc-100">
            <div className="flex items-start gap-2">
              <Info className="text-yellow-500" />
              <p className="mt-1"><span className="text-yellow-500 font-semibold">{footer.disclaimerLabel}</span> <span>{footer.disclaimerBody}</span></p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
            <div className="text-center text-white md:text-left">
              <p>
                &copy; {new Date().getFullYear()}{" "}
                {BRAND_NAME}.{" "}
                {footer.copyrightProtected}
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
