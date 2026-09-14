export type Range = "1D" | "1W" | "1M" | "YTD" | "1Y";

export const RANGES: Range[] = ["1D", "1W", "1M", "YTD", "1Y"];

export type Ticker = {
  symbol: string;
  name: string;
  price: number;
  /** percent change per range */
  change: Record<Range, number>;
  volume: string;
};

export const US_STOCKS: Ticker[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    price: 228.44,
    change: { "1D": 0.87, "1W": -1.2, "1M": 3.6, YTD: 14.8, "1Y": 21.3 },
    volume: "55.6M",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 452.18,
    change: { "1D": 0.34, "1W": 1.9, "1M": 4.2, YTD: 19.1, "1Y": 26.4 },
    volume: "21.9M",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 1284.31,
    change: { "1D": 2.41, "1W": 5.12, "1M": 11.4, YTD: 68.2, "1Y": 92.5 },
    volume: "38.2M",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    price: 178.62,
    change: { "1D": 1.09, "1W": 0.8, "1M": -2.4, YTD: 11.2, "1Y": 18.9 },
    volume: "18.7M",
  },
  {
    symbol: "NFLX",
    name: "Netflix",
    price: 871.05,
    change: { "1D": 1.52, "1W": 3.3, "1M": 7.1, YTD: 43.5, "1Y": 51.2 },
    volume: "5.1M",
  },
  {
    symbol: "WMT",
    name: "Walmart",
    price: 96.35,
    change: { "1D": -0.25, "1W": 1.1, "1M": 2.4, YTD: 8.7, "1Y": 34.5 },
    volume: "16.3M",
  },
  {
    symbol: "NOW",
    name: "ServiceNow",
    price: 948.72,
    change: { "1D": 0.78, "1W": 2.6, "1M": 5.9, YTD: 22.4, "1Y": 31.7 },
    volume: "1.4M",
  },
  {
    symbol: "TEAM",
    name: "Atlassian",
    price: 187.43,
    change: { "1D": -0.94, "1W": 1.7, "1M": 4.5, YTD: 13.2, "1Y": 19.8 },
    volume: "2.2M",
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 248.87,
    change: { "1D": 2.15, "1W": 4.8, "1M": 9.2, YTD: -8.4, "1Y": 12.3 },
    volume: "98.4M",
  },
  {
    symbol: "ELV",
    name: "Elevance Health",
    price: 512.6,
    change: { "1D": 0.43, "1W": 0.9, "1M": -1.3, YTD: 6.5, "1Y": 15.2 },
    volume: "0.9M",
  },
  {
    symbol: "WDC",
    name: "Western Digital",
    price: 67.82,
    change: { "1D": -1.12, "1W": 2.3, "1M": 8.1, YTD: 41.2, "1Y": 55.7 },
    volume: "6.7M",
  },
  {
    symbol: "CRWD",
    name: "CrowdStrike",
    price: 358.91,
    change: { "1D": 1.35, "1W": 3.7, "1M": 10.4, YTD: 28.9, "1Y": 42.1 },
    volume: "3.8M",
  },
  {
    symbol: "SNOW",
    name: "Snowflake",
    price: 156.24,
    change: { "1D": -0.68, "1W": 2.1, "1M": 5.6, YTD: 4.2, "1Y": -12.5 },
    volume: "7.5M",
  },
  {
    symbol: "DDOG",
    name: "Datadog",
    price: 142.67,
    change: { "1D": 0.96, "1W": 4.2, "1M": 11.3, YTD: 19.8, "1Y": 28.4 },
    volume: "4.1M",
  },
  {
    symbol: "TMUS",
    name: "T-Mobile US",
    price: 264.55,
    change: { "1D": 0.21, "1W": 1.4, "1M": 3.2, YTD: 26.7, "1Y": 38.9 },
    volume: "5.6M",
  },
];

export const JAPAN_ETFS: Ticker[] = [
  {
    symbol: "EWJ",
    name: "iShares MSCI Japan",
    price: 48.23,
    change: { "1D": 1.04, "1W": 2.1, "1M": 3.8, YTD: 12.6, "1Y": 15.4 },
    volume: "9.1M",
  },
  {
    symbol: "DXJ",
    name: "WisdomTree Japan Hedged Equity",
    price: 41.87,
    change: { "1D": 0.61, "1W": 1.4, "1M": 5.2, YTD: 17.3, "1Y": 22.1 },
    volume: "4.6M",
  },
  {
    symbol: "BBJP",
    name: "JPMorgan BetaBuilders Japan",
    price: 36.52,
    change: { "1D": 0.77, "1W": 1.8, "1M": 3.1, YTD: 11.9, "1Y": 14.7 },
    volume: "6.3M",
  },
  {
    symbol: "HEWJ",
    name: "iShares Currency Hedged MSCI Japan",
    price: 42.16,
    change: { "1D": -0.31, "1W": 0.9, "1M": 4.4, YTD: 15.2, "1Y": 19.8 },
    volume: "1.2M",
  },
  {
    symbol: "FLJP",
    name: "Franklin FTSE Japan",
    price: 29.84,
    change: { "1D": 0.52, "1W": 1.1, "1M": 2.7, YTD: 10.4, "1Y": 13.6 },
    volume: "0.8M",
  },
  {
    symbol: "JPXN",
    name: "iShares JPX-Nikkei 400",
    price: 71.35,
    change: { "1D": -0.18, "1W": 1.6, "1M": 3.4, YTD: 13.1, "1Y": 16.2 },
    volume: "0.3M",
  },
  {
    symbol: "DFJ",
    name: "WisdomTree Japan SmallCap Dividend",
    price: 55.42,
    change: { "1D": 0.39, "1W": 1.2, "1M": 2.9, YTD: 9.5, "1Y": 13.8 },
    volume: "0.2M",
  },
  {
    symbol: "SCJ",
    name: "iShares MSCI Japan Small-Cap",
    price: 62.18,
    change: { "1D": 0.44, "1W": 1.0, "1M": 2.5, YTD: 8.7, "1Y": 12.4 },
    volume: "0.1M",
  },
  {
    symbol: "FJP",
    name: "First Trust Japan AlphaDEX",
    price: 58.93,
    change: { "1D": 0.28, "1W": 0.8, "1M": 2.2, YTD: 8.1, "1Y": 11.7 },
    volume: "0.1M",
  },
];

