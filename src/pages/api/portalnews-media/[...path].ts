import type { NextApiRequest, NextApiResponse } from "next";
import { requestBuffer } from "../_utils/requestBuffer";

const BASE_URL = process.env.PORTALNEWS_BASE_URL || "https://portalnews.newsmaker.id";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const pathParam = req.query.path;
  const path = Array.isArray(pathParam) ? pathParam.join("/") : String(pathParam ?? "");
  const targetUrl = `${BASE_URL.replace(/\/+$/, "")}/${path}`;

  try {
    const upstream = await requestBuffer(targetUrl, {
      Accept: req.headers.accept || "*/*",
    });
    res.setHeader("Cache-Control", "public, max-age=300");
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers["content-type"] || "application/octet-stream");
    return res.send(upstream.body);
  } catch {
    return res.status(502).json({ message: "Upstream fetch failed" });
  }
}
