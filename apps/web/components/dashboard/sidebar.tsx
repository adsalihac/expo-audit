"use client";

import { Activity, BarChart2, Bell, Boxes, LayoutDashboard, Settings } from "lucide-react";
import { useUiStore } from "../../lib/store";

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Audits", icon: Activity },
  { label: "Bundle", icon: Boxes },
  { label: "Insights", icon: BarChart2 },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useUiStore();

  return (
    <aside
      className={`dev-panel sticky top-6 h-[calc(100vh-3rem)] rounded-[24px] p-4 transition-all ${sidebarCollapsed ? "w-[84px]" : "w-[240px]"}`}
    >
      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Workspace</div>
        {!sidebarCollapsed && <div className="mt-1 text-sm font-semibold text-slate-900">Expo Audit</div>}
      </div>

      <button className="mb-5 rounded-xl border border-slate-300 px-3 py-1 text-xs text-slate-600" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        {sidebarCollapsed ? "Expand" : "Collapse"}
      </button>
      <nav className="space-y-1">
        {nav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:border hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            <item.icon size={16} />
            {!sidebarCollapsed && item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
