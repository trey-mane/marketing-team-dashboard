export interface CreatorVideo {
  id: string;
  creator: string;
  platform: "YouTube" | "TikTok" | "Instagram" | "Facebook";
  url?: string;
  // Format-focused fields (what the video editor cares about)
  videoFormat: string;        // e.g. "Talking Head", "Tutorial", "B-Roll + VO", "Reaction"
  duration: string;           // e.g. "2:14", "0:47", "12:03"
  hookStyle: string;          // e.g. "Question Hook", "Stat Hook", "Story Hook", "Controversy"
  editStyle: string;          // e.g. "Fast Cuts", "Minimal Cuts", "Heavy Text Overlays", "Cinematic"
  thumbnailStyle: string;     // e.g. "Face + Text", "Clean Graphic", "Before/After", "Curiosity Gap"
  views?: string;
  postedAt: string;           // ISO timestamp
  accentColor: string;
}

export interface DailyPull {
  date: string;          // YYYY-MM-DD
  pulledAt: string;      // ISO timestamp of when Claude co-work ran
  videos: CreatorVideo[];
}

// Seeded placeholder data for the last 7 days
// Replace with live KV data in production once Claude co-work is wired in
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

const seedVideos: Omit<CreatorVideo, "id" | "postedAt">[] = [
  {
    creator: "Matt Ferrell",
    platform: "YouTube",
    videoFormat: "Talking Head",
    duration: "11:32",
    hookStyle: "Stat Hook",
    editStyle: "Minimal Cuts + Text Callouts",
    thumbnailStyle: "Face + Bold Text",
    views: "142K",
    accentColor: "#F97316",
  },
  {
    creator: "Electrified Garage",
    platform: "TikTok",
    videoFormat: "B-Roll + Voiceover",
    duration: "0:58",
    hookStyle: "Controversy Hook",
    editStyle: "Fast Cuts + Heavy Text Overlays",
    thumbnailStyle: "Curiosity Gap",
    views: "890K",
    accentColor: "#EF4444",
  },
  {
    creator: "Two Bit da Vinci",
    platform: "YouTube",
    videoFormat: "Tutorial / Explainer",
    duration: "8:47",
    hookStyle: "Question Hook",
    editStyle: "Screen Capture + Talking Head Split",
    thumbnailStyle: "Clean Graphic + Data",
    views: "67K",
    accentColor: "#3B82F6",
  },
  {
    creator: "Solar Nerd",
    platform: "Instagram",
    videoFormat: "Before / After",
    duration: "0:30",
    hookStyle: "Visual Hook (no talking)",
    editStyle: "Cinematic + Slow Zoom",
    thumbnailStyle: "Before/After Split",
    views: "212K",
    accentColor: "#8B5CF6",
  },
  {
    creator: "Clean Energy Revolution",
    platform: "YouTube",
    videoFormat: "Reaction / Commentary",
    duration: "14:05",
    hookStyle: "Story Hook",
    editStyle: "Jump Cuts + PIP Reaction",
    thumbnailStyle: "Reaction Face + Headline",
    views: "44K",
    accentColor: "#10B981",
  },
  {
    creator: "Undecided w/ Matt Ferrell",
    platform: "YouTube",
    videoFormat: "Deep Dive / Documentary",
    duration: "18:22",
    hookStyle: "Curiosity Hook",
    editStyle: "B-Roll Heavy + Narration",
    thumbnailStyle: "Cinematic Still + Title",
    views: "198K",
    accentColor: "#F59E0B",
  },
  {
    creator: "Solar Nerd",
    platform: "TikTok",
    videoFormat: "Talking Head",
    duration: "1:14",
    hookStyle: "Bold Claim Hook",
    editStyle: "Single Shot + Captions",
    thumbnailStyle: "Face Close-Up",
    views: "1.2M",
    accentColor: "#EC4899",
  },
  {
    creator: "Electrified Garage",
    platform: "YouTube",
    videoFormat: "Vlog / Day-in-Life",
    duration: "21:08",
    hookStyle: "Story Hook",
    editStyle: "Handheld + Natural Cuts",
    thumbnailStyle: "Casual Face + Location",
    views: "31K",
    accentColor: "#06B6D4",
  },
];

function makePull(daysBack: number): DailyPull {
  const date = daysAgo(daysBack);
  // Rotate the seed so each day shows a different subset
  const offset = daysBack * 3;
  const videos = [...seedVideos.slice(offset % seedVideos.length), ...seedVideos]
    .slice(0, 5)
    .map((v, i) => ({
      ...v,
      id: `${date}-${i}`,
      postedAt: `${date}T${String(6 + i).padStart(2, "0")}:${i * 7}:00Z`,
    }));
  return {
    date,
    pulledAt: `${date}T08:00:00Z`,
    videos,
  };
}

export const PLACEHOLDER_PULLS: DailyPull[] = Array.from({ length: 7 }, (_, i) =>
  makePull(i)
);
