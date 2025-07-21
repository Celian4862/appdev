import Image from "next/image";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "./ui/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "DevMate",
  description: "Your ultimate study buddy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Image
          src="/home_background.png"
          alt="Home page background"
          fill
          priority={true}
          className="absolute top-0 right-0 -z-1 h-screen w-auto object-cover"
        />
        <SessionProvider 
          basePath="/api/auth"
          refetchInterval={5 * 60} // Check session every 5 minutes instead of default 1 minute
          refetchOnWindowFocus={false} // Don't refetch on window focus
        >
          {children}
        </SessionProvider>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
