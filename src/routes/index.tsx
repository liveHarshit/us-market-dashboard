import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TickerCard } from "@/components/TickerCard";
import {
  JAPAN_ETFS,
  RANGES,
  RANGE_LABEL,
  US_STOCKS,
  type Range,
  type Ticker,
} from "@/lib/market-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian — US Stocks & Japan ETF Monitor" },
      {
        name: "description",
        content:
          "Track top US stocks and US-listed Japan ETFs side by side with one shared time filter and clean price charts.",
      },
      { property: "og:title", content: "Meridian — US Stocks & Japan ETF Monitor" },
      {
        property: "og:description",
        content:
          "Top US stocks and US-listed Japan ETFs in one simple dashboard with a shared time filter.",
      },
    ],
  }),
  component: Dashboard,
});

function Section({
  title, note, tickers, range,
}: { title: string; note: string; tickers: Ticker[]; range: Range }) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-[11px] text-muted-foreground">{note}</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tickers.map((t) => (
          <TickerCard key={t.symbol} ticker={t} range={range} />
        ))}
      </div>
    </section>
  );
}

function Dashboard() {
  const [range, setRange] = useState<Range>("1D");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <h1 className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground">
              MERIDIAN
            </h1>
            <p className="text-xs text-muted-foreground">
              US stocks &amp; Japan ETFs listed in the US
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
              {RANGE_LABEL[range]}
            </span>
            <div className="flex gap-1 rounded-md border border-border p-1">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
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
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8">
        <Section title="Top US stocks" note="15 names" tickers={US_STOCKS} range={range} />
        <Section
          title="Japan ETFs (US-listed)"
          note="9 funds"
          tickers={JAPAN_ETFS}
          range={range}
        />
        <p className="font-mono text-[11px] text-muted-foreground">
          Sample figures for layout — connect a live market feed to stream real prices.
        </p>
      </main>
    </div>
  );
}
