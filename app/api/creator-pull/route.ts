import { NextRequest, NextResponse } from "next/server";
import type { DailyPull } from "@/lib/creator-pulls";

// Claude co-work POSTs here each morning at 8 AM:
//   POST /api/creator-pull
//   Authorization: Bearer <CREATOR_PULL_SECRET>
//   { date, pulledAt, videos: [...] }
//
// Set CREATOR_PULL_SECRET in your Vercel env vars and share it with your Claude co-work config.

async function getKV() {
  // Dynamically import so the app builds even without KV env vars configured
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function POST(req: NextRequest) {
  const secret = process.env.CREATOR_PULL_SECRET;
  const auth = req.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: DailyPull;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.date || !Array.isArray(body.videos)) {
    return NextResponse.json({ error: "Missing date or videos" }, { status: 400 });
  }

  try {
    const kv = await getKV();

    // Store this pull keyed by date
    await kv.set(`creator-pull:${body.date}`, JSON.stringify(body));

    // Maintain a sorted index of the last 7 dates
    const indexRaw = await kv.get<string>("creator-pull:index");
    const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];

    if (!index.includes(body.date)) {
      index.push(body.date);
      index.sort((a, b) => b.localeCompare(a)); // newest first
      // Keep only last 7
      const trimmed = index.slice(0, 7);
      await kv.set("creator-pull:index", JSON.stringify(trimmed));
    }

    return NextResponse.json({ ok: true, date: body.date });
  } catch {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
