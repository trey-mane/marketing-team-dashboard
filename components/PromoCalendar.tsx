"use client";

import type { Promo } from "@/lib/data";

const statusConfig = {
  "Last Month": { label: "Last Month", icon: "◀", opacity: 0.5 },
  Current: { label: "Current Promo", icon: "●", opacity: 1 },
  "Next Month": { label: "Next Month", icon: "▶", opacity: 0.75 },
};

export default function PromoCalendar({ promos }: { promos: Promo[] }) {
  const ordered = [
    promos.find((p) => p.status === "Last Month"),
    promos.find((p) => p.status === "Current"),
    promos.find((p) => p.status === "Next Month"),
  ].filter(Boolean) as Promo[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {ordered.map((promo) => {
        const config = statusConfig[promo.status];
        const isCurrent = promo.status === "Current";

        return (
          <div
            key={promo.id}
            className="rounded-xl p-5 relative overflow-hidden transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: isCurrent
                ? `2px solid ${promo.color}`
                : "1px solid var(--border)",
              opacity: config.opacity,
            }}
          >
            {isCurrent && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${promo.color}12, transparent 70%)`,
                }}
              />
            )}

            {/* Status badge */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `${promo.color}20`,
                  color: promo.color,
                  border: `1px solid ${promo.color}40`,
                }}
              >
                {config.icon} {config.label}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {promo.month} {promo.year}
              </span>
            </div>

            {/* Promo Name */}
            <h3 className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {promo.name}
            </h3>

            {/* Offer */}
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: promo.color }}
            >
              {promo.offer}
            </p>

            {/* Details */}
            <div
              className="rounded-lg p-3 text-xs leading-relaxed"
              style={{
                background: "var(--surface-2)",
                color: "var(--text-secondary)",
              }}
            >
              {promo.details}
            </div>
          </div>
        );
      })}
    </div>
  );
}
