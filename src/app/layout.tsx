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
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
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
      <head></head>
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
