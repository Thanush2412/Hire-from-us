import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire From Us | FACE Prep Campus — Job-Ready Tech Talent",
  description:
    "Skip months of training. Access pre-assessed, industry-ready candidates trained inside campuses and benchmarked on real hiring standards.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
