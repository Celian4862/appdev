// app/debug-session/page.tsx
export const runtime = "edge";

import { auth } from "@/lib/auth";

export default async function DebugSessionPage() {
  const session = await auth();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Session</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(session, null, 2)}
      </pre>
      <p className="mt-4">
        Session exists: {session ? "YES" : "NO"}
      </p>
      <p>
        User exists: {session?.user ? "YES" : "NO"}
      </p>
      {session?.user && (
        <div className="mt-4">
          <p>User ID: {session.user.id}</p>
          <p>User Email: {session.user.email}</p>
          <p>User Name: {session.user.name}</p>
        </div>
      )}
    </div>
  );
}
