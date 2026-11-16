import { SectionContainer } from "@/components/atoms/SectionContainer";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { HomeProductCategory } from "@/components/molecules/HomeProductCategory";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { getHomeProducts } from "@/lib/products";
import { getMessages, type AppLocale } from "@/locales";

export async function HomeProductsSection({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);
  const copy = messages.homeProducts;
  const products = await getHomeProducts(locale);
  const categories = ["multilateral", "bilateral"] as const;

  return (
    <section id="products" className="scroll-mt-24 py-16 text-white sm:py-20">
      <SectionContainer>
        <ScrollReveal
          effect="fade-up"
          className="mx-auto max-w-4xl text-center"
        >
          <SectionEyebrow align="center">{copy.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
            {copy.description}
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-14 sm:mt-16">
          {categories.map((category) => (
            <HomeProductCategory
              key={category}
              title={messages.productPage.categories[category].title}
              products={products[category]}
              locale={locale}
              category={category === "multilateral" ? "jfx" : "spa"}
              detailLabel={messages.productPage.viewDetailCta}
              viewAllLabel={messages.productPage.viewAllCta}
              previousLabel={copy.previousProducts}
              nextLabel={copy.nextProducts}
              emptyTitle={messages.productPage.emptyTitle}
              emptyBody={messages.productPage.emptyBody}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
