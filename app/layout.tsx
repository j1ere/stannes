// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "./components/navbar";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stanneschaplaincy.com"),
  title: {
    default: "St. Anne's Chaplaincy, Maseno University | Archdiocese of Kisumu",
    template: "%s | St. Anne's Chaplaincy",
  },
  description:
    "St. Anne's Catholic Chaplaincy, the best chaplaincy in Kenya at Maseno University under the Archdiocese of Kisumu. Join our vibrant CSA community for faith, fellowship, prayer houses, Mass, and service.",
  keywords: [
    "St. Anne's Chaplaincy",
    "Maseno University",
    "Catholic Students Association",
    "CSA Maseno",
    "Catholic community Kenya",
    "Archdiocese of Kisumu",
    "best chaplaincy in Kenya",
  ],
  authors: [{ name: "St. Anne's Catholic Chaplaincy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stanneschaplaincy.com",
    siteName: "St. Anne's Chaplaincy",
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
    images: ["/images/chaplaincylogo-removebg-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://stanneschaplaincy.com",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  name: "St. Anne's Catholic Chaplaincy Maseno",
  alternateName: "St. Anne's Chaplaincy Maseno University",
  url: "https://stanneschaplaincy.com",
  logo: "https://stanneschaplaincy.com/images/chaplaincylogo-removebg-preview.png",
  description:
    "St. Anne's Catholic Chaplaincy at Maseno University – vibrant Catholic community under the Archdiocese of Kisumu through CSA Maseno University Catholic Students Association.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maseno",
    addressRegion: "Kisumu County",
    addressCountry: "KE",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Kisumu County",
  },
  religion: "Catholicism",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Maseno University",
    url: "https://www.maseno.ac.ke",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/images/chaplaincylogo-removebg-preview.png" />
        <link
          rel="apple-touch-icon"
          href="/images/chaplaincylogo-removebg-preview.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased">
          <Navbar/>
          {children}
        
        <Analytics />
      </body>
    </html>
  );
}