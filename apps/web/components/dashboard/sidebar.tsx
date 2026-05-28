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
      <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-3">
        <div className="text-[11px] uppercase tracking-[0.14em] text-white/45">Workspace</div>
        {!sidebarCollapsed && <div className="mt-1 text-sm font-semibold text-white/85">Expo Audit</div>}
      </div>

      <button className="mb-5 rounded-xl border border-white/10 px-3 py-1 text-xs text-white/70" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        {sidebarCollapsed ? "Expand" : "Collapse"}
      </button>
      <nav className="space-y-1">
        {nav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:border hover:border-white/10 hover:bg-white/5 hover:text-white"
          >
            <item.icon size={16} />
            {!sidebarCollapsed && item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
