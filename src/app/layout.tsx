"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Helper component to silence ecosystem noise
function ConsoleFilter() {
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args) => {
      const msg = args[0]?.toString() || "";
      if (
        msg.includes("THREE.Clock") || 
        msg.includes("width(-1)") || 
        msg.includes("height(-1)") ||
        msg.includes("not an animatable value")
      ) return;
      originalWarn(...args);
    };

    console.error = (...args) => {
      const msg = args[0]?.toString() || "";
      if (
        msg.includes("cx: Expected length") || 
        msg.includes("cy: Expected length")
      ) return;
      originalError(...args);
    };

    return () => { 
      console.warn = originalWarn; 
      console.error = originalError;
    };
  }, []);
  return null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConsoleFilter />
        {children}
      </body>
    </html>
  );
}
