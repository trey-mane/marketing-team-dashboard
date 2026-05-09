"use client";

import { useEffect, useState } from "react";
import type { AdItem } from "@/lib/data";
import MetaAdsGrid from "./MetaAdsGrid";

export default function MetaAdsFeed() {
  const [items, setItems] = useState<AdItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/meta-ads")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-52 rounded-xl animate-pulse" style={{ background: "var(--surface)" }} />
        ))}
      </div>
    );
  }

  return <MetaAdsGrid ads={items} />;
}
