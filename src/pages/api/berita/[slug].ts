import type { NextApiRequest, NextApiResponse } from "next";
import { findNormalizedNewsBySlug, normalizeNewsLang } from "@/lib/newsNormalize";
import { fetchNewsUpstream, invalidateNewsCache } from "@/lib/newsApiCache";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  if (!slug) return res.status(400).json({ message: "Missing slug" });

  try {
    const lang = normalizeNewsLang(req.query.lang);
    const parsed = await fetchNewsUpstream(lang);
    const item = findNormalizedNewsBySlug(parsed, slug, lang);
    if (!item) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ data: item });
  } catch {
    invalidateNewsCache(normalizeNewsLang(req.query.lang));
    return res.status(502).json({ message: "Upstream fetch failed" });
  }
}
