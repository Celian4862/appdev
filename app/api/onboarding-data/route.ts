import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

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
    
    if (tracks.length === 0 || topics.length === 0) {
      console.warn("⚠️ Database might not be seeded properly");
      
      // Auto-seed if no data found
      if (tracks.length === 0) {
        console.log("🌱 Auto-seeding tracks...");
        const seedTracks = [
          { name: "Frontend Development", description: "Learn modern frontend technologies like React, Vue, and Angular" },
          { name: "Backend Development", description: "Master server-side technologies and databases" },
          { name: "Full Stack Development", description: "Combine frontend and backend skills" },
          { name: "Data Science", description: "Analyze data and build machine learning models" },
        ];
        
        for (const track of seedTracks) {
          await prisma.track.upsert({
            where: { name: track.name },
            update: {},
            create: track,
          });
        }
      }
      
      if (topics.length === 0) {
        console.log("🌱 Auto-seeding topics...");
        const seedTopics = [
          { name: "JavaScript", description: "Modern JavaScript and ES6+ features" },
          { name: "React", description: "Build interactive user interfaces" },
          { name: "Node.js", description: "Server-side JavaScript development" },
          { name: "Python", description: "General-purpose programming language" },
          { name: "SQL", description: "Database query language" },
          { name: "Machine Learning", description: "AI and ML algorithms" },
          { name: "DevOps", description: "Deployment and infrastructure" },
          { name: "Mobile Development", description: "iOS and Android app development" },
        ];
        
        for (const topic of seedTopics) {
          await prisma.topic.upsert({
            where: { name: topic.name },
            update: {},
            create: topic,
          });
        }
      }
      
      // Re-fetch after seeding
      const [newTracks, newTopics] = await Promise.all([
        prisma.track.findMany({
          orderBy: { id: "asc" },
        }),
        prisma.topic.findMany({
          orderBy: { id: "asc" },
        }),
      ]);
      
      console.log("📊 After seeding:");
      console.log("🎯 Tracks:", newTracks.length);
      console.log("📝 Topics:", newTopics.length);
      
      return NextResponse.json({ tracks: newTracks, topics: newTopics });
    }

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
