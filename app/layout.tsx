import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ChatWidget } from "@/components/chat-widget";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
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

// Blog headings only — an editorial serif built for screen reading, so a post
// announces itself as something to read rather than as another portfolio panel.
// No `weight` list because this is a variable font: the whole 200–800 range
// arrives in one file, which costs less than the four static cuts above.
const newsreader = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Salman Rahman — Senior Software Engineer",
  description:
    "Senior Software Engineer with 9+ years building production-grade React applications for European and US clients. TypeScript, Next.js, and scalable frontend architecture. Based in Dhaka, open to remote and relocation.",
  keywords: [
    "Senior Software Engineer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Frontend Architect",
    "Remote Developer",
    "Full Stack Engineer",
  ],
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  openGraph: {
    title: "Salman Rahman — Senior Software Engineer",
    description:
      "9+ years building production-grade React applications for Norwegian, Swiss & US teams. React, TypeScript, Next.js.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Salman Rahman — Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Rahman — Senior Software Engineer",
    description:
      "9+ years building production-grade React applications for Norwegian, Swiss & US teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
