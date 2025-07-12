import Image from "next/image";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "./ui/Footer";

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
