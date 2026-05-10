import SectionHeader from "@/components/SectionHeader";
import SolarContentFeed from "@/components/SolarContentFeed";
import TrendingTopicsFeed from "@/components/TrendingTopicsFeed";
import DailyCreatorFeed from "@/components/DailyCreatorFeed";

export default function VideoEditorDashboard() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Content Creator
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Research hub for topics, wrapping paper, and content formats.
        </p>
      </div>

      {/* Daily Creator Feed — 7-day pulls from Claude co-work */}
      <section>
        <SectionHeader
          title="Daily Creator Pulls"
          subtitle="Latest content from top creators to study for format & wrapping paper ideas."
          icon="🎬"
          badge="8 AM Daily · Claude co-work"
          badgeColor="#3B82F6"
        />
        <DailyCreatorFeed />
      </section>

      {/* Solar Industry Content */}
      <section>
        <SectionHeader
          title="Solar Industry Top Content"
          subtitle="Best-performing content from top solar companies right now"
          icon="☀️"
          badge="Claude Feed"
          badgeColor="#10B981"
        />
        <SolarContentFeed />
      </section>

      {/* Trending Topics */}
      <section>
        <SectionHeader
          title="Trending Topics in Solar"
          subtitle="What your client should be speaking on right now — high momentum subjects"
          icon="🔥"
          badge="Updated Weekly"
          badgeColor="#F97316"
        />
        <TrendingTopicsFeed />
      </section>
    </div>
  );
}
