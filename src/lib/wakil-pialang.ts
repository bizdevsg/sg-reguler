import "server-only";

import { getSgAdminApiHeaders } from "@/lib/sg-admin-api";
import type {
  Representative,
  RepresentativeCategory,
  WakilPialangPageData,
} from "@/types/wakil-pialang";

type ApiResponse<T> = {
  data?: T;
};

const API_BASE_URL = (
  process.env.WAKIL_PIALANG_API_BASE_URL ??
  "https://sg-admin.sg-berjangka.com/api/v1/wakil-pialang-berjangka"
).replace(/\/+$/, "");

async function fetchApiData<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: await getSgAdminApiHeaders(),
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as ApiResponse<T>;
    return payload.data ?? null;
  } catch {
    return null;
  }
}

export async function getWakilPialangPageData(
  requestedBranch?: string,
): Promise<WakilPialangPageData> {
  const categories = await fetchApiData<RepresentativeCategory[]>(
    "/categories",
  );
  const categoryOptions = categories ?? [];
  const validCategorySlugs = new Set(
    categoryOptions.map((category) => category.slug),
  );
  const selectedCategory =
    requestedBranch && validCategorySlugs.has(requestedBranch)
      ? requestedBranch
      : categoryOptions[0]?.slug;
  const representativePath = selectedCategory
    ? `/categories/${encodeURIComponent(selectedCategory)}?per_page=100`
    : "/?per_page=100";

  return {
    categories: categoryOptions,
    selectedCategory,
    selectedCategoryInfo: categoryOptions.find(
      (category) => category.slug === selectedCategory,
    ),
    representatives:
      categories === null
        ? null
        : await fetchApiData<Representative[]>(representativePath),
  };
}
