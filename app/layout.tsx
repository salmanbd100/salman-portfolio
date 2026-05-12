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
  title: "Salman Rahman — Senior Full-Stack Engineer",
  description:
    "Senior Frontend Engineer with 9+ years of experience building production-grade React applications for global clients. Specializing in TypeScript, Next.js, and scalable frontend architecture.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Frontend Architect",
  ],
  openGraph: {
    title: "Salman Rahman — Senior Full-Stack Engineer",
    description:
      "9+ years building production-grade React applications for global clients.",
    type: "website",
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
