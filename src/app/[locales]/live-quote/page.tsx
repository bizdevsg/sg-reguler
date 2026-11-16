import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionContainer } from "@/components/atoms/SectionContainer";
import { LiveQuoteTable } from "@/components/organisms/LiveQuoteTable";
import { PageHeroBanner } from "@/components/organisms/PageHeroBanner";
import { buildPublicMetadata } from "@/lib/metadata";
import {
  getMessages,
  isSupportedLocale,
  SUPPORTED_LOCALES,
  type AppLocale,
} from "@/locales";

type LiveQuotePageProps = {
  params: Promise<{ locales: string }>;
};

function assertValidLocale(value: string): asserts value is AppLocale {
  if (!isSupportedLocale(value)) {
    notFound();
  }
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locales) => ({ locales }));
}

export async function generateMetadata({
  params,
}: LiveQuotePageProps): Promise<Metadata> {
  const { locales } = await params;
  assertValidLocale(locales);

  const messages = getMessages(locales);

  return buildPublicMetadata({
    title: messages.liveQuotePage.breadcrumb,
    description: messages.liveQuoteSection.subtitle,
    locale: locales,
    path: `/${locales}/live-quote`,
  });
}

export default async function LiveQuotePage({ params }: LiveQuotePageProps) {
  const { locales } = await params;
  assertValidLocale(locales);

  const messages = getMessages(locales);

  return (
    <>
      <PageHeroBanner
        eyebrow={messages.liveQuoteSection.eyebrow}
        title={messages.liveQuoteSection.title}
        description={messages.liveQuoteSection.subtitle}
        className="pb-16 pt-28 md:pb-20 md:pt-36"
      />

      <div className="relative">
        <div className="absolute w-full h-50 bg-linear-to-b from-black to-transparent" />
        <SectionContainer className="relative pb-20 pt-10">
          <LiveQuoteTable locale={locales} mode="full" />
        </SectionContainer>
      </div>
    </>
  );
}
