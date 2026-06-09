import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vansh-kumar-portfolio.vercel.app",
  ),
  title: "Vansh Kumar | AI Engineer & ML Builder",
  description:
    "Portfolio of Vansh Kumar — AI Engineer, Machine Learning enthusiast, and builder of production-grade intelligent systems. B.Tech @ DTU.",
  keywords: [
    "Vansh Kumar",
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Portfolio",
    "DTU",
    "Reinforcement Learning",
    "Computer Vision",
  ],
  authors: [{ name: "Vansh Kumar" }],
  openGraph: {
    title: "Vansh Kumar | AI Engineer & ML Builder",
    description: "Building intelligent systems that solve real problems.",
    type: "website",
    images: ["/assets/profile.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vansh Kumar | AI Engineer",
    description: "Building intelligent systems that solve real problems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
