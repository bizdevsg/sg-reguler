import Link from "next/link";

import type { AppLocale } from "@/locales";
import type { RepresentativeCategory } from "@/types/wakil-pialang";

type RepresentativeOfficeTabsProps = {
  ariaLabel: string;
  categories: RepresentativeCategory[];
  label: string;
  locale: AppLocale;
  selectedCategory?: string;
};

export function RepresentativeOfficeTabs({
  ariaLabel,
  categories,
  label,
  locale,
  selectedCategory,
}: RepresentativeOfficeTabsProps) {
  return (
    <div className="border-y border-white/10">
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-8">
        <p className="shrink-0 text-2xs font-semibold uppercase tracking-[0.18em] text-white/40">
          {label}
        </p>
        <nav
          aria-label={ariaLabel}
          className="flex gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category, index) => {
            const selected = category.slug === selectedCategory;
            const href =
              index === 0
                ? `/${locale}/wakil-pialang-berjangka`
                : `/${locale}/wakil-pialang-berjangka?branch=${encodeURIComponent(category.slug)}`;

            return (
              <Link
                key={category.id}
                href={href}
                aria-current={selected ? "page" : undefined}
                className={`relative shrink-0 py-2 text-sm font-medium ${
                  selected
                    ? "text-white after:absolute after:inset-x-0 after:-bottom-4 after:h-px after:bg-accent"
                    : "text-white/45 hover:text-white"
                }`}
              >
                {category.nama_kategori}
                <span className="ml-2 text-xs tabular-nums text-white/25">
                  {category.wakil_pialangs_count ?? 0}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
