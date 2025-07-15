import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  for (let i = 0; i < 3; i++) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", attempt: i + 1 });
  } catch (err) {
    console.error("Database check failed:", err);
    await new Promise((r) => setTimeout(r, 2000)); // wait 2s
  }
}

    return NextResponse.json({ status: "fail" }, { status: 500 });
}
