import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildPublicMetadata } from "@/lib/metadata";
import {
  getRegulerInfoPagesContent,
  isSupportedLocale,
  type AppLocale,
  type RegulerInfoPageKey,
} from "@/locales";

export type RegulerInfoPageProps = {
  params: Promise<{ locales: string }>;
};

export async function loadRegulerInfoPage(
  params: RegulerInfoPageProps["params"],
  key: RegulerInfoPageKey,
) {
  const { locales } = await params;
  if (!isSupportedLocale(locales)) notFound();

  const locale: AppLocale = locales;
  const content = getRegulerInfoPagesContent(locale);

  return { locale, labels: content.labels, page: content.pages[key] };
}

export async function generateRegulerInfoMetadata(
  params: RegulerInfoPageProps["params"],
  key: RegulerInfoPageKey,
  subpath: string,
): Promise<Metadata> {
  const { locale, page } = await loadRegulerInfoPage(params, key);

  return buildPublicMetadata({
    title: page.meta.title,
    description: page.meta.description,
    locale,
    path: `/${locale}/${subpath}`,
  });
}
