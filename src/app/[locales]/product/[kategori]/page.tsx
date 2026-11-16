import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeroBanner } from "@/components/organisms/PageHeroBanner";
import { ProductCategorySection } from "@/components/organisms/ProductCategorySection";
import { buildPublicMetadata } from "@/lib/metadata";
import { getCategoryProducts } from "@/lib/products";
import { getMessages, isSupportedLocale } from "@/locales";
import type { AppLocale } from "@/locales";
import type { ProductCategory } from "@/types/product";

type PageProps = { params: Promise<{ locales: string; kategori: string }> };

async function resolveParams(
  params: PageProps["params"],
): Promise<{ locale: AppLocale; category: ProductCategory }> {
  const { locales, kategori } = await params;
  if (!isSupportedLocale(locales) || (kategori !== "jfx" && kategori !== "spa"))
    notFound();
  return { locale: locales, category: kategori };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, category } = await resolveParams(params);
  const copy =
    getMessages(locale).productPage.categories[
      category === "jfx" ? "multilateral" : "bilateral"
    ];
  return buildPublicMetadata({
    title: copy.title,
    description: copy.description,
    locale,
    path: `/${locale}/product/${category}`,
  });
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { locale, category } = await resolveParams(params);
  const copy =
    getMessages(locale).productPage.categories[
      category === "jfx" ? "multilateral" : "bilateral"
    ];
  const products = await getCategoryProducts(category, locale);

  return (
    <>
      <PageHeroBanner
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        className="pb-16 pt-28 md:pb-20 md:pt-36"
      />

      <div className="relative">
        <div className="absolute top-0 w-full h-50 bg-linear-to-b from-black to-transparent" />

        <div className="relative">
          <ProductCategorySection
            locale={locale}
            category={category}
            products={products}
          />
        </div>
      </div>
    </>
  );
}
