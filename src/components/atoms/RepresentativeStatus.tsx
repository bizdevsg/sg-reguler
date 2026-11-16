type RepresentativeStatusProps = {
  status: string;
  label?: string;
};

export function RepresentativeStatus({
  status,
  label,
}: RepresentativeStatusProps) {
  const normalizedStatus = status.trim().toLowerCase();
  const active = normalizedStatus === "aktif" || normalizedStatus === "active";

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium ${
        active
          ? "text-emerald-300 before:size-1.5 before:rounded-full before:bg-emerald-400"
          : "text-rose-300 before:size-1.5 before:rounded-full before:bg-rose-400"
      }`}
    >
      {label || status || "—"}
    </span>
  );
}
