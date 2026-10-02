// pages/produk/[kategoriProduk]/index.tsx

import Header from "@/components/moleculs/Header";
import ProdukContainer from "@/components/organism/ProdukContainer";
import PageTemplates from "@/components/templates/PageTemplates";
import type { GetServerSideProps } from "next";
import { useI18n } from "@/i18n/useI18n";

type PageProps = {
    kategoriProduk: "multilateral" | "bilateral";
};

export default function ProdukByKategoriPage({ kategoriProduk }: PageProps) {
    const { t } = useI18n();
    const isMultilateral = kategoriProduk === "multilateral";
    const pageTitle = isMultilateral ? t("product.multilateralTitle") : t("product.bilateralTitle");
    const headerTitle = isMultilateral
        ? t("product.multilateralHeader")
        : t("product.bilateralHeader");

    return (
        <PageTemplates title={pageTitle}>
            <Header title={headerTitle} subtitle={t("banner.company")} />
            <ProdukContainer kategoriProduk={kategoriProduk} />
        </PageTemplates>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
    const raw = ctx.params?.kategoriProduk;
    const slug = String(Array.isArray(raw) ? raw[0] : raw).toLowerCase().trim();

    if (slug !== "multilateral" && slug !== "bilateral") {
        return { notFound: true };
    }

    return { props: { kategoriProduk: slug as "multilateral" | "bilateral" } };
};
