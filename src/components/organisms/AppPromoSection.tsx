import Image from "next/image";
import {
  getMessages,
  getSolidGoldAppPageContent,
  type AppLocale,
} from "@/locales";
import { SectionContainer } from "../atoms/SectionContainer";
import { ScrollReveal } from "../molecules/ScrollReveal";

type AppPromoSectionProps = {
  locale: AppLocale;
};

export function AppPromoSection({ locale }: AppPromoSectionProps) {
  const messages = getMessages(locale).appPromoSection;
  const primaryPlatform = getSolidGoldAppPageContent(locale).platforms.items[0];
  const googlePlayLink = primaryPlatform?.stores[0]?.href ?? "#";
  const appStoreLink = primaryPlatform?.stores[1]?.href ?? "#";

  return (
    <SectionContainer className="pb-14 md:pb-18">
      <ScrollReveal effect="fade-up">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-yellow-500/50 bg-black bg-cover bg-center shadow-xl shadow-black/50"
          style={{
            backgroundImage: "url('/assets/bg-app.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex min-h-[22rem] flex-col items-center gap-6 px-5 py-8 text-center sm:px-8 md:min-h-[24rem] md:flex-row md:items-center md:justify-between md:gap-4 md:px-10 md:py-0 md:text-left lg:px-16">
            <div className="order-2 max-w-xl md:order-1 md:flex-1">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
                {messages.title}
                <span className="block text-yellow-400">
                  {messages.titleHighlight}
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-300 sm:text-base">
                {messages.description}{" "}
                <strong className="font-bold text-white">
                  {messages.descriptionHighlight}
                </strong>
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href={googlePlayLink} target="_blank" rel="noreferrer">
                  <Image
                    src="/assets/gp-button.png"
                    alt={messages.googlePlayAlt}
                    width={5514}
                    height={1612}
                    sizes="(max-width: 640px) 144px, 160px"
                    className="h-auto w-36 object-contain sm:w-40"
                  />
                </a>

                <a href={appStoreLink} target="_blank" rel="noreferrer">
                  <Image
                    src="/assets/as-button.png"
                    alt={messages.appStoreAlt}
                    width={5514}
                    height={1612}
                    sizes="(max-width: 640px) 144px, 160px"
                    className="h-auto w-36 object-contain sm:w-40"
                  />
                </a>
              </div>
            </div>

            <div className="order-1 relative w-full max-w-[17rem] shrink-0 sm:max-w-[19rem] md:order-2 md:max-w-[22rem] lg:max-w-[26rem]">
              <Image
                src="/assets/hp-protrader.webp"
                width={1080}
                height={1080}
                alt={messages.imageAlt}
                sizes="(max-width: 640px) 272px, (max-width: 1024px) 352px, 416px"
                className="mx-auto h-auto max-h-[18rem] w-full object-contain sm:max-h-[20rem] md:max-h-[26rem] lg:max-h-[28rem]"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionContainer>
  );
}
