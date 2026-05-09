import { NextRequest, NextResponse } from "next/server";
import type { DailyPull } from "@/lib/creator-pulls";

async function getKV() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function POST(req: NextRequest) {
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
