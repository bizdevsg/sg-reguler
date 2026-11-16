import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RepresentativeOfficeTabs } from "@/components/molecules/RepresentativeOfficeTabs";
import { PageHeroBanner } from "@/components/organisms/PageHeroBanner";
import { WakilPialangDirectorySection } from "@/components/organisms/WakilPialangDirectorySection";
import {
  getMessages,
  isSupportedLocale,
  SUPPORTED_LOCALES,
  type AppLocale,
} from "@/locales";
import { buildPublicMetadata } from "@/lib/metadata";
import { getWakilPialangPageData } from "@/lib/wakil-pialang";

type PageProps = {
  params: Promise<{ locales: string }>;
  searchParams: Promise<{ branch?: string | string[] }>;
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
}: PageProps): Promise<Metadata> {
  const { locales } = await params;
  assertValidLocale(locales);
  const text = getMessages(locales).wakilPialangPage;

  return buildPublicMetadata({
    title: text.metadataTitle,
    description: text.description,
    locale: locales,
    path: `/${locales}/wakil-pialang-berjangka`,
  });
}

export default async function FuturesBrokerRepresentativesPage({
  params,
  searchParams,
}: PageProps) {
  const [{ locales }, query] = await Promise.all([params, searchParams]);
  assertValidLocale(locales);

  const text = getMessages(locales).wakilPialangPage;
  const requestedBranch = Array.isArray(query.branch)
    ? query.branch[0]
    : query.branch;
  const data = await getWakilPialangPageData(requestedBranch);

  return (
    <>
      <PageHeroBanner
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-50 bg-linear-to-b from-black to-transparent" />

        <div className="relative z-10">
          <WakilPialangDirectorySection
            representatives={data.representatives}
            selectedCategoryInfo={data.selectedCategoryInfo}
            text={text}
          />
        </div>
      </div>
    </>
  );
}
