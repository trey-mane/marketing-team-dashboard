"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const roleLabels: Record<string, string> = {
  "creative-director": "Creative Advisor",
  "video-editor": "Content Creator",
  "ads-director": "Meta Ads Manager",
};

const roleColors: Record<string, string> = {
  "creative-director": "#8B5CF6",
  "video-editor": "#3B82F6",
  "ads-director": "#F97316",
};

export default function Navbar({ userName, role }: { userName: string; role: string }) {
  const label = roleLabels[role] ?? role;
  const color = roleColors[role] ?? "#9ca3af";
  const pathname = usePathname();
  const onFunnelPage = pathname === "/dashboard/funnel-and-sales-process";

  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Micheletti Media"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            Micheletti Media
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            href={`/dashboard/${role}`}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: onFunnelPage ? "var(--text-secondary)" : "var(--text-primary)",
              background: onFunnelPage ? "transparent" : "var(--surface-2)",
              border: `1px solid ${onFunnelPage ? "transparent" : "var(--border)"}`,
            }}
          >
            My Dashboard
          </Link>
          <Link
            href="/dashboard/funnel-and-sales-process"
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: onFunnelPage ? "var(--text-primary)" : "var(--text-secondary)",
              background: onFunnelPage ? "var(--surface-2)" : "transparent",
              border: `1px solid ${onFunnelPage ? "var(--border)" : "transparent"}`,
            }}
          >
            Funnel & Sales
          </Link>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {userName}
            </p>
            <p className="text-xs font-medium" style={{ color }}>
              {label}
            </p>
          </div>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
            style={{ background: `${color}22`, color }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs px-3 py-2 rounded-lg transition-all"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
