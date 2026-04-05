// events/page.tsx
  import type { Metadata } from "next"
  import Navbar from "@/app/components/navbar"
  import Footer from "@/app/components/footer"
  import EventsClient from "./events-client"
  import type { UpcomingEvent } from '@/app/events/types'


export const metadata: Metadata = {
  metadataBase: new URL("https://stanneschaplaincy.com"),
  title: {
    default: "St. Anne's: events and calendar | Archdiocese of Kisumu & Maseno CSA", // Keyword-frontloaded default for SERPs
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
    url: "https://stanneschaplaincy.com/events",
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
    canonical: 'https://stanneschaplaincy.com/events',
  },
};

  

  export default function EventsPage() {
    return (
      <>
        <Navbar />
        <EventsClient/>
        <Footer />
      </>
    )
  }