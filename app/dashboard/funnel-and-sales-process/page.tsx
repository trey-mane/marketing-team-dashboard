import { auth } from "@/auth";

// ── Data ──────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  whatTheyDo: string;
  group?: string;
}

interface FunnelStage {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  teamMembers: TeamMember[];
}

interface SalesStep {
  name: string;
  role?: string;
  numberedSteps?: string[];
  details?: string[];
}

interface SalesPath {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  note?: string;
  steps: SalesStep[];
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: "awareness",
    number: "01",
    name: "AWARENESS",
    subtitle: "Followers & Viewers",
    description:
      "The people who discover Got Watts through our content and ads. They don't know us yet. Our job is to earn attention, build trust, and stay top of mind.",
    color: "#F97316",
    teamMembers: [
      {
        name: "Ryan Tom",
        role: "Organic Content",
        whatTheyDo:
          "Produces 4 videos/month on IG and Facebook. Honest, protective, contractor-real content that builds trust before a lead ever fills out a form.",
      },
      {
        name: "Rochelle Gamboa",
        role: "Jeremy's Personal Brand (Content)",
        whatTheyDo:
          "Edits short and long-form video for Jeremy. Builds the content calendar, writes scripts and outlines, repurposes content across formats so Jeremy stays in front of homeowners.",
      },
      {
        name: "Jacob Smith",
        role: "Jeremy's Personal Brand (Videography)",
        whatTheyDo:
          "On-site filming for Jeremy. Captures the raw footage that fuels everything Rochelle edits.",
      },
    ],
  },
  {
    id: "interest",
    number: "02",
    name: "INTEREST",
    subtitle: "New Lead",
    description:
      "A viewer raises their hand. They click an ad, fill out a form, or DM us. They are no longer anonymous — they are an engaged lead with contact info, ready to be qualified.",
    color: "#3B82F6",
    teamMembers: [
      {
        name: "Cole Baker",
        role: "Meta Ads",
        whatTheyDo:
          "Funnel build from ad to lead capture. Optimizes the path from click → form fill. Pixel and conversion tracking ensure no lead is lost.",
      },
      {
        name: "Billy & Fred (Xclnt)",
        role: "Google Ads & Website",
        whatTheyDo:
          "Execute the landing page from Trey's wireframe. Manage Google Ads. Every form fill on the site flows through their work.",
      },
      {
        name: "Trey Micheletti",
        role: "Growth Strategy",
        whatTheyDo:
          "Owns speed-to-lead. The minutes between form submission and first contact decide whether a lead converts or goes cold. Trey audits and tightens the full pipeline.",
      },
    ],
  },
  {
    id: "conversion",
    number: "03",
    name: "CONVERSION",
    subtitle: "Closed Deal",
    description:
      "This is where our leads land. We don't close them — Got Watts does. Our job is to deliver qualified, pre-sold leads. Their job is to close.",
    color: "#10B981",
    teamMembers: [
      {
        name: "Samantha",
        role: "Internal Sales Rep",
        whatTheyDo: "~10 deals/mo · Capacity: 20–25",
        group: "Internal",
      },
      {
        name: "Jarrett",
        role: "Internal Sales Rep",
        whatTheyDo: "~10 deals/mo · Capacity: Close to Sam's",
        group: "Internal",
      },
      {
        name: "Bill & Adrian",
        role: "External Dealer",
        whatTheyDo: "Ready to activate — needs leads now.",
        group: "External",
      },
      {
        name: "Greg · Joshua · Skylar",
        role: "External Dealers",
        whatTheyDo: "Trusted dealers — unlock when leads flow.",
        group: "External",
      },
    ],
  },
];

const SALES_PROCESS: { subtitle: string; paths: SalesPath[] } = {
  subtitle: "A closer look at what every lead goes through once it reaches the Got Watts team.",
  paths: [
    {
      id: "normal",
      name: "Normal Process",
      steps: [
        { name: "Lead Comes In" },
        {
          name: "Podium",
          role: "Customer Service Rep",
          details: ["Qualifies the lead via text"],
        },
        {
          name: "Vantage GHL",
          role: "Sales Rep",
          numberedSteps: [
            "Call, text, and email the lead",
            "Book and run a Discovery Call via Zoom",
            "Gather info, build options, and present",
            "2–3 follow-up meetings (30 min – 1 hr each)",
          ],
        },
      ],
    },
    {
      id: "meta",
      name: "Meta Leads Process",
      badge: "META LEADS",
      badgeColor: "#8B5CF6",
      note: "Skips Podium — goes straight to Sales Rep",
      steps: [
        {
          name: "Lead Comes In",
          details: ["From Meta Ads"],
        },
        {
          name: "Vantage GHL",
          role: "Sales Rep",
          numberedSteps: [
            "Call, text, and email — gather info + book discovery",
            "Run Discovery Call via Zoom",
            "Gather info, build options, and present",
            "2–3 follow-up meetings (30 min – 1 hr each)",
          ],
        },
      ],
    },
  ],
};

