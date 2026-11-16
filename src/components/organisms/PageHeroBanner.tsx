import type { ReactNode } from "react";

import { SectionContainer } from "@/components/atoms/SectionContainer";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";

type PageHeroBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  backgroundImageUrl?: string;
  className?: string;
  children?: ReactNode;
};

export function PageHeroBanner({
  eyebrow,
  title,
  description,
  backgroundImageUrl = "/assets/Banner Paten Web Solid New-Figma-4.webp",
  className = "py-20 md:py-24",
  children,
}: PageHeroBannerProps) {
  return (
    <div
      className={`relative bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />

      <SectionContainer className="relative z-10 text-center">
        {eyebrow ? (
          <SectionEyebrow align="center">{eyebrow}</SectionEyebrow>
        ) : null}
        <h1 className="mt-4 font-mono text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-300">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </SectionContainer>
    </div>
  );
}
