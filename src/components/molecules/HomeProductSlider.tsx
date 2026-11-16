"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HomeProductCard } from "@/components/molecules/HomeProductCard";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import type { AppLocale } from "@/locales";
import type { HomeProduct, ProductCategory } from "@/types/product";

type Props = {
  items: HomeProduct[];
  locale: AppLocale;
  category: ProductCategory;
  detailLabel: string;
  previousLabel: string;
  nextLabel: string;
  title: string;
};

export function HomeProductSlider({
  items,
  locale,
  category,
  detailLabel,
  previousLabel,
  nextLabel,
  title,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ previous: false, next: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () =>
      setPosition({
        previous: track.scrollLeft > 1,
        next: track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
      });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [items.length]);

  function move(direction: number) {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (first.offsetWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  const buttonClass =
    "inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-yellow-500 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400";

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label={title}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
      >
        {items.map((item, index) => (
          <ScrollReveal
            key={item.id}
            className="w-full shrink-0 snap-start"
            effect="fade-up"
            delay={(index % 3) * 100}
          >
            <HomeProductCard
              product={item}
              href={`/${locale}/product/${category}/${encodeURIComponent(item.slug)}`}
              detailLabel={detailLabel}
            />
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-3 flex justify-end gap-2 sm:hidden">
        <button
          type="button"
          className={buttonClass}
          onClick={() => move(-1)}
          disabled={!position.previous}
          aria-label={previousLabel}
        >
          <ChevronLeft aria-hidden="true" size={20} />
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => move(1)}
          disabled={!position.next}
          aria-label={nextLabel}
        >
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>
    </div>
  );
}
