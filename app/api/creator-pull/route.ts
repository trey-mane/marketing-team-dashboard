import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import type { DailyPull } from "@/lib/creator-pulls";

function getKV(): Redis {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error("KV not configured");
  }
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
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
    const kv = getKV();

    await kv.set(`creator-pull:${body.date}`, body);

    const index = (await kv.get<string[]>("creator-pull:index")) ?? [];

    if (!index.includes(body.date)) {
      index.push(body.date);
      index.sort((a, b) => b.localeCompare(a));
      await kv.set("creator-pull:index", index.slice(0, 7));
    }

    return NextResponse.json({ ok: true, date: body.date });
  } catch (e) {
    return NextResponse.json({ error: "Storage unavailable", detail: String(e) }, { status: 503 });
  }
}
