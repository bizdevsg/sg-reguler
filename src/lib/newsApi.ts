export type NewsLocale = "id" | "en";

export function normalizeNewsLocale(locale?: string): NewsLocale {
  return locale === "en" ? "en" : "id";
}

export function newsApiLangParam(locale?: string): string {
  return `lang=${normalizeNewsLocale(locale)}`;
}

export function newsApiListUrl(locale?: string): string {
  return `/api/berita?${newsApiLangParam(locale)}`;
}

export function newsApiDetailUrl(slug: string, locale?: string): string {
  return `/api/berita/${encodeURIComponent(slug)}?${newsApiLangParam(locale)}`;
}
