"use client";

import type { AdItem } from "@/lib/data";

const formatIcons: Record<string, string> = {
  "Video Ad": "▶",
  "Image Ad": "◻",
  Carousel: "⧉",
  "Story Ad": "◻",
};

export default function MetaAdsGrid({ ads }: { ads: AdItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.url ?? undefined}
          target={ad.url ? "_blank" : undefined}
          rel={ad.url ? "noopener noreferrer" : undefined}
          className="rounded-xl overflow-hidden transition-all duration-200 block"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            cursor: ad.url ? "pointer" : "default",
            textDecoration: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = ad.badgeColor + "60")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
        >
          {/* Ad Format Banner */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              background: `linear-gradient(135deg, ${ad.badgeColor}20, ${ad.badgeColor}08)`,
              borderBottom: `1px solid ${ad.badgeColor}20`,
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: ad.badgeColor, fontSize: "16px" }}>
                {formatIcons[ad.format] ?? "•"}
              </span>
              <span className="text-xs font-semibold" style={{ color: ad.badgeColor }}>
                {ad.format}
              </span>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {ad.estimatedRuntime}
            </span>
          </div>

          <div className="p-4">
            <p className="text-xs font-semibold mb-2" style={{ color: ad.badgeColor }}>
              {ad.company}
            </p>

            {/* Headline */}
            <blockquote
              className="text-sm font-medium leading-snug mb-4 pl-3"
              style={{
                color: "var(--text-primary)",
                borderLeft: `2px solid ${ad.badgeColor}`,
              }}
            >
              &ldquo;{ad.headline}&rdquo;
            </blockquote>

            {/* CTA + Objective */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: `${ad.badgeColor}20`,
                  color: ad.badgeColor,
                  border: `1px solid ${ad.badgeColor}40`,
                }}
              >
                CTA: {ad.cta}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-secondary)",
                }}
              >
                {ad.objective}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {ad.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