// Maps session.user.name → personalization data
const USER_HIGHLIGHTS: Record<
  string,
  { firstName: string; memberNames: string[]; stageIds: string[] }
> = {
  "Ryan Tom": {
    firstName: "Ryan",
    memberNames: ["Ryan Tom"],
    stageIds: ["awareness"],
  },
  "Rochelle Gamboa": {
    firstName: "Rochelle",
    memberNames: ["Rochelle Gamboa"],
    stageIds: ["awareness"],
  },
  "Cole Baker": {
    firstName: "Cole",
    memberNames: ["Cole Baker"],
    stageIds: ["interest"],
  },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function StepCard({ step, color }: { step: SalesStep; color: string }) {
  return (
    <div
      className="rounded-lg p-3 flex-shrink-0"
      style={{
        background: "var(--surface-2)",
        border: `1px solid ${color}30`,
        minWidth: 150,
        maxWidth: 220,
      }}
    >
      <p className="text-xs font-semibold mb-0.5" style={{ color }}>
        {step.name}
      </p>
      {step.role && (
        <p className="text-xs font-medium mb-2" style={{ color: "var(--text-primary)" }}>
          {step.role}
        </p>
      )}
      {step.details && (
        <ul className="space-y-0.5 mb-1">
          {step.details.map((d, i) => (
            <li key={i} className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {d}
            </li>
          ))}
        </ul>
      )}
      {step.numberedSteps && (
        <ol className="space-y-1">
          {step.numberedSteps.map((s, i) => (
            <li key={i} className="flex gap-1.5 text-xs">
              <span
                className="flex-shrink-0 font-bold"
                style={{ color, minWidth: 14 }}
              >
                {i + 1}.
              </span>
              <span style={{ color: "var(--text-secondary)" }}>{s}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function FunnelAndSalesProcessPage() {
  const session = await auth();
  const userName = session?.user?.name ?? "";
  const highlight = USER_HIGHLIGHTS[userName] ?? null;

  const bannerStageColor =
    highlight
      ? FUNNEL_STAGES.find((s) => s.id === highlight.stageIds[0])?.color ?? "#F97316"
      : "#F97316";

  const bannerStageNames = highlight
    ? highlight.stageIds
        .map((id) => FUNNEL_STAGES.find((s) => s.id === id)?.name)
        .filter(Boolean)
        .join(" + ")
    : "";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Funnel & Sales Process
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Our marketing feeds directly into Got Watts&apos; sales pipeline. Here&apos;s how the whole machine works.
        </p>
      </div>

      {/* Personalized Banner */}
      {highlight && (
        <div
          className="rounded-xl px-5 py-4 flex items-start gap-3"
          style={{
            background: `linear-gradient(135deg, ${bannerStageColor}18, ${bannerStageColor}06)`,
            border: `1px solid ${bannerStageColor}35`,
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1.5 }}>👋</span>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
            <span className="font-semibold">Hi {highlight.firstName} —</span> your work powers{" "}
            <span className="font-semibold" style={{ color: bannerStageColor }}>
              {bannerStageNames}
            </span>
            . Here&apos;s how every lead flows from our funnel into the Got Watts sales process.
          </p>
        </div>
      )}

      {/* Connected Flow */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Marketing Funnel ── */}
        <div className="lg:w-[400px] flex-shrink-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>
            The Marketing Funnel
          </p>
          <div className="flex flex-col gap-3">
            {FUNNEL_STAGES.map((stage, i) => {
              const stageHighlighted = highlight?.stageIds.includes(stage.id) ?? false;

              // Group conversion members
              const internalMembers = stage.teamMembers.filter(m => m.group === "Internal");
              const externalMembers = stage.teamMembers.filter(m => m.group === "External");
              const ungroupedMembers = stage.teamMembers.filter(m => !m.group);

              return (
                <div key={stage.id}>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${stageHighlighted ? stage.color + "55" : "var(--border)"}`,
                      boxShadow: stageHighlighted ? `0 0 24px ${stage.color}12` : "none",
                    }}
                  >
                    {/* Stage header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${stage.color}25`, color: stage.color }}
                        >
                          {stage.number}
                        </span>
                        <span className="text-sm font-bold tracking-wide" style={{ color: stage.color }}>
                          {stage.name}
                        </span>
                        {stageHighlighted && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                            style={{
                              background: `${stage.color}20`,
                              color: stage.color,
                              border: `1px solid ${stage.color}40`,
                              fontSize: 10,
                            }}
                          >
                            YOUR STAGE
                          </span>
                        )}
                      </div>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {stage.subtitle}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                      {stage.description}
                    </p>

                    {/* Ungrouped members */}
                    {ungroupedMembers.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {ungroupedMembers.map((member) => {
                          const isMe = stageHighlighted && (highlight?.memberNames.includes(member.name) ?? false);
                          return (
                            <MemberCard key={`${stage.id}-${member.name}`} member={member} color={stage.color} isMe={isMe} />
                          );
                        })}
                      </div>
                    )}

                    {/* Grouped members (Conversion) */}
                    {internalMembers.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: stage.color, fontSize: 10 }}>
                          Internal Sales Team
                        </p>
                        <div className="flex flex-col gap-2">
                          {internalMembers.map((member) => (
                            <MemberCard key={`${stage.id}-${member.name}`} member={member} color={stage.color} isMe={false} />
                          ))}
                        </div>
                      </div>
                    )}
                    {externalMembers.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--text-secondary)", fontSize: 10 }}>
                          External Dealers
                        </p>
                        <div className="flex flex-col gap-2">
                          {externalMembers.map((member) => (
                            <MemberCard key={`${stage.id}-${member.name}`} member={member} color={stage.color} isMe={false} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Down arrow between stages */}
                  {i < FUNNEL_STAGES.length - 1 && (
                    <div className="flex justify-center py-1">
                      <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>↓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Stage 3 Detail: Sales Process ── */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>
            Stage 3 — What Conversion Looks Like
          </p>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
            {SALES_PROCESS.subtitle}
          </p>

          <div className="flex flex-col gap-4">
            {SALES_PROCESS.paths.map((path) => (
              <div
                key={path.id}
                className="rounded-xl p-4"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${path.badgeColor ? path.badgeColor + "30" : "#10B98130"}`,
                }}
              >
                {/* Path header */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {path.name}
                  </span>
                  {path.badge && path.badgeColor && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: `${path.badgeColor}20`,
                        color: path.badgeColor,
                        border: `1px solid ${path.badgeColor}40`,
                      }}
                    >
                      {path.badge}
                    </span>
                  )}
                  {path.note && (
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      · {path.note}
                    </span>
                  )}
                </div>

                {/* Steps */}
                <div className="flex flex-wrap items-start gap-2">
                  {path.id === "normal" &&
                    path.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <StepCard step={step} color="#10B981" />
                        {i < path.steps.length - 1 && (
                          <span className="self-start mt-3 flex-shrink-0" style={{ color: "#10B981", fontSize: 16 }}>
                            →
                          </span>
                        )}
                      </div>
                    ))}

                  {path.id === "meta" && (
                    <>
                      <StepCard step={path.steps[0]} color="#8B5CF6" />
                      <div className="flex flex-col items-center gap-1 self-start mt-3 flex-shrink-0">
                        <span style={{ color: "#8B5CF6", fontSize: 16 }}>→</span>
                        <div
                          className="text-center px-2 py-1 rounded"
                          style={{
                            background: "var(--surface-2)",
                            border: "1px dashed var(--border)",
                            opacity: 0.4,
                          }}
                        >
                          <p style={{ color: "var(--text-secondary)", fontSize: 10 }}>Podium</p>
                          <p style={{ color: "var(--text-secondary)", fontSize: 9 }}>skipped</p>
                        </div>
                        <span style={{ color: "#8B5CF6", fontSize: 16 }}>→</span>
                      </div>
                      <StepCard step={path.steps[1]} color="#8B5CF6" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberCard({
  member,
  color,
  isMe,
}: {
  member: TeamMember;
  color: string;
  isMe: boolean;
}) {
  return (
    <div
      className="rounded-lg p-3 relative"
      style={{
        background: isMe ? `${color}10` : "var(--surface-2)",
        border: `1px solid ${isMe ? color + "45" : "var(--border)"}`,
      }}
    >
      {isMe && (
        <span
          className="absolute top-2 right-2 font-bold rounded-full px-1.5 py-0.5"
          style={{ background: color, color: "#fff", fontSize: 9, letterSpacing: "0.05em" }}
        >
          YOU
        </span>
      )}
      <p
        className="text-xs font-semibold mb-0.5"
        style={{ color: "var(--text-primary)", paddingRight: isMe ? "2rem" : 0 }}
      >
        {member.name}
      </p>
      <p className="text-xs mb-1 font-medium" style={{ color }}>
        {member.role}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {member.whatTheyDo}
      </p>
    </div>
  );
}
