import SectionHeader from "@/components/SectionHeader";
import SolarContentFeed from "@/components/SolarContentFeed";

export default function CreativeDirectorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Creative Director
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Research hub — what top solar companies are producing right now
        </p>
      </div>

      <section>
        <SectionHeader
          title="Top Solar Company Content"
          subtitle="Latest content from industry leaders — updated via Claude co-work"
          icon="🏢"
          badge="Claude Feed"
          badgeColor="#10B981"
        />
        <SolarContentFeed />
      </section>
    </div>
  );
}
