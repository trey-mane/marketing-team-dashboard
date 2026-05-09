interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  icon,
  badge,
  badgeColor = "#10B981",
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{icon}</span>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        </div>
      </div>
      {badge && (
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
          style={{
            background: `${badgeColor}20`,
            color: badgeColor,
            border: `1px solid ${badgeColor}40`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
