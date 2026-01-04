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
    default: "St. Anne's: Best Catholic Chaplaincy in Kenya | Archdiocese of Kisumu & Maseno CSA", // Keyword-frontloaded default for SERPs
    template: "%s | St. Anne's Chaplaincy", // Unchanged—works well for overrides
  },
  description: "St. Anne's Catholic Chaplaincy, the best chaplaincy in Kenya at Maseno University under the Archdiocese of Kisumu. Join our vibrant CSA Maseno University Catholic Students Association (CSA) community for faith, fellowship, prayer houses, Mass, and service among students and members.", // Expanded to ~155 chars; all keywords + CTA
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
    "Archdiocese of Kisumu", // Added for core keyword
    "best chaplaincy", // Added
    "best chaplaincy in Kenya", // Added
    "CSA Maseno University Catholic Students Association", // Added for exact match
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
    title: "Best Catholic Chaplaincy in Kenya: St. Anne's – Archdiocese of Kisumu & Maseno University CSA", // Keyword-rich for site-wide shares
    description: "Discover Kenya's top Catholic community at Maseno University through CSA Maseno University Catholic Students Association. Faith, fellowship, and service for all.",
    images: [
      {
        url: "/images/chaplaincylogo-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "St. Anne's Catholic Chaplaincy Logo – Best Chaplaincy in Kenya, Archdiocese of Kisumu", // Enhanced alt with keywords
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Anne's: Best Chaplaincy in Kenya – Archdiocese of Kisumu & Maseno CSA", // Aligned, concise keywords
    description: "Vibrant Catholic community fostering faith, fellowship, and service at Maseno University CSA.",
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
  // New: Site-wide canonical (overrides per-page if needed)
  alternates: {
    canonical: 'https://stanneschaplaincy.com',
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

// Enhanced JSON-LD Schema for SEO (ReligiousOrganization)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  "name": "St. Anne's Catholic Chaplaincy Maseno",
  "alternateName": "St. Anne's Chaplaincy Maseno University",
  "url": "https://stanneschaplaincy.com",
  "logo": "https://stanneschaplaincy.com/images/chaplaincylogo-removebg-preview.png", // Updated to match metadata image path
  "image": "https://stanneschaplaincy.com/images/chaplaincylogo-removebg-preview.png", // Added for broader media coverage
  "description": "St. Anne's Catholic Chaplaincy at Maseno University is the best chaplaincy in Kenya, a vibrant Catholic community fostering faith, fellowship, and service under the Archdiocese of Kisumu through CSA Maseno University Catholic Students Association (CSA).", // Enhanced with keywords for better topical relevance
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Maseno",
    "addressRegion": "Kisumu County",
    "addressCountry": "KE",
    // Optional: Add streetAddress if available, e.g., "streetAddress": "Maseno University Campus"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Kisumu County"
  },
  "foundingOrganization": {
    "@type": "Organization",
    "name": "Catholic Church"
  },
  "memberOf": {
    "@type": "Organization",
    "name": "Archdiocese of Kisumu",
    //"url": "https://archdiocesekisumu.org" // Added URL for linkage (verify if accurate)
  },
  "religion": "Catholicism",
  "foundingDate": "2001", // Estimated based on 25+ years of service; adjust if exact date known
  "knowsAbout": [
    "Catholic faith",
    "University chaplaincy",
    "Student ministry",
    "Prayer and worship",
    "Community outreach",
    "Best chaplaincy in Kenya", // Added keyword for relevance
    "CSA Maseno University" // Added for CSA targeting
  ],
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "Maseno University",
    "url": "https://www.maseno.ac.ke"
  },
  // Optional enhancements: Add if social links available
  // "sameAs": [
  //   "https://twitter.com/stannesmaseno", // Example Twitter
  //   "https://facebook.com/stanneschaplaincy" // Example Facebook
  // ],
  // Add contact if known
  // "contactPoint": {
  //   "@type": "ContactPoint",
  //   "telephone": "+254-XXX-XXXXXX",
  //   "contactType": "Customer Service"
  // }
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
        {/* Enhanced JSON-LD Schema for SEO – Placed here for site-wide rendering */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}