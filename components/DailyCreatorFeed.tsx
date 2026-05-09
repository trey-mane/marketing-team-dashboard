"use client";

import { useEffect, useState } from "react";
import type { DailyPull, CreatorVideo } from "@/lib/creator-pulls";

const platformColors: Record<string, string> = {
  YouTube: "#EF4444",
  TikTok: "#EC4899",
  Instagram: "#8B5CF6",
  Facebook: "#3B82F6",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00Z");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T12:00:00Z");
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today.getTime() - target.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function VideoCard({ video }: { video: CreatorVideo }) {
  const platformColor = platformColors[video.platform] ?? "#9ca3af";

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = video.accentColor + "70")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* Header strip */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${video.accentColor}18, ${video.accentColor}06)`,
          borderBottom: `1px solid ${video.accentColor}20`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: platformColor + "20", color: platformColor }}
          >
            {video.platform}
          </span>
          <span className="text-xs font-semibold" style={{ color: video.accentColor }}>
            {video.creator}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {video.views && (
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              👁 {video.views}
            </span>
          )}
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}
          >
            {video.duration}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Format grid */}
        <div className="grid grid-cols-2 gap-2">
          <FormatRow label="Format" value={video.videoFormat} color={video.accentColor} />
          <FormatRow label="Hook" value={video.hookStyle} color={video.accentColor} />
          <FormatRow label="Edit Style" value={video.editStyle} color={video.accentColor} />
          <FormatRow label="Thumbnail" value={video.thumbnailStyle} color={video.accentColor} />
        </div>

        {video.url && (
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium mt-1 transition-opacity hover:opacity-70"
            style={{ color: video.accentColor }}
          >
            <span>↗</span> Watch Video
          </a>
        )}
      </div>
    </div>
  );
}

function FormatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{ background: "var(--surface-2)" }}
    >
      <p className="text-xs mb-0.5" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
      <p className="text-xs font-semibold leading-snug" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

export default function DailyCreatorFeed() {
  const [pulls, setPulls] = useState<DailyPull[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/creator-pulls")
      .then((r) => r.json())
      .then((data: DailyPull[]) => {
        setPulls(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activePull = pulls[activeIndex];

  return (
    <div>
      {/* 7-day tab bar */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 overflow-x-auto"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {loading
          ? Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 min-w-[80px] h-10 rounded-lg animate-pulse"
                style={{ background: "var(--surface-2)" }}
              />
            ))
          : pulls.map((pull, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={pull.date}
                  onClick={() => setActiveIndex(i)}
                  className="flex-1 min-w-[80px] px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-center"
                  style={{
                    background: isActive ? "#F97316" : "transparent",
                    color: isActive ? "white" : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  <span className="block">{formatDate(pull.date)}</span>
                  <span
                    className="block text-xs font-normal mt-0.5"
                    style={{ color: isActive ? "rgba(255,255,255,0.7)" : "var(--text-secondary)" }}
                  >
                    {pull.videos.length} videos
                  </span>
                </button>
              );
            })}
      </div>

      {/* Pull metadata */}
      {activePull && (
        <div className="flex items-center gap-2 mb-5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: activeIndex === 0 ? "#10B981" : "#6B7280" }}
          />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {activeIndex === 0 ? "Latest pull" : `Pulled`} ·{" "}
            {new Date(activePull.pulledAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full ml-1"
            style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}
          >
            {activePull.videos.length} creators tracked
          </span>
        </div>
      )}

      {/* Video grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-xl animate-pulse"
              style={{ background: "var(--surface)" }}
            />
          ))}
        </div>
      ) : activePull?.videos.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activePull.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-xl p-10 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            No pull data for this day yet.
          </p>
        </div>
      )}
    </div>
  );
}
