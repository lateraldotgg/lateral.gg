import type { Metadata } from "next";
import { Oxanium, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import "../styles/hydration-fix.css";
import Header from "@/components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { HydrationFix } from "@/components/HydrationFix";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false, // Only preload if used immediately
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "SF Mono",
    "Consolas",
    "Liberation Mono",
    "Menlo",
    "monospace",
  ],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "lateral.gg",
  description: "lateral.gg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Font preloading is handled automatically by Next.js Google Fonts */}
      </head>
      <body
        className={`${oxanium.variable} ${shareTechMono.variable}
          overflow-hidden antialiased`}
      >
        <ConvexClientProvider>
          <HydrationFix />
          <div
            className="grid h-screen w-screen grid-cols-8 grid-rows-16 gap-2 p-2
              font-sans"
          >
            <Header />
            {children}
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
