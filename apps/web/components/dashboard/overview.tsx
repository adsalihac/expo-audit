"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

const scoreSeries = [
  { day: "Mon", score: 82, startup: 78 },
  { day: "Tue", score: 84, startup: 79 },
  { day: "Wed", score: 80, startup: 74 },
  { day: "Thu", score: 87, startup: 82 },
  { day: "Fri", score: 90, startup: 85 },
  { day: "Sat", score: 91, startup: 86 },
  { day: "Sun", score: 92, startup: 88 },
];

const fpsSeries = [
  { minute: "00", js: 57, ui: 60 },
  { minute: "05", js: 56, ui: 59 },
  { minute: "10", js: 52, ui: 56 },
  { minute: "15", js: 55, ui: 58 },
  { minute: "20", js: 58, ui: 60 },
  { minute: "25", js: 59, ui: 60 },
];

export function DashboardOverview() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Performance Score", "92", "text-success"],
          ["Cold Start", "2.3s", "text-white"],
          ["Bundle Size", "1.9MB", "text-white"],
          ["Regressions", "0", "text-success"],
        ].map(([label, value, cls]) => (
          <div key={label} className="dev-panel rounded-[18px] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/55">{label}</p>
            <p className={`mt-2 font-mono text-2xl ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr,1fr,0.8fr]">
        <div className="dev-panel rounded-[20px] p-4">
          <h3 className="font-heading text-sm font-semibold text-white/80">Score Trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreSeries}>
                <defs>
                  <linearGradient id="score" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6a7dff" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#5b72ff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#6f7892" tickLine={false} axisLine={false} />
                <YAxis stroke="#6f7892" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#9db3ff" fill="url(#score)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dev-panel rounded-[20px] p-4">
          <h3 className="font-heading text-sm font-semibold text-white/80">Realtime FPS</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fpsSeries}>
                <XAxis dataKey="minute" stroke="#6f7892" tickLine={false} axisLine={false} />
                <YAxis stroke="#6f7892" tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="js" stroke="#71f29f" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="ui" stroke="#4fa7ff" strokeWidth={2.2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dev-panel rounded-[20px] p-4">
          <h3 className="font-heading text-sm font-semibold text-white/80">Build Activity</h3>
          <div className="mt-4 space-y-3 text-sm">
            {[
              ["main", "Audit score +4", "2m ago"],
              ["release/1.4.2", "Bundle -180KB", "17m ago"],
              ["feature/paywall", "FPS stable", "44m ago"],
            ].map(([branch, msg, when]) => (
              <div key={`${branch}-${when}`} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="font-mono text-xs text-indigo-200">{branch}</div>
                <div className="mt-1 text-white/85">{msg}</div>
                <div className="mt-1 text-xs text-white/45">{when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
