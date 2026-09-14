import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TickerCard } from "@/components/TickerCard";
import {
  JAPAN_ETFS,
  RANGES,
  RANGE_LABEL,
  TAIWAN_ETFS,
  US_CATEGORIES,
  type Range,
  type Ticker,
} from "@/lib/market-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian — US Stocks, Japan & Taiwan ETF Monitor" },
      {
        name: "description",
        content:
          "Track top US stocks by sector alongside US-listed Japan and Taiwan ETFs with one shared time filter and clean price charts.",
      },
      {
        property: "og:title",
        content: "Meridian — US Stocks, Japan & Taiwan ETF Monitor",
      },
      {
        property: "og:description",
        content:
          "Top US stocks by sector plus US-listed Japan and Taiwan ETFs in one simple dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Grid({ tickers, range }: { tickers: Ticker[]; range: Range }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tickers.map((t) => (
        <TickerCard key={t.symbol} ticker={t} range={range} />
      ))}
    </div>
  );
}

function SectionHeader({ title, note }: { title: string; note: string }) {
  return (
    <div className="mb-3 flex items-baseline gap-2 sm:gap-3">
      <h2 className="min-w-0 truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
        {title}
      </h2>
      <span className="h-px flex-1 bg-border" />
      <span className="shrink-0 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
        {note}
      </span>
    </div>
  );
}

function Section({
  title, note, tickers, range,
}: { title: string; note: string; tickers: Ticker[]; range: Range }) {
  return (
    <section>
      <SectionHeader title={title} note={note} />
      <Grid tickers={tickers} range={range} />
    </section>
  );
}

function Dashboard() {
  const [range, setRange] = useState<Range>("1D");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h1 className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground">
                MERIDIAN
              </h1>
              <p className="text-[11px] leading-snug text-muted-foreground sm:text-xs">
                US stocks by sector &amp; Japan / Taiwan ETFs listed in the US
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                {RANGE_LABEL[range]}
              </span>
              <div className="grid w-full grid-cols-5 gap-1 rounded-md border border-border p-1 sm:w-auto sm:flex">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`rounded py-1.5 font-mono text-[11px] transition-colors sm:px-2.5 sm:py-1 ${
                      r === range
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-7 px-4 py-6 sm:space-y-8 sm:px-5 sm:py-8">
        <section>
          <SectionHeader title="Top US stocks" note="5 sectors · 15 names" />
          <div className="space-y-6">
            {US_CATEGORIES.map((c) => (
              <div key={c.label}>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {c.label}
                </h3>
                <Grid tickers={c.tickers} range={range} />
              </div>
            ))}
          </div>
        </section>
        <Section
          title="Japan ETFs (US-listed)"
          note="9 funds"
          tickers={JAPAN_ETFS}
          range={range}
        />
        <Section
          title="Taiwan ETFs (US-listed)"
          note="9 funds"
          tickers={TAIWAN_ETFS}
          range={range}
        />
        <p className="font-mono text-[11px] text-muted-foreground">
          Sample figures for layout — connect a live market feed to stream real prices.
        </p>
      </main>
    </div>
  );
}
