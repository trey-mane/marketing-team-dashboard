"use client";

import { signOut } from "next-auth/react";

const roleLabels: Record<string, string> = {
  "creative-director": "Creative Director",
  "video-editor": "Video Editor",
  "ads-director": "Ads Director",
};

const roleColors: Record<string, string> = {
  "creative-director": "#8B5CF6",
  "video-editor": "#3B82F6",
  "ads-director": "#F97316",
};

export default function Navbar({ userName, role }: { userName: string; role: string }) {
  const label = roleLabels[role] ?? role;
  const color = roleColors[role] ?? "#9ca3af";

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
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" fill="#f97316" />
              <line x1="12" y1="2" x2="12" y2="5" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="12" y1="19" x2="12" y2="22" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="2" y1="12" x2="5" y2="12" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="19" y1="12" x2="22" y2="12" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            Team Dashboard
          </span>
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
