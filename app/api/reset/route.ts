export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

const resetDatabase = async () => {
  await db.url.deleteMany();
};

export async function GET() {
  try {
    await resetDatabase();
    return NextResponse.json({ message: "Database reset successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reset database" },
      { status: 500 },
    );
  }
}
