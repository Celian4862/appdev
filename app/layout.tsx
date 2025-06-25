import Image from "next/image";
import type { Metadata } from "next";
import "./globals.css";

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
          width={500}
          height={500}
          className="absolute top-0 right-0 -z-1 h-screen w-auto object-cover"
        />
        {children}
      </body>
    </html>
  );
}
