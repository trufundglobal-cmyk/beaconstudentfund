import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beaconstudentfund.com"),
  title: {
    template: "%s | Beacon Student Fund",
    default: "Beacon Student Fund | Trusted US Student Loans",
  },
  description: "A modern, highly trusted US-based student loan platform offering flexible funding for tuition, room, and board with decisions in minutes.",
  keywords: ["student loans", "US student loans", "college funding", "tuition gap", "Beacon Student Fund", "unsecured student loans"],
  openGraph: {
    title: "Beacon Student Fund | Trusted US Student Loans",
    description: "A modern, highly trusted US-based student loan platform offering flexible funding for tuition, room, and board.",
    url: "https://beaconstudentfund.com",
    siteName: "Beacon Student Fund",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beacon Student Fund | Trusted US Student Loans",
    description: "A modern, highly trusted US-based student loan platform offering flexible funding for tuition, room, and board.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <Navigation />
        <main className="flex-1 flex flex-col pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
