import { NextRequest, NextResponse } from "next/server";
import { trendingTopics } from "@/lib/data";

async function getKV() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error("KV not configured");
  }
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function GET() {
  try {
    const kv = await getKV();
    const raw = await kv.get<string>("trending-topics:latest");
    if (raw) return NextResponse.json(JSON.parse(raw));
    throw new Error("no data");
  } catch {
    return NextResponse.json(trendingTopics);
  }
}

export async function POST(req: NextRequest) {
  let body: { items: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Missing items array" }, { status: 400 });
  }
  try {
    const kv = await getKV();
    await kv.set("trending-topics:latest", JSON.stringify(body.items));
    return NextResponse.json({ ok: true, count: body.items.length });
  } catch {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
