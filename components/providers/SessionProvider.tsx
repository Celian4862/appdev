"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  basePath?: string;
}

export function SessionProvider({ children, basePath }: Props) {
  return (
    <NextAuthSessionProvider 
      basePath={basePath}
      refetchInterval={30} // Refetch session every 30 seconds
      refetchOnWindowFocus={true} // Refetch when window gains focus
      refetchWhenOffline={false} // Don't refetch when offline
    >
      {children}
    </NextAuthSessionProvider>
  );
}