/**
 * Fetches real quotes + price history for every symbol in the dashboard and
 * writes public/data/market.json. Runs in CI (GitHub Actions) and locally.
 * Source: Yahoo Finance chart API (no API key required).
 */
import { mkdirSync, writeFileSync } from "fs";
import { ALL_SYMBOLS } from "../src/lib/symbols";

type Range = "1D" | "1W" | "1M" | "YTD" | "1Y";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36";

async function chart(symbol: string, range: string, interval: string) {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol,
  )}?range=${range}&interval=${interval}&includePrePost=false`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (res.ok) {
      const json: any = await res.json();
      const r = json?.chart?.result?.[0];
      if (r) return r;
    }
    await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
  }
  throw new Error(`chart failed for ${symbol} ${range}`);
}

function closes(r: any): { t: number[]; c: number[] } {
  const t: number[] = r?.timestamp ?? [];
  const raw: (number | null)[] = r?.indicators?.quote?.[0]?.close ?? [];
  const outT: number[] = [];
  const outC: number[] = [];
  raw.forEach((v, i) => {
    if (typeof v === "number" && Number.isFinite(v)) {
      outT.push(t[i]!);
      outC.push(Number(v.toFixed(2)));
    }
  });
  return { t: outT, c: outC };
}

/** Keep charts light: at most `max` evenly spaced points, always keeping the last. */
function downsample(values: number[], max: number): number[] {
  if (values.length <= max) return values;
  const step = (values.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => values[Math.round(i * step)]!);
}

function fmtVolume(v: number | undefined): string {
  if (!v || !Number.isFinite(v)) return "—";
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return String(v);
}

async function one(symbol: string) {
  const [intraday, daily] = await Promise.all([
    chart(symbol, "1d", "5m"),
    chart(symbol, "1y", "1d"),
  ]);

  const meta = daily.meta ?? {};
  const price: number = meta.regularMarketPrice ?? intraday?.meta?.regularMarketPrice;
  const prevClose: number =
    intraday?.meta?.chartPreviousClose ?? meta.chartPreviousClose ?? price;

  const intra = closes(intraday);
  const day = closes(daily);

  const year = new Date().getUTCFullYear();
  const ytdStart = day.t.findIndex((ts) => new Date(ts * 1000).getUTCFullYear() === year);

  const slices: Record<Range, number[]> = {
    "1D": intra.c.length > 2 ? intra.c : day.c.slice(-2),
    "1W": day.c.slice(-6),
    "1M": day.c.slice(-22),
    YTD: ytdStart >= 0 ? day.c.slice(Math.max(0, ytdStart - 1)) : day.c,
    "1Y": day.c,
  };

  const series = {} as Record<Range, number[]>;
  const change = {} as Record<Range, number>;
  for (const key of Object.keys(slices) as Range[]) {
    const s = [...slices[key]];
    if (s.length && price) s[s.length - 1] = Number(price.toFixed(2));
    const base = key === "1D" ? prevClose : (s[0] ?? price);
    series[key] = downsample(s, key === "1D" ? 40 : 60);
    change[key] = base ? Number((((price - base) / base) * 100).toFixed(2)) : 0;
  }

  return {
    symbol,
    price: Number(price.toFixed(2)),
    currency: meta.currency ?? "USD",
    volume: fmtVolume(meta.regularMarketVolume),
    marketState: intraday?.meta?.marketState ?? "UNKNOWN",
    change,
    series,
  };
}

const quotes: Record<string, unknown> = {};
const failed: string[] = [];

// Small batches keep us well inside Yahoo's rate limits.
for (let i = 0; i < ALL_SYMBOLS.length; i += 4) {
  const batch = ALL_SYMBOLS.slice(i, i + 4);
  const results = await Promise.all(
    batch.map(async (s) => {
      try {
        return await one(s);
      } catch (e) {
        console.error(`! ${s}: ${(e as Error).message}`);
        failed.push(s);
        return null;
      }
    }),
  );
  for (const r of results) if (r) quotes[r.symbol] = r;
  await new Promise((r) => setTimeout(r, 400));
}

mkdirSync("public/data", { recursive: true });
writeFileSync(
  "public/data/market.json",
  JSON.stringify({ updatedAt: new Date().toISOString(), quotes }, null, 0),
);
console.log(`wrote ${Object.keys(quotes).length}/${ALL_SYMBOLS.length} symbols`);
if (failed.length) console.log("failed:", failed.join(", "));
if (Object.keys(quotes).length < ALL_SYMBOLS.length * 0.6) process.exit(1);
