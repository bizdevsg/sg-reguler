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
        : sortLikeBackOffice(
            await fetchApiData<Representative[]>(representativePath),
          ),
  };
}

function createdAtTime(representative: Representative) {
  const time = Date.parse(representative.created_at ?? "");
  return Number.isNaN(time) ? -Infinity : time;
}

// Same order as the SG Admin back office: newest created_at first. Records are
// often imported in batches that share a timestamp, so ties fall back to the
// id (ascending) to keep the order stable.
function sortLikeBackOffice(
  representatives: Representative[] | null,
): Representative[] | null {
  if (!representatives) return null;
  return [...representatives].sort((a, b) => {
    const timeA = createdAtTime(a);
    const timeB = createdAtTime(b);
    if (timeA !== timeB) return timeB > timeA ? 1 : -1;
    return String(a.id).localeCompare(String(b.id), undefined, {
      numeric: true,
    });
  });
}
