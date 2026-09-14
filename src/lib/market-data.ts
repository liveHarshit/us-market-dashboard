export type Range = "1D" | "1W" | "1M" | "YTD" | "1Y";

export const RANGES: Range[] = ["1D", "1W", "1M", "YTD", "1Y"];

export const RANGE_LABEL: Record<Range, string> = {
  "1D": "Today",
  "1W": "Past week",
  "1M": "Past month",
  YTD: "Year to date",
  "1Y": "Past year",
};

export type Quote = {
  symbol: string;
  price: number;
  currency: string;
  volume: string;
  marketState: string;
  change: Record<Range, number>;
  series: Record<Range, number[]>;
};

export type MarketSnapshot = {
  updatedAt: string;
  quotes: Record<string, Quote>;
};

/** Static JSON refreshed by the scheduled data job, served next to the app. */
export async function fetchMarketSnapshot(): Promise<MarketSnapshot> {
  const base = import.meta.env.BASE_URL || "/";
  const res = await fetch(`${base}data/market.json?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Market data unavailable (${res.status})`);
  return (await res.json()) as MarketSnapshot;
}

export function seriesPoints(quote: Quote, range: Range): { i: number; value: number }[] {
  return (quote.series[range] ?? []).map((value, i) => ({ i, value }));
}

export { JAPAN_ETFS, TAIWAN_ETFS, US_CATEGORIES, type Instrument } from "./symbols";
