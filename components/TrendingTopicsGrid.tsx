"use client";

import type { TrendingTopic } from "@/lib/data";

const momentumConfig = {
  Hot: { color: "#EF4444", bg: "#EF444415", label: "🔥 Hot" },
  Rising: { color: "#F97316", bg: "#F9731615", label: "↑ Rising" },
  Steady: { color: "#6B7280", bg: "#6B728015", label: "→ Steady" },
};

export default function TrendingTopicsGrid({ topics }: { topics: TrendingTopic[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {topics.map((topic) => {
        const momentum = momentumConfig[topic.momentum];
        return (
          <div
            key={topic.id}
            className="rounded-xl p-5 transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = momentum.color + "50")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: momentum.bg,
                  color: momentum.color,
                  border: `1px solid ${momentum.color}30`,
                }}
              >
                {momentum.label}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-secondary)",
                }}
              >
                {topic.category}
              </span>
            </div>

            <h3
              className="text-sm font-semibold mb-2 leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {topic.topic}
            </h3>

            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {topic.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
