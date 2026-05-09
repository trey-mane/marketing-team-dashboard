"use client";

import type { ContentItem } from "@/lib/data";

const platformIcons: Record<string, string> = {
  YouTube: "▶",
  Instagram: "◈",
  TikTok: "♪",
  Facebook: "f",
  LinkedIn: "in",
  Website: "◉",
};

export default function ContentGrid({ items }: { items: ContentItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl overflow-hidden transition-all duration-200"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = item.thumbnailColor + "60")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
        >
          {/* Thumbnail */}
          <div
            className="h-28 relative flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${item.thumbnailColor}30, ${item.thumbnailColor}10)`,
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: `${item.thumbnailColor}30`, color: item.thumbnailColor }}
            >
              {platformIcons[item.platform] ?? "•"}
            </div>
            {/* Type badge */}
            <span
              className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${item.thumbnailColor}25`,
                color: item.thumbnailColor,
                border: `1px solid ${item.thumbnailColor}40`,
              }}
            >
              {item.type}
            </span>
            {/* Platform */}
            <span
              className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.4)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {item.platform}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: item.thumbnailColor }}
            >
              {item.company}
            </p>
            <h3
              className="text-sm font-medium leading-snug mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {item.title}
            </h3>

            {/* Stats */}
            {(item.views || item.engagement) && (
              <div className="flex gap-3 mb-3">
                {item.views && (
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    👁 {item.views}
                  </span>
                )}
                {item.engagement && (
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    ♡ {item.engagement}
                  </span>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
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
        </div>
      ))}
    </div>
  );
}
