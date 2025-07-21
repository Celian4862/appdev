#!/usr/bin/env bun
/**
 * Database Deployment Script
 * 
 * This script should be run during deployment to ensure
 * the database is properly migrated and seeded.
 * 
 * IMPORTANT: This includes schema migrations that refactor
 * confidence scores from numbered fields to a proper relational model.
 * 
 * Usage:
 *   bun run scripts/deploy-db.ts
 * 
 * Or add to your deployment pipeline:
 *   "deploy:db": "bun run scripts/deploy-db.ts"
 */

import { exec } from "child_process";

// Promisify exec manually since util import is having issues
const execAsync = (command: string): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

async function deployDatabase() {
  console.log("🚀 Starting database deployment...");
  
  try {
    // Step 1: Generate Prisma client
    console.log("📦 Generating Prisma client...");
    await execAsync("bunx prisma generate");
    console.log("✅ Prisma client generated");
    
    // Step 2: Run migrations
    console.log("🔄 Running database migrations...");
    await execAsync("bunx prisma migrate deploy");
    console.log("✅ Database migrations completed");
    
    // Step 3: Seed the database
    console.log("🌱 Seeding database...");
    await execAsync("bun run db:seed");
    console.log("✅ Database seeding completed");
    
    console.log("🎉 Database deployment successful!");
    
  } catch (error) {
    console.error("❌ Database deployment failed:", error);
    process.exit(1);
  }
}

// Auto-run when script is executed directly
deployDatabase();

export { deployDatabase };
