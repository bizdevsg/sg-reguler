import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionContainer } from "@/components/atoms/SectionContainer";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { EmptyStatePanel } from "@/components/molecules/EmptyStatePanel";
import { ProductSpecifications } from "@/components/molecules/ProductSpecifications";
import { PageHeroBanner } from "@/components/organisms/PageHeroBanner";
import { buildPublicMetadata } from "@/lib/metadata";
import { getProductDetail } from "@/lib/products";
import { getMessages, isSupportedLocale } from "@/locales";
import type { AppLocale } from "@/locales";
import type { ProductCategory } from "@/types/product";

type PageProps = {
  params: Promise<{ locales: string; kategori: string; slug: string }>;
};

async function loadProduct(params: PageProps["params"]) {
  const { locales, kategori, slug } = await params;
  if (!isSupportedLocale(locales) || (kategori !== "jfx" && kategori !== "spa"))
    notFound();
  const locale: AppLocale = locales;
  const category: ProductCategory = kategori;
  const result = await getProductDetail(category, slug, locale);
  if (!result.product && !result.error) notFound();
  return { locale, category, slug, ...result };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, category, slug, product } = await loadProduct(params);
  const messages = getMessages(locale);
  return buildPublicMetadata({
    title: product?.title ?? messages.productPage.breadcrumb,
    description: product?.description || messages.homeProducts.description,
    locale,
    path: `/${locale}/product/${category}/${encodeURIComponent(slug)}`,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, category, product, error } = await loadProduct(params);
  const messages = getMessages(locale);
  const copy = messages.productPage;
  const categoryCopy =
    copy.categories[category === "jfx" ? "multilateral" : "bilateral"];

  return (
    <>
      <PageHeroBanner className="py-10 md:py-6">
        {!error && product && (
          <div
            className={`grid items-center gap-8 text-left ${product.image ? "md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] md:gap-14" : ""}`}
          >
            <div className="flex flex-col py-0 sm:py-8 order-2 md:order-1">
              <p className="text-sm font-semibold text-yellow-400">
                {categoryCopy.title}
              </p>
              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                {product?.title ?? copy.breadcrumb}
              </h2>
              <div
                aria-hidden="true"
                className="mt-5 h-1 w-20 rounded-full bg-yellow-500"
              />
              {product.description && (
                <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-8 text-zinc-300">
                  {product.description}
                </p>
              )}
            </div>

            {product.image && (
              <div className="relative order-1 md:order-2 flex min-h-64 items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(202,149,34,0.14),transparent_70%)] py-0 sm:py-6 md:min-h-[380px]">
                <Image
                  src={product.image}
                  alt=""
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 75vw, 400px"
                  className="relative w-full max-w-[360px] object-contain"
                />
              </div>
            )}
          </div>
        )}
      </PageHeroBanner>

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black to-transparent"
        />
        <SectionContainer className="relative pb-20 text-white">
          <ButtonLink
            href={`/${locale}/product/${category}`}
            variant="ghost"
            size="sm"
            className="mt-8"
          >
            {copy.backToCatalogCta}
          </ButtonLink>
          {error || !product ? (
            <EmptyStatePanel
              className="mt-8"
              title={copy.detailErrorTitle}
              body={copy.detailErrorBody}
            />
          ) : product.specs ? (
            <ProductSpecifications
              html={product.specs}
              title={copy.specificationTitle}
              scrollHint={copy.specificationScrollHint}
            />
          ) : null}
        </SectionContainer>
      </div>
    </>
  );
}
