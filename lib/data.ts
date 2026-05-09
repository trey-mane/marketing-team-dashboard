export interface ContentItem {
  id: string;
  company: string;
  title: string;
  type: "Video" | "Reel" | "Blog" | "Ad" | "Story";
  platform: "YouTube" | "Instagram" | "TikTok" | "Facebook" | "LinkedIn" | "Website";
  views?: string;
  engagement?: string;
  date: string;
  tags: string[];
  thumbnailColor: string;
  url?: string;
}

export interface AdItem {
  id: string;
  company: string;
  headline: string;
  cta: string;
  format: "Video Ad" | "Image Ad" | "Carousel" | "Story Ad";
  objective: string;
  estimatedRuntime: string;
  tags: string[];
  badgeColor: string;
  url?: string;
}

export interface TrendingTopic {
  id: string;
  topic: string;
  description: string;
  momentum: "Hot" | "Rising" | "Steady";
  category: string;
}

export interface Promo {
  id: string;
  month: string;
  year: number;
  name: string;
  offer: string;
  details: string;
  status: "Last Month" | "Current" | "Next Month";
  color: string;
}

// ── Solar Company Content (Creative Director + Video Editor) ──────────────────
export const solarCompanyContent: ContentItem[] = [
  {
    id: "cc1",
    company: "Sunrun",
    title: "How We're Powering 900,000+ Homes with Clean Energy",
    type: "Video",
    platform: "YouTube",
    views: "284K",
    engagement: "4.2%",
    date: "2026-04-28",
    tags: ["brand story", "scale", "clean energy"],
    thumbnailColor: "#F97316",
  },
  {
    id: "cc2",
    company: "Tesla Solar",
    title: "Powerwall 3 — Never Lose Power Again",
    type: "Reel",
    platform: "Instagram",
    views: "1.1M",
    engagement: "6.8%",
    date: "2026-05-01",
    tags: ["battery storage", "product launch", "lifestyle"],
    thumbnailColor: "#EF4444",
  },
  {
    id: "cc3",
    company: "SunPower",
    title: "25-Year Panel Guarantee — Here's What That Means",
    type: "Blog",
    platform: "Website",
    views: "42K",
    engagement: "3.1%",
    date: "2026-04-15",
    tags: ["warranty", "trust", "education"],
    thumbnailColor: "#3B82F6",
  },
  {
    id: "cc4",
    company: "Momentum Solar",
    title: "Real Customer Saves $210/Month — Watch Her Story",
    type: "Video",
    platform: "Facebook",
    views: "390K",
    engagement: "5.7%",
    date: "2026-04-22",
    tags: ["testimonial", "savings", "social proof"],
    thumbnailColor: "#8B5CF6",
  },
  {
    id: "cc5",
    company: "Vivint Solar",
    title: "Installation in Under 3 Hours — Full Time-Lapse",
    type: "Reel",
    platform: "TikTok",
    views: "2.3M",
    engagement: "9.4%",
    date: "2026-05-03",
    tags: ["installation", "process", "satisfying"],
    thumbnailColor: "#10B981",
  },
  {
    id: "cc6",
    company: "ADT Solar",
    title: "Solar + Home Security: The Complete Smart Home Stack",
    type: "Video",
    platform: "YouTube",
    views: "178K",
    engagement: "3.9%",
    date: "2026-04-30",
    tags: ["bundling", "smart home", "upsell"],
    thumbnailColor: "#F59E0B",
  },
  {
    id: "cc7",
    company: "SunPower",
    title: "IRA Tax Credit Explained in 60 Seconds",
    type: "Reel",
    platform: "Instagram",
    views: "870K",
    engagement: "7.2%",
    date: "2026-05-05",
    tags: ["tax credit", "education", "CTA"],
    thumbnailColor: "#06B6D4",
  },
  {
    id: "cc8",
    company: "Sunrun",
    title: "Behind the Scenes: What a Solar Consultation Looks Like",
    type: "Reel",
    platform: "TikTok",
    views: "1.5M",
    engagement: "8.1%",
    date: "2026-05-07",
    tags: ["behind the scenes", "trust", "process"],
    thumbnailColor: "#EC4899",
  },
];

