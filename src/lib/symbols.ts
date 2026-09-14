/** Symbol lists shared by the app and the data-fetching script. */

export type Instrument = { symbol: string; name: string };

export const US_CATEGORIES: { label: string; tickers: Instrument[] }[] = [
  {
    label: "Software & cloud",
    tickers: [
      { symbol: "MSFT", name: "Microsoft" },
      { symbol: "NOW", name: "ServiceNow" },
      { symbol: "TEAM", name: "Atlassian" },
    ],
  },
  {
    label: "Data & security",
    tickers: [
      { symbol: "SNOW", name: "Snowflake" },
      { symbol: "DDOG", name: "Datadog" },
      { symbol: "CRWD", name: "CrowdStrike" },
    ],
  },
  {
    label: "Semiconductors & hardware",
    tickers: [
      { symbol: "NVDA", name: "NVIDIA" },
      { symbol: "WDC", name: "Western Digital" },
      { symbol: "AAPL", name: "Apple" },
    ],
  },
  {
    label: "Internet & entertainment",
    tickers: [
      { symbol: "GOOGL", name: "Alphabet" },
      { symbol: "NFLX", name: "Netflix" },
      { symbol: "TSLA", name: "Tesla" },
    ],
  },
  {
    label: "Consumer, health & telecom",
    tickers: [
      { symbol: "WMT", name: "Walmart" },
      { symbol: "ELV", name: "Elevance Health" },
      { symbol: "TMUS", name: "T-Mobile US" },
    ],
  },
];

export const JAPAN_ETFS: Instrument[] = [
  { symbol: "EWJ", name: "iShares MSCI Japan" },
  { symbol: "DXJ", name: "WisdomTree Japan Hedged Equity" },
  { symbol: "BBJP", name: "JPMorgan BetaBuilders Japan" },
  { symbol: "HEWJ", name: "iShares Currency Hedged MSCI Japan" },
  { symbol: "FLJP", name: "Franklin FTSE Japan" },
  { symbol: "JPXN", name: "iShares JPX-Nikkei 400" },
  { symbol: "DFJ", name: "WisdomTree Japan SmallCap Dividend" },
  { symbol: "SCJ", name: "iShares MSCI Japan Small-Cap" },
  { symbol: "FJP", name: "First Trust Japan AlphaDEX" },
];

export const TAIWAN_ETFS: Instrument[] = [
  { symbol: "EWT", name: "iShares MSCI Taiwan" },
  { symbol: "FLTW", name: "Franklin FTSE Taiwan" },
  { symbol: "AAXJ", name: "iShares MSCI All Country Asia ex Japan" },
  { symbol: "FLAX", name: "Franklin FTSE Asia ex Japan" },
  { symbol: "EEMA", name: "iShares MSCI Emerging Markets Asia" },
  { symbol: "EMXC", name: "iShares MSCI EM ex China" },
  { symbol: "VPL", name: "Vanguard FTSE Pacific" },
  { symbol: "DFAE", name: "Dimensional Emerging Core Equity" },
  { symbol: "FRDM", name: "Freedom 100 Emerging Markets" },
];

export const ALL_SYMBOLS: string[] = [
  ...US_CATEGORIES.flatMap((c) => c.tickers.map((t) => t.symbol)),
  ...JAPAN_ETFS.map((t) => t.symbol),
  ...TAIWAN_ETFS.map((t) => t.symbol),
];
