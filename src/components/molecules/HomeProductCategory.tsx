import { EmptyStatePanel } from "@/components/molecules/EmptyStatePanel";
import { HomeProductSlider } from "@/components/molecules/HomeProductSlider";
import type { HomeProduct } from "@/types/product";
import type { ProductCategory } from "@/types/product";
import type { AppLocale } from "@/locales";

type HomeProductCategoryProps = {
  title: string;
  products: HomeProduct[] | null;
  emptyTitle: string;
  emptyBody: string;
  locale: AppLocale;
  category: ProductCategory;
  detailLabel: string;
  viewAllLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export function HomeProductCategory({
  title,
  products,
  emptyTitle,
  emptyBody,
  locale,
  category,
  detailLabel,
  viewAllLabel,
  previousLabel,
  nextLabel,
}: HomeProductCategoryProps) {
  const items = products?.slice(0, 3);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">{title}</h3>

        <a
          href={`/${locale}/product/${category}`}
          rel="noopener noreferrer"
          className="text-yellow-500 hover:text-yellow-300 transition-all duration-300"
        >
          {viewAllLabel}
        </a>
      </div>
      {!items?.length ? (
        <EmptyStatePanel title={emptyTitle} body={emptyBody} />
      ) : (
        <HomeProductSlider
          items={items}
          locale={locale}
          category={category}
          detailLabel={detailLabel}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
          title={title}
        />
      )}
    </div>
  );
}
