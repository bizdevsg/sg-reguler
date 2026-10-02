import type { NextApiRequest, NextApiResponse } from "next";
import { normalizeNewsLang, normalizeNewsResponse } from "@/lib/newsNormalize";
import { fetchNewsUpstream, invalidateNewsCache } from "@/lib/newsApiCache";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const lang = normalizeNewsLang(req.query.lang);
    const parsed = await fetchNewsUpstream(lang);
    const body = normalizeNewsResponse(parsed, lang);
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(body);
  } catch (err) {
    invalidateNewsCache(normalizeNewsLang(req.query.lang));
    return res.status(502).json({ message: "Upstream fetch failed" });
  }
}