// ── Top Creator Content (Video Editor) ───────────────────────────────────────
export const creatorContent: ContentItem[] = [
  {
    id: "cr1",
    company: "Matt Ferrell",
    title: "Is Solar Actually Worth It in 2026? (Honest Answer)",
    type: "Video",
    platform: "YouTube",
    views: "1.8M",
    engagement: "5.3%",
    date: "2026-04-25",
    tags: ["honest review", "ROI", "education"],
    thumbnailColor: "#F97316",
  },
  {
    id: "cr2",
    company: "Undecided w/ Matt Ferrell",
    title: "I Installed a Whole-Home Battery — Here's What Happened",
    type: "Video",
    platform: "YouTube",
    views: "2.2M",
    engagement: "6.1%",
    date: "2026-05-02",
    tags: ["battery storage", "personal", "data-driven"],
    thumbnailColor: "#3B82F6",
  },
  {
    id: "cr3",
    company: "Electrified Garage",
    title: "Solar Payback Period Myth — Debunked",
    type: "Reel",
    platform: "TikTok",
    views: "3.7M",
    engagement: "10.2%",
    date: "2026-05-01",
    tags: ["myth busting", "payback", "viral"],
    thumbnailColor: "#EF4444",
  },
  {
    id: "cr4",
    company: "Clean Energy Revolution",
    title: "30% Tax Credit — Everything You Need to Know",
    type: "Video",
    platform: "YouTube",
    views: "980K",
    engagement: "4.8%",
    date: "2026-04-18",
    tags: ["IRA", "tax credit", "finance"],
    thumbnailColor: "#10B981",
  },
  {
    id: "cr5",
    company: "Solar Nerd",
    title: "Best Solar Panels Ranked 2026 (After Testing 11 Brands)",
    type: "Video",
    platform: "YouTube",
    views: "1.4M",
    engagement: "5.9%",
    date: "2026-04-29",
    tags: ["comparison", "product review", "trusted"],
    thumbnailColor: "#8B5CF6",
  },
  {
    id: "cr6",
    company: "Two Bit da Vinci",
    title: "Net Metering is Changing — Here's What To Do",
    type: "Reel",
    platform: "Instagram",
    views: "620K",
    engagement: "7.4%",
    date: "2026-05-04",
    tags: ["net metering", "policy", "urgency"],
    thumbnailColor: "#F59E0B",
  },
];

// ── Trending Topics (Video Editor + Ads Director) ─────────────────────────────
export const trendingTopics: TrendingTopic[] = [
  {
    id: "t1",
    topic: "Net Metering Policy Changes",
    description:
      "Several states are rolling back NEM 3.0 rates. Homeowners rushing to go solar before export rates drop further.",
    momentum: "Hot",
    category: "Policy",
  },
  {
    id: "t2",
    topic: "IRA 30% Tax Credit — Expiration Anxiety",
    description:
      "Search volume for 'solar tax credit 2026' up 340% YoY. Consumers want clarity on deadlines.",
    momentum: "Hot",
    category: "Finance",
  },
  {
    id: "t3",
    topic: "Whole-Home Battery Storage",
    description:
      "Powerwall 3, Franklin Home Power, and Enphase IQ driving massive interest in grid-independent setups.",
    momentum: "Rising",
    category: "Technology",
  },
  {
    id: "t4",
    topic: "Solar + EV Charging Bundles",
    description:
      "EV owners increasingly pairing solar installs with Level 2 chargers. Combined ROI messaging resonates.",
    momentum: "Rising",
    category: "Lifestyle",
  },
  {
    id: "t5",
    topic: "Energy Independence / Grid Resilience",
    description:
      "Extreme weather events driving 'never lose power again' messaging to peak performance.",
    momentum: "Hot",
    category: "Awareness",
  },
  {
    id: "t6",
    topic: "Solar Loan vs. Lease vs. Cash — Buyer Confusion",
    description:
      "High search volume on financing comparisons. Educational content on this topic drives high engagement.",
    momentum: "Steady",
    category: "Finance",
  },
  {
    id: "t7",
    topic: "Utility Rate Increases",
    description:
      "PG&E, FPL, and other utilities raising rates 12–18%. 'Lock in your rate' messaging performing well.",
    momentum: "Rising",
    category: "Savings",
  },
  {
    id: "t8",
    topic: "Virtual Power Plants (VPPs)",
    description:
      "Utilities partnering with solar companies to pay battery owners during peak demand. Growing curiosity.",
    momentum: "Rising",
    category: "Technology",
  },
];

