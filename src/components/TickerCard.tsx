import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { buildSeries, type Range, type Ticker } from "@/lib/market-data";

export function TickerCard({ ticker, range }: { ticker: Ticker; range: Range }) {
  const data = buildSeries(ticker, range);
  const pct = ticker.change[range];
  const up = pct >= 0;
  const stroke = up ? "var(--color-up)" : "var(--color-down)";
  const gradId = `grad-${ticker.symbol}-${range}`;

  return (
    <article className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-ring sm:p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:gap-3">
        <div className="min-w-0">
          <div className="font-mono text-sm font-semibold tracking-tight text-foreground">
            {ticker.symbol}
          </div>
          <div className="truncate text-xs text-muted-foreground">{ticker.name}</div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono text-sm tabular-nums text-foreground sm:text-base">
            {ticker.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div
            className={`font-mono text-xs tabular-nums ${up ? "text-up" : "text-down"}`}
          >
            {up ? "▲" : "▼"} {up ? "+" : "−"}
            {Math.abs(pct).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="mt-3 h-20 sm:h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-popover-foreground)",
              }}
              labelFormatter={() => ""}
              formatter={(v: number | string) => [Number(v).toFixed(2), ticker.symbol]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={1.6}
              fill={`url(#${gradId})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>VOL {ticker.volume}</span>
        <span>{range}</span>
      </div>
    </article>
  );
}
