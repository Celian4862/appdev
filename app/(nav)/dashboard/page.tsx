// app/(nav)/dashboard/page.tsx
export const runtime = "nodejs";

import { auth } from "@/lib/auth"; // ✅ now a proper function
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import type { Session } from "next-auth";

export default async function DashboardPage() {
  let session: Session | null = null;
  let authError = null;

  try {
    // Add timeout protection for server-side auth
    const authPromise = auth();
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Auth timeout')), 10000)
    );
    
    session = await Promise.race([authPromise, timeoutPromise]);
  } catch (error) {
    authError = error instanceof Error ? error.message : 'Unknown auth error';
    console.error('Dashboard auth error:', authError);
  }

  if (!session?.user) {
    // In production, provide more context about auth failure
    if (process.env.NODE_ENV === 'production' && authError) {
      console.error('Production auth failure in dashboard:', authError);
    }
    redirect("/login");
  }

  const user = session.user;
  const hasRoadmap = true;

  return (
    <DashboardClient
      userName={user.firstName ?? user.name ?? "Friend"}
      hasRoadmap={hasRoadmap}
    />
  );
}
