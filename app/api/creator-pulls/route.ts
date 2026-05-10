import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { PLACEHOLDER_PULLS } from "@/lib/creator-pulls";

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
    const index = (await kv.get<string[]>("creator-pull:index")) ?? [];

    if (index.length === 0) throw new Error("no data");

    const pulls = await Promise.all(
      index.map((date) => kv.get(`creator-pull:${date}`))
    );

    return NextResponse.json(pulls.filter(Boolean));
  } catch {
    return NextResponse.json(PLACEHOLDER_PULLS);
  }
}
