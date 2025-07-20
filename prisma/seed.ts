import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create tracks
  const tracks = [
    { name: "Frontend Development", description: "Learn modern frontend technologies like React, Vue, and Angular" },
    { name: "Backend Development", description: "Master server-side technologies and databases" },
    { name: "Full Stack Development", description: "Combine frontend and backend skills" },
    { name: "Data Science", description: "Analyze data and build machine learning models" },
  ];

  // Create topics
  const topics = [
    { name: "JavaScript", description: "Modern JavaScript and ES6+ features" },
    { name: "React", description: "Build interactive user interfaces" },
    { name: "Node.js", description: "Server-side JavaScript development" },
    { name: "Python", description: "General-purpose programming language" },
    { name: "SQL", description: "Database query language" },
    { name: "Machine Learning", description: "AI and ML algorithms" },
    { name: "DevOps", description: "Deployment and infrastructure" },
    { name: "Mobile Development", description: "iOS and Android app development" },
  ];

  console.log("Seeding tracks...");
  for (const track of tracks) {
    await prisma.track.upsert({
      where: { name: track.name },
      update: {},
      create: track,
    });
  }

  console.log("Seeding topics...");
  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: topic,
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
