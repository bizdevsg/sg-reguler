type Cell = { text: string; colSpan: number; rowSpan: number };

function decodeText(value: string) {
  const entities: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };
  return value
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name: string) => {
      if (name[0] === "#") {
        const code =
          name[1].toLowerCase() === "x"
            ? parseInt(name.slice(2), 16)
            : parseInt(name.slice(1), 10);
        return Number.isFinite(code) &&
          code > 0 &&
          code <= 0x10ffff &&
          !(code >= 0xd800 && code <= 0xdfff)
          ? String.fromCodePoint(code)
          : entity;
      }
      return entities[name.toLowerCase()] ?? entity;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function tableRows(html: string): Cell[][] {
  return Array.from(html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr\s*>/gi), (row) =>
    Array.from(
      row[1].matchAll(/<t[dh]\b([^>]*)>([\s\S]*?)<\/t[dh]\s*>/gi),
      (cell) => ({
        text: decodeText(cell[2]),
        colSpan: Math.min(
          Number(cell[1].match(/\bcolspan\s*=\s*["']?(\d+)/i)?.[1] || 1),
          20,
        ),
        rowSpan: Math.max(1, Math.min(Number(cell[1].match(/\browspan\s*=\s*["']?(\d+)/i)?.[1] || 1), 100)),
      }),
    ),
  ).filter((row) => row.length > 0);
}

function parseTables(html: string) {
  return Array.from(html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table\s*>/gi), (match) => {
    const rows = tableRows(match[1]);
    const columnCount = Math.max(0, ...rows.map((row) => row.length));
    const occupied = Array<number>(columnCount).fill(0);
    const normalizedRows = rows.map((row) => {
      let column = 0;
      const normalized = row.map((cell, index) => {
        while (column < columnCount && occupied[column] > 0) column++;
        let available = 0;
        while (column + available < columnCount && occupied[column + available] === 0) available++;
        const remainingCells = row.length - index - 1;
        const colSpan = Math.max(1, Math.min(cell.colSpan, Math.max(1, available - remainingCells)));
        for (let i = 0; i < colSpan && column + i < columnCount; i++) occupied[column + i] = cell.rowSpan;
        const startColumn = column;
        column += colSpan;
        return { ...cell, colSpan, startColumn };
      });
      for (let i = 0; i < occupied.length; i++) occupied[i] = Math.max(0, occupied[i] - 1);
      return normalized;
    });
    return { rows: normalizedRows, columnCount };
  }).filter((table) => table.rows.length > 0);
}

type Segment =
  | { type: "table"; table: ReturnType<typeof parseTables>[number] }
  | { type: "text"; lines: string[] };

function textLines(html: string): string[] {
  return html
    .replace(/<li\b[^>]*>/gi, "\n• ")
    .replace(/<\/(p|div|li|ul|ol|h[1-6]|blockquote|section|article)\s*>/gi, "\n")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<(p|div|h[1-6]|ul|ol|blockquote|section|article)\b[^>]*>/gi, "\n")
    .split("\n")
    .map(decodeText)
    .filter(Boolean);
}

function parseSegments(html: string): Segment[] {
  const segments: Segment[] = [];
  const pushText = (chunk: string) => {
    const lines = textLines(chunk);
    if (lines.length) segments.push({ type: "text", lines });
  };
  let last = 0;
  for (const match of html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table\s*>/gi)) {
    pushText(html.slice(last, match.index));
    const [table] = parseTables(match[0]);
    if (table) segments.push({ type: "table", table });
    last = match.index + match[0].length;
  }
  pushText(html.slice(last));
  return segments;
}

export function ProductSpecifications({
  html,
  title,
  scrollHint,
}: {
  html: string;
  title: string;
  scrollHint: string;
}) {
  const segments = parseSegments(html);
  if (!segments.length) return null;
  const needsScroll = segments.some((s) => s.type === "table" && s.table.columnCount > 2);

  return (
    <section className="mt-14 sm:mt-20">
      <div className="flex items-center gap-4 sm:gap-10">
        <h2 className="min-w-0 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <div aria-hidden="true" className="h-px flex-1 bg-white/10" />
      </div>
      <div className="mt-6">
        {needsScroll && <p id="product-specifications-scroll-hint" className="mb-3 text-xs leading-5 text-zinc-400 sm:hidden">
          {scrollHint}
        </p>}
        {segments.map((segment, segmentIndex) =>
          segment.type === "text" ? (
            <div key={segmentIndex} className={`space-y-2 leading-7 text-zinc-300 ${segmentIndex ? "mt-6" : ""}`}>
              {segment.lines.map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          ) : (
          <div key={segmentIndex} role="region" aria-label={title} aria-describedby={segment.table.columnCount > 2 ? "product-specifications-scroll-hint" : undefined} tabIndex={0} className={`overflow-x-auto rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${segmentIndex ? "mt-6" : ""}`}>
          {[segment.table].map((table, tableIndex) => (
          <table key={tableIndex} className={`w-full table-fixed border-collapse text-left text-sm leading-6 text-zinc-200 ${table.columnCount > 2 ? "min-w-[28rem] sm:min-w-[36rem]" : ""}`}>
            {table.columnCount === 2 && <colgroup><col className="w-[40%]" /><col className="w-[60%]" /></colgroup>}
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-[#141414] even:bg-[#191919]">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      className={`border border-white/15 [overflow-wrap:anywhere] px-3 py-3.5 align-top sm:px-6 sm:py-4 ${table.columnCount === 1 ? "bg-[#251e11] font-semibold text-yellow-300" : cell.startColumn === 0 ? "bg-white/[0.025] font-semibold text-yellow-100" : "text-zinc-200"}`}
                    >
                      {cell.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          ))}
          </div>
          ),
        )}
      </div>
    </section>
  );
}
