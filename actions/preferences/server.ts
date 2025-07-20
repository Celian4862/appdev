"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const userPreferencesSchema = z.object({
  trackId: z.number().int().positive(),
  topicIds: z.array(z.number().int().positive()),
  confidence: z.array(z.number().int().min(0).max(5)).length(10),
});

/**
 * Save user preferences after onboarding
 */
export async function saveUserPreferences(data: {
  trackId: number;
  topicIds: number[];
  confidence: number[];
}): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    // Validate input data
    const validatedData = userPreferencesSchema.parse(data);

    // Check if user already has preferences
    const existingPreferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    if (existingPreferences) {
      return { success: false, error: "User preferences already exist" };
    }

    // Verify track exists
    const track = await prisma.track.findUnique({
      where: { id: validatedData.trackId },
    });

    if (!track) {
      return { success: false, error: "Invalid track selected" };
    }

    // Verify all topics exist
    const topics = await prisma.topic.findMany({
      where: { id: { in: validatedData.topicIds } },
    });

    if (topics.length !== validatedData.topicIds.length) {
      return { success: false, error: "One or more invalid topics selected" };
    }

    // Create user preferences in a transaction
    await prisma.$transaction(async (tx) => {
      // Create user preferences
      const userPreferences = await tx.userPreferences.create({
        data: {
          userId: session.user.id,
          trackId: validatedData.trackId,
          confidence1: validatedData.confidence[0],
          confidence2: validatedData.confidence[1],
          confidence3: validatedData.confidence[2],
          confidence4: validatedData.confidence[3],
          confidence5: validatedData.confidence[4],
          confidence6: validatedData.confidence[5],
          confidence7: validatedData.confidence[6],
          confidence8: validatedData.confidence[7],
          confidence9: validatedData.confidence[8],
          confidence10: validatedData.confidence[9],
        },
      });

      // Create topic interests
      await tx.userTopicInterest.createMany({
        data: validatedData.topicIds.map((topicId) => ({
          userId: session.user.id,
          topicId,
          preferencesId: userPreferences.id,
        })),
      });
    });

    // Force a token refresh by revalidating auth-related paths
    revalidatePath("/dashboard");
    revalidatePath("/track-selection");
    revalidatePath("/");

    console.log("✅ User preferences saved successfully for user:", session.user.id);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input data" };
    }

    console.error("Error saving user preferences:", error);
    return { success: false, error: "Failed to save preferences" };
  }
}

/**
 * Check if user has completed onboarding (for polling after save)
 */
export async function checkOnboardingStatus(): Promise<{ completed: boolean }> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { completed: false };
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    const completed = !!preferences;
    console.log("🔍 Onboarding status check for user:", session.user.id, "completed:", completed);
    
    return { completed };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return { completed: false };
  }
}

/**
 * Check if user has completed onboarding
 */
export async function hasUserCompletedOnboarding(): Promise<boolean> {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return false;
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    return !!preferences;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}

/**
 * Get user preferences
 */
export async function getUserPreferences() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return null;
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
      include: {
        track: true,
        topicInterests: {
          include: {
            topic: true,
          },
        },
      },
    });

    return preferences;
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return null;
  }
}

/**
 * Get all available tracks and topics for onboarding
 */
export async function getOnboardingData() {
  try {
    console.log("🔍 getOnboardingData called");
    
    const [tracks, topics] = await Promise.all([
      prisma.track.findMany({
        orderBy: { id: "asc" },
      }),
      prisma.topic.findMany({
        orderBy: { id: "asc" },
      }),
    ]);

    console.log("📊 Database query results:");
    console.log("🎯 Tracks found:", tracks.length, tracks);
    console.log("📝 Topics found:", topics.length, topics);

    const result = { tracks, topics };
    console.log("🔄 Returning result:", result);
    
    return result;
  } catch (error) {
    console.error("❌ Error fetching onboarding data:", error);
    return { tracks: [], topics: [] };
  }
}
