import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { metaAds } from "@/lib/data";

function getKV(): Redis {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error("KV not configured");
  }
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

export async function GET() {
  try {
    const kv = getKV();
    const raw = await kv.get<string>("meta-ads:latest");
    if (raw) return NextResponse.json(JSON.parse(raw));
    throw new Error("no data");
  } catch {
    return NextResponse.json(metaAds);
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
    const kv = getKV();
    await kv.set("meta-ads:latest", JSON.stringify(body.items));
    return NextResponse.json({ ok: true, count: body.items.length });
  } catch {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
