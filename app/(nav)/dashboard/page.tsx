// app/(nav)/dashboard/page.tsx
export const runtime = "nodejs";

import { auth } from "@/lib/auth"; // ✅ now a proper function
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  console.log("[dashboard] session:", session);

  if (!session?.user) {
    console.log("[dashboard] No user in session");
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
