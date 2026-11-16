import { SectionContainer } from "@/components/atoms/SectionContainer";
import { EmptyStatePanel } from "@/components/molecules/EmptyStatePanel";
import { HomeProductCard } from "@/components/molecules/HomeProductCard";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { getMessages, type AppLocale } from "@/locales";
import type { HomeProduct, ProductCategory } from "@/types/product";

type Props = { locale: AppLocale; category: ProductCategory; products: HomeProduct[] | null };

export function ProductCategorySection({ locale, category, products }: Props) {
  const copy = getMessages(locale).productPage;
  return (
    <section className="pb-20 pt-8 text-white sm:pt-12">
      <SectionContainer>
        {products === null ? (
          <EmptyStatePanel title={copy.categoryErrorTitle} body={copy.categoryErrorBody} />
        ) : products.length === 0 ? (
          <EmptyStatePanel title={copy.emptyTitle} body={copy.emptyBody} />
        ) : (
          <>
            <p className="mb-6 text-sm text-zinc-400">{products.length} {copy.countLabel}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ScrollReveal key={product.id} effect="fade-up" delay={(index % 3) * 100}>
                  <HomeProductCard product={product} href={`/${locale}/product/${category}/${encodeURIComponent(product.slug)}`} detailLabel={copy.viewDetailCta} />
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </SectionContainer>
    </section>
  );
}
