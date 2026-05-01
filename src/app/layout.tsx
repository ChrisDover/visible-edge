import type { Metadata } from "next";
import { Funnel_Display, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visible Edge — CMMC Lead Operations",
  description:
    "An automated daily lead engine for CMMC compliance — pitching ~80,000 unprepared DoD contractors before the Phase 2 enforcement window.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} ${ibmPlex.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink-bg text-white antialiased">{children}</body>
    </html>
  );
}
