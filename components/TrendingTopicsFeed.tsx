"use client";

import { useEffect, useState } from "react";
import type { TrendingTopic } from "@/lib/data";
import TrendingTopicsGrid from "./TrendingTopicsGrid";

export default function TrendingTopicsFeed() {
  const [items, setItems] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trending-topics")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 rounded-xl animate-pulse" style={{ background: "var(--surface)" }} />
        ))}
      </div>
    );
  }

  return <TrendingTopicsGrid topics={items} />;
}
