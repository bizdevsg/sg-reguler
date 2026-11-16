import "server-only";

import { cache } from "react";
import { PRODUCT_API_URL, getProductAssetUrl } from "@/lib/env";
import { getSgAdminApiHeaders } from "@/lib/sg-admin-api";
import type { AppLocale } from "@/locales";
import type { HomeProduct, ProductCategory, ProductDetail } from "@/types/product";

type ApiProduct = {
  id: number;
  slug: string;
  nama_produk: string;
  deskripsi_produk?: string | null;
  deskripsi_produk_id?: string | null;
  deskripsi_produk_en?: string | null;
  image_url?: string | null;
  specs?: string | null;
  created_at?: string | null;
};

function normalizeProduct(item: Partial<ApiProduct>, locale: AppLocale): ProductDetail | null {
  if (typeof item.id !== "number" || typeof item.slug !== "string" || !item.slug.trim() || typeof item.nama_produk !== "string" || !item.nama_produk.trim()) return null;
  const description = (locale === "en" ? item.deskripsi_produk_en : item.deskripsi_produk_id) || item.deskripsi_produk || "";
  return {
    id: String(item.id),
    slug: item.slug.trim(),
    title: item.nama_produk.trim(),
    description: typeof description === "string" ? description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "",
    image: typeof item.image_url === "string" && item.image_url.trim() ? getProductAssetUrl(item.image_url) : "",
    specs: typeof item.specs === "string" ? item.specs : "",
  };
}

export async function getCategoryProducts(category: ProductCategory, locale: AppLocale): Promise<HomeProduct[] | null> {
  try {
    const response = await fetch(`${PRODUCT_API_URL.replace(/\/+$/, "")}/${category}`, {
      headers: await getSgAdminApiHeaders(),
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("data" in payload) || !Array.isArray(payload.data)) return null;

    const meta = "meta" in payload && payload.meta && typeof payload.meta === "object" ? payload.meta : null;
    const lastPage = meta && "last_page" in meta && typeof meta.last_page === "number" ? meta.last_page : 1;
    if (!Number.isInteger(lastPage) || lastPage < 1) return null;
    const additionalPages = await Promise.all(
      Array.from({ length: lastPage - 1 }, async (_, index) => {
        const url = new URL(`${PRODUCT_API_URL.replace(/\/+$/, "")}/${category}`);
        url.searchParams.set("page", String(index + 2));
        const page = await fetch(url, {
          headers: await getSgAdminApiHeaders(),
          next: { revalidate: 300 },
          signal: AbortSignal.timeout(8_000),
        });
        if (!page.ok) throw new Error("Product page unavailable");
        const body: unknown = await page.json();
        if (!body || typeof body !== "object" || !("data" in body) || !Array.isArray(body.data)) throw new Error("Invalid product page");
        return body.data as unknown[];
      }),
    );
    const rows: unknown[] = [...payload.data, ...additionalPages.flat()];
    rows.sort((a, b) => {
      const date = (value: unknown) => {
        if (!value || typeof value !== "object" || !("created_at" in value) || typeof value.created_at !== "string") return Infinity;
        const parsed = Date.parse(value.created_at);
        return Number.isNaN(parsed) ? Infinity : parsed;
      };
      return date(a) - date(b);
    });

    return rows.flatMap((value: unknown): HomeProduct[] => {
      if (!value || typeof value !== "object") return [];
      const item = value as Partial<ApiProduct>;
      const product = normalizeProduct(item, locale);
      return product ? [product] : [];
    });
  } catch {
    return null;
  }
}

export const getProductDetail = cache(async (category: ProductCategory, slug: string, locale: AppLocale): Promise<{ product: ProductDetail | null; error: boolean }> => {
  try {
    const response = await fetch(`${PRODUCT_API_URL.replace(/\/+$/, "")}/${category}/${encodeURIComponent(slug)}`, {
      headers: await getSgAdminApiHeaders(),
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });
    if (response.status === 404) {
      const products = await getCategoryProducts(category, locale);
      if (products === null) return { product: null, error: true };
      const item = products.find((product) => product.slug === slug);
      return { product: item ? { ...item, specs: "" } : null, error: false };
    }
    if (!response.ok) return { product: null, error: true };
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("data" in payload) || !payload.data || typeof payload.data !== "object") return { product: null, error: true };
    const product = normalizeProduct(payload.data as Partial<ApiProduct>, locale);
    return { product, error: !product };
  } catch {
    return { product: null, error: true };
  }
});

export async function getHomeProducts(locale: AppLocale) {
  const [multilateral, bilateral] = await Promise.all([
    getCategoryProducts("jfx", locale),
    getCategoryProducts("spa", locale),
  ]);
  return { multilateral, bilateral };
}
