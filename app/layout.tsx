import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/app/lib/auth-provider";
import { getSession } from "@/app/lib/auth";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://stanneschaplaincy.com"),
  title: {
    default: "St. Anne's Catholic Chaplaincy | Maseno University",
    template: "%s | St. Anne's Chaplaincy",
  },
  description:
    "St. Anne's Catholic Chaplaincy at Maseno University - A vibrant Catholic community fostering faith, fellowship, and service among students and community members.",
  keywords: [
    "St. Anne's Chaplaincy",
    "Maseno University",
    "Catholic Students Association",
    "CSA Maseno",
    "Catholic community",
    "faith formation",
    "prayer houses",
    "Mass times",
    "Kenya Catholic chaplaincy",
  ],
  authors: [{ name: "St. Anne's Catholic Chaplaincy" }],
  creator: "St. Anne's Catholic Chaplaincy",
  publisher: "St. Anne's Catholic Chaplaincy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stanneschaplaincy.com",
    siteName: "St. Anne's Catholic Chaplaincy",
    title: "St. Anne's Catholic Chaplaincy - Maseno University",
    description:
      "A vibrant Catholic community fostering faith, fellowship, and service at Maseno University.",
    images: [
      {
        url: "/images/chaplaincylogo-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "St. Anne's Catholic Chaplaincy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Anne's Catholic Chaplaincy - Maseno University",
    description:
      "A vibrant Catholic community fostering faith, fellowship, and service.",
    images: ["/images/chaplaincylogo-removebg-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <head>
        <link rel="icon" href="/images/chaplaincylogo-removebg-preview.png" />
        <link
          rel="apple-touch-icon"
          href="/images/chaplaincylogo-removebg-preview.png"
        />
      </head>
      <body className="antialiased">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
