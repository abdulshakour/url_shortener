export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await db.url.findMany({
      orderBy: { createAt: "desc" },
      take: 5,
    });
    if (!urls) {
      return NextResponse.json({ data: "theres no data is fetch" });
    }
    console.log("URL getting data", urls);
    return NextResponse.json(urls);
  } catch (err) {
    return NextResponse.json(
      { Error: "internal server error" },
      { status: 500 },
    );
  }
}
