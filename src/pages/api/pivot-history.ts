import type { NextApiRequest, NextApiResponse } from "next";
import { requestBuffer } from "./_utils/requestBuffer";

const HISTORICAL_DATA_URL =
  "https://endpoapi-production-3202.up.railway.app/api/historical";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const upstream = await requestBuffer(HISTORICAL_DATA_URL, {
      Accept: "application/json",
      "User-Agent": "Solidgold-Website/1.0",
    });

    const body = upstream.body;

    res.setHeader("Cache-Control", "no-store");
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers["content-type"] || "application/json");

    return res.send(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream fetch failed";
    return res.status(502).json({ message });
  }
}
