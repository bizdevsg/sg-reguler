import { ProductCardImage } from "@/components/atoms/ProductCardImage";
import type { HomeProduct } from "@/types/product";
import { ButtonLink } from "@/components/atoms/ButtonLink";

export function HomeProductCard({
  product,
  href,
  detailLabel,
}: {
  product: HomeProduct;
  href: string;
  detailLabel: string;
}) {
  return (
    <article className="relative isolate min-h-64 overflow-hidden rounded-3xl border border-zinc-500/50 bg-linear-to-br from-zinc-900 to-[#30250b] p-6 sm:min-h-72 sm:p-8">
      <div className="absolute inset-0 bg-zinc-800/20" />
      {product.image && <ProductCardImage src={product.image} />}

      <div
        className={`relative ${product.image ? "max-w-[60%]" : "max-w-full"}`}
      >
        <h4 className="text-xl font-bold leading-snug sm:text-2xl text-shadow-sm text-shadow-black">
          {product.title}
        </h4>

        <div className="mt-3 h-px w-16 bg-yellow-500" />

        {product.description && (
          <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-zinc-100 text-shadow-sm text-shadow-black">
            {product.description}
          </p>
        )}

        <ButtonLink
          href={href}
          variant="ghost"
          size="sm"
          className="mt-5 backdrop-blur-lg"
        >
          {detailLabel}
        </ButtonLink>
      </div>
    </article>
  );
}
