import type { AppMessages } from "@/locales";
import type { Representative } from "@/types/wakil-pialang";

type RepresentativeRecordRowProps = {
  index: number;
  representative: Representative;
  text: AppMessages["wakilPialangPage"];
};

export function RepresentativeRecordRow({
  index,
  representative,
  text,
}: RepresentativeRecordRowProps) {
  const initials = representative.nama.trim().split(/\s+/).slice(0, 2)
    .map((part) => Array.from(part)[0] ?? "").join("").toUpperCase();
  const status = representative.status.trim().toLowerCase();
  const active = status === "aktif" || status === "active";

  return (
    <li>
      <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[linear-gradient(155deg,rgba(27,27,27,0.95),rgba(8,8,8,0.98))] p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_18px_45px_rgba(205,161,58,0.1)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-400/[0.08] text-sm font-bold text-amber-300">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="break-words text-lg font-bold leading-snug text-white transition-colors group-hover:text-amber-300">
                {representative.nama}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-400/80">
                {text.metadataTitle}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-zinc-600">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs">
          <span className={`rounded-full border px-2.5 py-1 font-semibold ${active ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300" : "border-rose-400/20 bg-rose-400/[0.08] text-rose-300"}`}>
            {representative.status_label || representative.status || "—"}
          </span>
          <span className="break-all font-medium text-zinc-300" aria-label={`${text.license}: ${representative.no_identitas || "—"}`}>
            {representative.no_identitas || "—"}
          </span>
        </div>
      </article>
    </li>
  );
}
