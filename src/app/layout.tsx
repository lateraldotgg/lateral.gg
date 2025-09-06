import type { Metadata } from "next";
import { Oxanium, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`${oxanium.variable} ${shareTechMono.variable} antialiased overflow-hidden`}
      >
        <div className="min-h-screen w-full relative font-sans">{children}</div>
      </body>
    </html>
  );
}