const POINTS: Record<Range, number> = {
  "1D": 26,
  "1W": 30,
  "1M": 32,
  YTD: 36,
  "1Y": 40,
};

/** Deterministic pseudo-random series that lands on the range's total change. */
export function buildSeries(t: Ticker, range: Range): { i: number; value: number }[] {
  const n = POINTS[range];
  const pct = t.change[range];
  const start = t.price / (1 + pct / 100);
  let seed = 0;
  for (const ch of t.symbol + range) seed = (seed * 31 + ch.charCodeAt(0)) % 100000;

  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const noise = Array.from({ length: n }, () => rand() - 0.5);
  const amp = Math.max(Math.abs(pct), 1.2) / 100;

  return Array.from({ length: n }, (_, i) => {
    const trend = i / (n - 1);
    const wobble = noise.slice(0, i + 1).reduce((a, b) => a + b, 0) * (amp / 2.4);
    const value = start * (1 + (pct / 100) * trend + (i === n - 1 ? 0 : wobble));
    return { i, value: Number(value.toFixed(2)) };
  });
}

export const RANGE_LABEL: Record<Range, string> = {
  "1D": "Today",
  "1W": "Past week",
  "1M": "Past month",
  YTD: "Year to date",
  "1Y": "Past year",
};

export const TAIWAN_ETFS: Ticker[] = [
  {
    symbol: "EWT",
    name: "iShares MSCI Taiwan",
    price: 62.41,
    change: { "1D": 1.28, "1W": 2.6, "1M": 6.4, YTD: 24.7, "1Y": 31.2 },
    volume: "3.4M",
  },
  {
    symbol: "FLTW",
    name: "Franklin FTSE Taiwan",
    price: 42.86,
    change: { "1D": 1.11, "1W": 2.3, "1M": 5.9, YTD: 23.1, "1Y": 29.4 },
    volume: "0.4M",
  },
  {
    symbol: "AAXJ",
    name: "iShares MSCI All Country Asia ex Japan",
    price: 82.17,
    change: { "1D": 0.74, "1W": 1.8, "1M": 4.2, YTD: 18.3, "1Y": 22.6 },
    volume: "1.9M",
  },
  {
    symbol: "FLAX",
    name: "Franklin FTSE Asia ex Japan",
    price: 34.52,
    change: { "1D": 0.66, "1W": 1.5, "1M": 3.8, YTD: 16.9, "1Y": 20.8 },
    volume: "0.2M",
  },
  {
    symbol: "EEMA",
    name: "iShares MSCI Emerging Markets Asia",
    price: 88.94,
    change: { "1D": 0.81, "1W": 1.9, "1M": 4.6, YTD: 19.4, "1Y": 24.1 },
    volume: "0.3M",
  },
  {
    symbol: "EMXC",
    name: "iShares MSCI Emerging Markets ex China",
    price: 71.63,
    change: { "1D": 0.58, "1W": 1.2, "1M": 3.1, YTD: 14.6, "1Y": 18.7 },
    volume: "1.1M",
  },
  {
    symbol: "VPL",
    name: "Vanguard FTSE Pacific",
    price: 94.28,
    change: { "1D": 0.42, "1W": 1.1, "1M": 2.9, YTD: 13.5, "1Y": 17.4 },
    volume: "0.6M",
  },
  {
    symbol: "DFAE",
    name: "Dimensional Emerging Core Equity Market",
    price: 32.75,
    change: { "1D": 0.49, "1W": 1.3, "1M": 3.4, YTD: 15.2, "1Y": 19.1 },
    volume: "0.7M",
  },
  {
    symbol: "FRDM",
    name: "Freedom 100 Emerging Markets",
    price: 38.19,
    change: { "1D": -0.22, "1W": 0.9, "1M": 2.6, YTD: 12.8, "1Y": 16.3 },
    volume: "0.1M",
  },
];

const BY_SYMBOL: Record<string, Ticker> = Object.fromEntries(
  US_STOCKS.map((t) => [t.symbol, t]),
);

const pick = (...symbols: string[]): Ticker[] => symbols.map((s) => BY_SYMBOL[s]!);

export type Category = { label: string; tickers: Ticker[] };

export const US_CATEGORIES: Category[] = [
  { label: "Software & cloud", tickers: pick("MSFT", "NOW", "TEAM") },
  { label: "Data & security", tickers: pick("SNOW", "DDOG", "CRWD") },
  { label: "Semiconductors & hardware", tickers: pick("NVDA", "WDC", "AAPL") },
  { label: "Internet & entertainment", tickers: pick("GOOGL", "NFLX", "TSLA") },
  { label: "Consumer, health & telecom", tickers: pick("WMT", "ELV", "TMUS") },
];
