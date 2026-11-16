import type { ReactNode } from "react";

type RepresentativeStatePanelProps = {
  icon: ReactNode;
  title: string;
  body: string;
};

export function RepresentativeStatePanel({
  icon,
  title,
  body,
}: RepresentativeStatePanelProps) {
  return (
    <div className="border-y border-white/10 px-6 py-16 text-center sm:py-20">
      <span className="mx-auto flex size-8 items-center justify-center text-accent-strong">
        {icon}
      </span>
      <h2 className="mt-5 text-xl font-bold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/55">
        {body}
      </p>
    </div>
  );
}
