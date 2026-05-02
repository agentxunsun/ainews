"use client";

import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import {
  categoryLabels,
  hotwords,
  type Signal,
  type SignalCategory,
  trendPredictions
} from "@/data/signals";

type Period = "today" | "week" | "month";

type SignalDashboardProps = {
  initialSignals: Signal[];
  isAuthenticated: boolean;
};

const categories: Array<SignalCategory | "all"> = [
  "all",
  "tweet",
  "video",
  "wechat",
  "podcast",
  "insight",
  "trend"
];

const periods: Array<{ key: Period; label: string }> = [
  { key: "today", label: "今日" },
  { key: "week", label: "本周" },
  { key: "month", label: "本月" }
];

const numberFormatter = new Intl.NumberFormat("zh-CN");
const compactFormatter = new Intl.NumberFormat("zh-CN", {
  notation: "compact",
  maximumFractionDigits: 1
});

function formatInTimeZone(date: string, timeZone: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(date));
}

function periodStart(period: Period) {
  const now = new Date("2026-05-02T12:00:00+08:00");
  const start = new Date(now);

  if (period === "today") {
    start.setHours(0, 0, 0, 0);
    return start;
  }

  if (period === "week") {
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);
  return start;
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getVisibleSignals(signals: Signal[], isAuthenticated: boolean) {
  if (isAuthenticated) {
    return signals.map((signal) => ({ signal, locked: false }));
  }

  const categoryCounts = new Map<SignalCategory, number>();

  return signals.map((signal) => {
    const nextCount = (categoryCounts.get(signal.category) ?? 0) + 1;
    categoryCounts.set(signal.category, nextCount);

    return {
      signal,
      locked: nextCount > 3
    };
  });
}

export function SignalDashboard({ initialSignals, isAuthenticated }: SignalDashboardProps) {
  const [activeCategory, setActiveCategory] = useState<SignalCategory | "all">("all");
  const [period, setPeriod] = useState<Period>("week");

  const sortedSignals = useMemo(
    () =>
      [...initialSignals].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [initialSignals]
  );

  const filteredSignals = useMemo(() => {
    const start = periodStart(period).getTime();
    return sortedSignals.filter((signal) => {
      const matchesCategory = activeCategory === "all" || signal.category === activeCategory;
      const matchesPeriod = new Date(signal.publishedAt).getTime() >= start;
      return matchesCategory && matchesPeriod;
    });
  }, [activeCategory, period, sortedSignals]);

  const visibleSignals = useMemo(
    () => getVisibleSignals(filteredSignals, isAuthenticated),
    [filteredSignals, isAuthenticated]
  );

  const lockedCount = visibleSignals.filter((item) => item.locked).length;

  const stats = useMemo(() => {
    const todayStart = periodStart("today").getTime();
    const today = initialSignals.filter(
      (signal) => new Date(signal.publishedAt).getTime() >= todayStart
    );
    return [
      { label: "今日推文数", value: today.filter((item) => item.category === "tweet").length },
      { label: "全部推文数", value: initialSignals.filter((item) => item.category === "tweet").length },
      { label: "今日视频数", value: today.filter((item) => item.category === "video").length },
      { label: "本周信号", value: initialSignals.length },
      { label: "追踪作者", value: new Set(initialSignals.map((item) => item.handle)).size },
      { label: "热点标签", value: hotwords.length }
    ];
  }, [initialSignals]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-signal-bg/[0.86] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-signal-green/30 bg-signal-green/10 text-sm font-black text-signal-green shadow-glow">
                AI
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
                  AI 信号场
                </h1>
                <p className="mt-1 text-sm text-signal-muted">全球前沿资讯实时捕获</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => signIn()}
                  className="h-9 rounded-lg border border-signal-green/40 bg-signal-green/[0.14] px-4 text-sm font-medium text-signal-green transition hover:bg-signal-green/[0.2]"
                >
                  登录解锁全部
                </button>
              ) : null}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 thin-scrollbar">
                {periods.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPeriod(item.key)}
                    className={classNames(
                      "h-9 shrink-0 rounded-full border px-4 text-sm transition",
                      period === item.key
                        ? "border-signal-green/50 bg-signal-green/[0.15] text-signal-green"
                        : "border-white/10 bg-white/[0.03] text-signal-muted hover:border-white/20 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-1 thin-scrollbar" aria-label="内容分类">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={classNames(
                  "h-10 shrink-0 rounded-lg border px-4 text-sm font-medium transition",
                  activeCategory === category
                    ? "border-signal-blue/60 bg-signal-blue/[0.14] text-white shadow-glow"
                    : "border-white/10 bg-white/[0.035] text-signal-muted hover:border-white/20 hover:text-white"
                )}
              >
                {category === "all" ? "全部" : categoryLabels[category]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1540px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[250px_minmax(0,1fr)_320px]">
        <aside className="lg:sticky lg:top-[154px] lg:h-[calc(100vh-178px)]">
          <StatsPanel stats={stats} />
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-signal-muted">当前筛选</p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                {activeCategory === "all" ? "全部信号" : categoryLabels[activeCategory]} ·{" "}
                {periods.find((item) => item.key === period)?.label}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center sm:w-[300px]">
              <Metric
                label={lockedCount > 0 ? "可读/锁定" : "卡片"}
                value={
                  lockedCount > 0
                    ? `${filteredSignals.length - lockedCount}/${lockedCount}`
                    : filteredSignals.length
                }
              />
              <Metric
                label="互动"
                value={compactFormatter.format(
                  filteredSignals.reduce((sum, item) => sum + item.likes + item.reposts, 0)
                )}
              />
              <Metric
                label="浏览"
                value={compactFormatter.format(
                  filteredSignals.reduce((sum, item) => sum + item.views, 0)
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            {visibleSignals.map(({ signal, locked }) => (
              locked ? (
                <LockedSignalCard key={signal.id} signal={signal} />
              ) : (
                <SignalCard key={signal.id} signal={signal} />
              )
            ))}
          </div>
        </section>

        <aside className="space-y-5 xl:sticky xl:top-[154px] xl:h-[calc(100vh-178px)] xl:overflow-y-auto xl:pr-1 thin-scrollbar">
          <TrendPanel />
          <HotwordsPanel />
        </aside>
      </div>
    </main>
  );
}

function StatsPanel({ stats }: { stats: Array<{ label: string; value: number }> }) {
  return (
    <div className="rounded-xl border border-white/10 bg-signal-panel/[0.88] p-3 shadow-glow">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-white">实时统计</h2>
        <span className="rounded-full bg-signal-green/[0.12] px-2.5 py-1 text-xs text-signal-green">
          Live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <div className="text-2xl font-semibold text-white">{numberFormatter.format(item.value)}</div>
            <div className="mt-1 text-xs text-signal-muted">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-signal-card px-3 py-2">
      <div className="text-base font-semibold text-white">{value}</div>
      <div className="mt-0.5 text-xs text-signal-muted">{label}</div>
    </div>
  );
}

function LockedSignalCard({ signal }: { signal: Signal }) {
  return (
    <button
      type="button"
      onClick={() => signIn()}
      className="group block w-full rounded-xl border border-white/10 bg-signal-card p-4 text-left shadow-glow transition hover:border-signal-green/40 sm:p-5"
      aria-label="登录后查看完整信号"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="select-none blur-[5px]">
          <div className="flex items-start gap-3 opacity-70">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-signal-blue/70 to-signal-green/70 text-sm font-bold text-white">
              {signal.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="font-semibold text-white">{signal.author}</h3>
                <span className="text-sm text-signal-muted">{signal.handle}</span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-signal-muted">
                  {categoryLabels[signal.category]}
                </span>
              </div>
              <p className="mt-1 text-xs text-signal-muted">{signal.role}</p>
              <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-signal-text sm:text-base">
                {signal.zh}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {signal.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-signal-green/20 bg-signal-green/[0.08] px-3 py-1 text-xs text-signal-green"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid place-items-center bg-signal-card/70 px-4 backdrop-blur-[2px]">
          <div className="rounded-lg border border-signal-green/30 bg-signal-bg/90 px-5 py-3 text-center shadow-glow">
            <div className="text-sm font-semibold text-white">登录后查看完整信号</div>
            <div className="mt-1 text-xs text-signal-muted">未登录用户每个分类可预览最新 3 条</div>
          </div>
        </div>
      </div>
    </button>
  );
}

function SignalCard({ signal }: { signal: Signal }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-white/10 bg-signal-card p-4 shadow-glow transition hover:border-white/20 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-signal-blue/70 to-signal-green/70 text-sm font-bold text-white">
          {signal.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="font-semibold text-white">{signal.author}</h3>
                <span className="text-sm text-signal-muted">{signal.handle}</span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-signal-muted">
                  {categoryLabels[signal.category]}
                </span>
              </div>
              <p className="mt-1 text-xs text-signal-muted">{signal.role}</p>
            </div>
            <div className="shrink-0 text-left text-xs leading-5 text-signal-muted sm:text-right">
              <div>北京时间 {formatInTimeZone(signal.publishedAt, "Asia/Shanghai")}</div>
              <div>硅谷时间 {formatInTimeZone(signal.publishedAt, "America/Los_Angeles")}</div>
            </div>
          </div>

          {signal.repostedFrom ? (
            <div className="mt-3 rounded-lg border border-signal-blue/20 bg-signal-blue/[0.08] px-3 py-2 text-sm text-signal-blue">
              🔄 转发自 {signal.repostedFrom}
            </div>
          ) : null}

          <p className="mt-4 text-[15px] leading-7 text-signal-text sm:text-base">{signal.zh}</p>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 rounded-md border border-white/10 px-3 py-1.5 text-sm text-signal-muted transition hover:border-white/20 hover:text-white"
          >
            {expanded ? "收起英文原文" : "展开英文原文"}
          </button>

          {expanded ? (
            <p className="mt-3 rounded-lg border border-white/10 bg-black/[0.18] p-3 text-sm leading-6 text-signal-muted">
              {signal.en}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {signal.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-signal-green/20 bg-signal-green/[0.08] px-3 py-1 text-xs text-signal-green"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-signal-muted">
              <span aria-label="点赞数">❤ {compactFormatter.format(signal.likes)}</span>
              <span aria-label="转发数">🔄 {compactFormatter.format(signal.reposts)}</span>
              <span aria-label="浏览数">👁 {compactFormatter.format(signal.views)}</span>
            </div>
            <a
              href={signal.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 px-3 text-sm text-white transition hover:border-signal-green/40 hover:text-signal-green"
            >
              查看原帖
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function TrendPanel() {
  return (
    <section className="rounded-xl border border-white/10 bg-signal-panel/[0.88] p-4 shadow-glow">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">趋势预判</h2>
        <span className="text-xs text-signal-amber">未来 7 天</span>
      </div>
      <div className="mt-4 space-y-3">
        {trendPredictions.map((item, index) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 text-xs font-semibold text-signal-green">
              Signal {String(index + 1).padStart(2, "0")}
            </div>
            <p className="text-sm leading-6 text-signal-text">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HotwordsPanel() {
  return (
    <section className="rounded-xl border border-white/10 bg-signal-panel/[0.88] p-4 shadow-glow">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">本周热词 TOP 9</h2>
        <span className="text-xs text-signal-muted">中文语义聚类</span>
      </div>
      <ol className="mt-4 space-y-2">
        {hotwords.map((item, index) => (
          <li
            key={item.word}
            className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3"
          >
            <span className="text-sm font-semibold text-signal-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">{item.word}</div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-signal-green"
                  style={{ width: `${Math.max(26, 100 - index * 7)}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white">{item.count}</div>
              <div className="text-xs text-signal-green">{item.delta}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
