import { NextResponse } from "next/server";
import { PLACEHOLDER_PULLS } from "@/lib/creator-pulls";

async function getKV() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function GET() {
  try {
    const kv = await getKV();
    const indexRaw = await kv.get<string>("creator-pull:index");
    const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];

    if (index.length === 0) throw new Error("no data");

    const pulls = await Promise.all(
      index.map(async (date) => {
        const raw = await kv.get<string>(`creator-pull:${date}`);
        return raw ? JSON.parse(raw) : null;
      })
    );

    return NextResponse.json(pulls.filter(Boolean));
  } catch {
    // Fall back to placeholder data when KV isn't configured yet
    return NextResponse.json(PLACEHOLDER_PULLS);
  }
}
