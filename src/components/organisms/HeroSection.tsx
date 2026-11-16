import Image from "next/image";

import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { getMessages, type AppLocale } from "@/locales";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { SectionContainer } from "../atoms/SectionContainer";

type HeroSectionProps = {
  locale: AppLocale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const messages = getMessages(locale);

  const HERO_FLOATING_CARDS = [
    {
      src: "/assets/floating-image/hero-1.webp",
      width: 680,
      height: 476,
      mobileClassName: "left-[7%] top-[10%] w-[20%]",
      desktopClassName: "left-[3.5rem] top-[5.75rem] w-[9rem]",
      animationClass: "animate-[hero-float_6.5s_ease-in-out_infinite]",
    },
    {
      src: "/assets/floating-image/hero-2.webp",
      width: 700,
      height: 532,
      mobileClassName: "right-[10%] top-[28%] w-[20%]",
      desktopClassName: "right-[8.5rem] top-[10rem] w-[9rem]",
      animationClass: "animate-[hero-float-alt_7.2s_ease-in-out_infinite]",
    },
    {
      src: "/assets/floating-image/hero-3.webp",
      width: 660,
      height: 484,
      mobileClassName: "left-[5%] top-[52%] w-[20%]",
      desktopClassName: "left-[1.5rem] bottom-[14.5rem] w-[9rem]",
      animationClass: "animate-[hero-float_7.6s_ease-in-out_infinite]",
    },
    {
      src: "/assets/floating-image/hero-4.webp",
      width: 700,
      height: 488,
      mobileClassName: "right-[10%] top-[72%] w-[20%]",
      desktopClassName: "right-[8.5rem] bottom-[10rem] w-[9.5rem]",
      animationClass: "animate-[hero-float-alt_6.8s_ease-in-out_infinite]",
    },
  ] as const;

  return (
    <div
      className="relative overflow-hidden bg-black bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('/assets/Banner Paten Web Solid New-Figma-4.webp')",
      }}
    >
      <SectionContainer className="relative pb-10 pt-24 sm:pb-12 sm:pt-28 md:pt-24 xl:pb-0 xl:pt-20">
        <div className="relative isolate z-10 flex flex-col gap-4 lg:min-h-[620px] lg:justify-center xl:min-h-[680px]">
          {/* Mobile Image */}
          <ScrollReveal
            className="relative order-1 mx-auto aspect-[820/741] w-full max-w-[520px] xl:hidden"
            effect="fade-left"
            delay={120}
          >
            <div className="pointer-events-none absolute inset-0 translate-x-4 sm:translate-x-6">
              <img
                src="/assets/Banner Paten Web Solid New-Figma-5-1.webp"
                alt={messages.hero.visualAlt}
                className="h-full w-full object-contain [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
              />

              {HERO_FLOATING_CARDS.map((card) => (
                <div
                  key={card.src}
                  className={`absolute ${card.mobileClassName} ${card.animationClass}`}
                >
                  <Image
                    src={card.src}
                    alt=""
                    width={card.width}
                    height={card.height}
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                    className="h-auto w-full object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.32)]"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Text Content */}
          <ScrollReveal
            className="relative order-2 z-20 mx-auto max-w-[22rem] text-center sm:max-w-[30rem] md:max-w-[38rem] lg:max-w-[34rem] xl:mx-0 xl:max-w-[48rem] xl:text-left"
            effect="fade-up"
          >
            <h1 className="font-mono text-3xl font-bold leading-[1.2] tracking-[-0.05em] sm:text-[3.2rem] md:text-[4rem] lg:text-[3rem] xl:text-[4rem]">
              <span className="text-yellow-500">{messages.hero.titleLead}</span>
              <br />
              <span className="text-white">{messages.hero.titleBody}</span>
            </h1>

            <p className="mt-3 max-w-xl text-center sm:text-lg text-white/85 text-shadow-lg text-shadow-black xl:text-left">
              {messages.hero.subTitle}
            </p>

            <div className="mt-5">
              <p className="font-bold text-white text-xl">
                {messages.hero.downloadTitle}
              </p>

              <div className="flex flex-col mx-auto xl:mx-0 sm:flex-row items-center gap-2 mt-2 sm:w-fit">
                <ButtonLink
                  href="https://regol.solidgold.co.id/"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-fit rounded-xl px-5 cursor-pointer"
                >
                  {messages.navbar.openAccount}
                </ButtonLink>

                <ButtonLink
                  href="https://demo.sgberjangka.com/login"
                  variant="ghost"
                  size="md"
                  className="w-full sm:w-fit rounded-xl px-5 cursor-pointer"
                >
                  {messages.hero.demoLoginCta}
                </ButtonLink>
              </div>

              <p className="text-white/50 text-xs mt-3">
                {messages.hero.demoDisclaimer}
              </p>
            </div>
          </ScrollReveal>

          {/* Desktop Image */}
          <ScrollReveal
            className="pointer-events-none absolute z-0 hidden xl:bottom-0 xl:-right-30 xl:block"
            aria-hidden="true"
            effect="fade-left"
            delay={160}
          >
            <img
              src="/assets/Banner Paten Web Solid New-Figma-5-1.webp"
              alt=""
              className="w-[600px] max-w-none object-contain xl:w-[760px]"
            />

            {HERO_FLOATING_CARDS.map((card) => (
              <div
                key={`${card.src}-desktop`}
                className={`absolute ${card.desktopClassName} ${card.animationClass}`}
              >
                <Image
                  src={card.src}
                  alt=""
                  width={card.width}
                  height={card.height}
                  sizes="256px"
                  className="h-auto w-40 object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.32)]"
                />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </SectionContainer>

      <div className="pointer-events-none absolute bottom-0 right-0 md:z-10 h-50 w-full bg-linear-to-t from-black to-transparent" />
    </div>
  );
}
