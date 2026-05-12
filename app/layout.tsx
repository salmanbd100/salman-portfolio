import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.salmanrahman.com"),
  title: "Salman Rahman — Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 9+ years building production-grade React applications for European and US clients. TypeScript, Next.js, and scalable frontend architecture. Based in Dhaka, open to remote and relocation.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Frontend Architect",
    "Remote Developer",
    "Full Stack Engineer",
  ],
  authors: [{ name: "Salman Rahman", url: "https://www.salmanrahman.com" }],
  creator: "Salman Rahman",
  openGraph: {
    title: "Salman Rahman — Senior Frontend Engineer",
    description:
      "9+ years building production-grade React applications for Norwegian, Swiss & US teams. React, TypeScript, Next.js.",
    url: "https://www.salmanrahman.com",
    siteName: "Salman Rahman",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Rahman — Senior Frontend Engineer",
    description:
      "9+ years building production-grade React applications for Norwegian, Swiss & US teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.salmanrahman.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
