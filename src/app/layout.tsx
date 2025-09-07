import type { Metadata } from "next";
import { Oxanium, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
        className={`${oxanium.variable} ${shareTechMono.variable} antialiased overflow-hidden`}
      >
        <div className="grid grid-cols-8 grid-rows-16 gap-4 h-screen w-screen font-sans p-2">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
