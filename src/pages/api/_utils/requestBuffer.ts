import http from "node:http";
import https from "node:https";
import dns from "node:dns";

type LookupOptions = { all?: boolean } | undefined;
type LookupCallback = (err: NodeJS.ErrnoException | null, address: string, family: number) => void;
type LookupAllCallback = (
  err: NodeJS.ErrnoException | null,
  addresses: Array<{ address: string; family: number }>
) => void;
type LookupFunction = (hostname: string, opts: LookupOptions, cb: LookupCallback | LookupAllCallback) => void;

const resolver = new dns.promises.Resolver();
resolver.setServers(["8.8.8.8", "1.1.1.1"]);

function shouldUsePublicDns(hostname: string) {
  return hostname.endsWith("newsmaker.id");
}

export function requestBuffer(
  url: string,
  headers: Record<string, string>,
  timeoutMs = 15000
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === "https:" ? https : http;

    const req = lib.request(
      {
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port,
        path: `${u.pathname}${u.search}`,
        method: "GET",
        headers,
        servername: u.hostname,
        lookup: shouldUsePublicDns(u.hostname)
          ? ((hostname: string, opts: LookupOptions, cb: LookupCallback | LookupAllCallback) => {
              resolver
                .resolve4(hostname)
                .then((addrs) => {
                  if (!addrs || addrs.length === 0) {
                    (cb as LookupCallback)(new Error(`DNS lookup failed for ${hostname}`), "", 4);
                    return;
                  }

                  if (opts && typeof opts === "object" && "all" in opts && opts.all) {
                    (cb as LookupAllCallback)(
                      null,
                      addrs.map((address) => ({ address, family: 4 }))
                    );
                    return;
                  }

                  (cb as LookupCallback)(null, addrs[0], 4);
                })
                .catch((err) => (cb as LookupCallback)(err, "", 4));
            }) as LookupFunction
          : undefined,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      }
    );

    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("Request timeout"));
    });
    req.end();
  });
}
