import type { Metadata } from "next";

import { RegulerInfoPageView } from "@/components/organisms/RegulerInfoPageView";
import {
  generateRegulerInfoMetadata,
  loadRegulerInfoPage,
  type RegulerInfoPageProps,
} from "@/lib/info-page";
import { SUPPORTED_LOCALES } from "@/locales";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locales) => ({ locales }));
}

export async function generateMetadata({
  params,
}: RegulerInfoPageProps): Promise<Metadata> {
  return generateRegulerInfoMetadata(
    params,
    "tampilanTransaksiOnline",
    "edukasi/tampilan-transaksi-online",
  );
}

export default async function OnlineTradingDisplayPage({
  params,
}: RegulerInfoPageProps) {
  const { page, labels } = await loadRegulerInfoPage(
    params,
    "tampilanTransaksiOnline",
  );

  return <RegulerInfoPageView page={page} labels={labels} />;
}
