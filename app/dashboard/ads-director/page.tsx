import { metaAds, trendingTopics, promos } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import MetaAdsGrid from "@/components/MetaAdsGrid";
import TrendingTopicsGrid from "@/components/TrendingTopicsGrid";
import PromoCalendar from "@/components/PromoCalendar";

export default function AdsDirectorDashboard() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Ads Director
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Meta ads intelligence, trending topics, and promo calendar
        </p>
      </div>

      {/* Meta Ads Library */}
      <section>
        <SectionHeader
          title="Meta Ads Library — Top Solar"
          subtitle="Active ads from top solar companies pulled from the Meta Ad Library via Claude co-work"
          icon="📣"
          badge="Claude Feed"
          badgeColor="#8B5CF6"
        />
        <MetaAdsGrid ads={metaAds} />
      </section>

      {/* Trending Topics */}
      <section>
        <SectionHeader
          title="Trending Topics in Solar"
          subtitle="Hot conversations in the solar space — use these to inform ad angles"
          icon="🔥"
          badge="Updated Weekly"
          badgeColor="#F97316"
        />
        <TrendingTopicsGrid topics={trendingTopics} />
      </section>

      {/* Promo Calendar */}
      <section>
        <SectionHeader
          title="Promo Calendar"
          subtitle="Current, upcoming, and past promotional campaigns"
          icon="📅"
          badge="Live"
          badgeColor="#10B981"
        />
        <PromoCalendar promos={promos} />
      </section>
    </div>
  );
}
