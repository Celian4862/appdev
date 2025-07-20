import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * GET /api/onboarding-data
 * 
 * Returns tracks and topics for the onboarding process.
 * 
 * IMPORTANT: This route expects the database to be properly seeded.
 * Before deploying to production, ensure you run:
 * 
 * 1. Database migrations: `bunx prisma migrate deploy`
 * 2. Database seeding: `bun run db:seed`
 * 
 * This route will return a 500 error if tracks or topics are missing,
 * preventing race conditions from auto-seeding in production.
 */
export async function GET() {
  try {
    console.log("🔍 API route called: /api/onboarding-data");
    
    // First check if we can connect to the database
    await prisma.$connect();
    console.log("✅ Database connection successful");
    
    const [tracks, topics] = await Promise.all([
      prisma.track.findMany({
        orderBy: { id: "asc" },
      }),
      prisma.topic.findMany({
        orderBy: { id: "asc" },
      }),
    ]);

    console.log("📊 Database query results:");
    console.log("🎯 Tracks found:", tracks.length);
    console.log("📝 Topics found:", topics.length);
    
    // Check if database has been properly seeded
    if (tracks.length === 0 || topics.length === 0) {
      console.error("❌ Database not properly seeded - missing tracks or topics");
      return NextResponse.json(
        { 
          error: "Database not seeded", 
          message: "Please run database seeding scripts before using the application",
          tracks: [], 
          topics: [] 
        }, 
        { status: 500 }
      );
    }

    console.log("✅ Database properly seeded - returning data");

    return NextResponse.json({ tracks, topics });
  } catch (error) {
    console.error("❌ Error fetching onboarding data:", error);
    return NextResponse.json(
      { error: "Failed to fetch onboarding data", tracks: [], topics: [] },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