// ── Meta Ads Library (Ads Director) ──────────────────────────────────────────
export const metaAds: AdItem[] = [
  {
    id: "a1",
    company: "Sunrun",
    headline: "$0 Down. Lock In Your Rate Before Utilities Raise Prices Again.",
    cta: "Get a Free Quote",
    format: "Video Ad",
    objective: "Lead Generation",
    estimatedRuntime: "45+ days",
    tags: ["savings hook", "urgency", "zero down"],
    badgeColor: "#F97316",
  },
  {
    id: "a2",
    company: "Tesla Solar",
    headline: "Own Your Energy. Powerwall + Solar — Starting at $199/mo.",
    cta: "Order Now",
    format: "Image Ad",
    objective: "Conversions",
    estimatedRuntime: "30+ days",
    tags: ["ownership", "bundle", "monthly payment"],
    badgeColor: "#EF4444",
  },
  {
    id: "a3",
    company: "SunPower",
    headline: "The Only Panel with a 25-Year Complete Warranty. See Why It Matters.",
    cta: "Learn More",
    format: "Carousel",
    objective: "Traffic",
    estimatedRuntime: "60+ days",
    tags: ["trust", "warranty", "product quality"],
    badgeColor: "#3B82F6",
  },
  {
    id: "a4",
    company: "Momentum Solar",
    headline: "She Was Paying $380/Month. Now She Pays $0. Real Customer Story.",
    cta: "See Her Story",
    format: "Video Ad",
    objective: "Lead Generation",
    estimatedRuntime: "30+ days",
    tags: ["testimonial", "social proof", "savings"],
    badgeColor: "#8B5CF6",
  },
  {
    id: "a5",
    company: "ADT Solar",
    headline: "Claim Your 30% Federal Tax Credit Before It's Too Late.",
    cta: "Check Eligibility",
    format: "Image Ad",
    objective: "Lead Generation",
    estimatedRuntime: "20+ days",
    tags: ["urgency", "tax credit", "FOMO"],
    badgeColor: "#10B981",
  },
  {
    id: "a6",
    company: "Vivint Solar",
    headline: "No Electric Bill for 25 Years? Here's How Neighbors Are Doing It.",
    cta: "Get My Savings Estimate",
    format: "Video Ad",
    objective: "Lead Generation",
    estimatedRuntime: "50+ days",
    tags: ["social proof", "long-term savings", "curiosity"],
    badgeColor: "#F59E0B",
  },
];

// ── Promo Calendar (Ads Director) ─────────────────────────────────────────────
export const promos: Promo[] = [
  {
    id: "p1",
    month: "April",
    year: 2026,
    name: "Earth Month Special",
    offer: "$1,000 Off + Free Smart Thermostat",
    details:
      "Earth Day promo running April 1–30. Discount applied at point of sale. Smart thermostat ($149 value) included with all signed contracts.",
    status: "Last Month",
    color: "#10B981",
  },
  {
    id: "p2",
    month: "May",
    year: 2026,
    name: "Summer Ready Sale",
    offer: "$500 Off + 18-Month No-Payment Financing",
    details:
      "Running May 1–31. Messaging focused on beating summer utility spikes. 18-month deferred payment through GreenSky. No prepayment penalty.",
    status: "Current",
    color: "#F97316",
  },
  {
    id: "p3",
    month: "June",
    year: 2026,
    name: "Father's Day Power Up",
    offer: "Free Powerwall Installation ($3,500 Value) with Full System",
    details:
      "Planning phase. Target: homeowners with EVs and high summer usage. Messaging: 'Give Dad the gift of energy independence.' Need creative assets by May 22.",
    status: "Next Month",
    color: "#3B82F6",
  },
];
