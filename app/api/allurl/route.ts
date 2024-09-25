import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await db.url.findMany({
      orderBy: { createAt: "desc" },
      take: 5,
    });
    console.log("URL getting data", urls);
    return NextResponse.json(urls);
  } catch (err) {
    return NextResponse.json(
      { Error: "internal server error" },
      { status: 500 },
    );
  }
}
