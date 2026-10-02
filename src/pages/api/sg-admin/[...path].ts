import type { NextApiRequest, NextApiResponse } from "next";
import { requestBuffer } from "../_utils/requestBuffer";

const TARGET_BASE = process.env.SG_ADMIN_BASE_URL || "https://sg-admin.newsmaker.id";
const API_TOKEN = process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const pathParam = req.query.path;
  const path = Array.isArray(pathParam) ? pathParam.join("/") : String(pathParam ?? "");
  const query = req.url?.includes("?") ? `?${req.url.split("?")[1]}` : "";
  const targetUrl = `${TARGET_BASE.replace(/\/+$/, "")}/${path}${query}`;

  try {
    const headers: Record<string, string> = {
      Accept: req.headers.accept || "*/*",
      "User-Agent": "Solidgold-Website/1.0",
    };
    if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;

    const upstream = await requestBuffer(targetUrl, headers);
    res.setHeader("Cache-Control", "no-store");
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers["content-type"] || "application/octet-stream");
    return res.send(upstream.body);
  } catch (err) {
    return res.status(502).json({ message: "Upstream fetch failed" });
  }
}
