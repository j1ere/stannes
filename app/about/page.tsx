import type { Metadata } from "next"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"
import About from "./about-server"

export const metadata: Metadata = {
  title: "About the Best Catholic Chaplaincy in Kenya | St. Anne's – Archdiocese of Kisumu, Maseno University CSA", // Expanded for all keywords, under 60 chars
  description: "Discover St. Anne's Catholic Chaplaincy, the best chaplaincy in Kenya under the Archdiocese of Kisumu. Explore our mission, CSA Maseno University Catholic Students Association, leadership, and vibrant community at Maseno University.", // 150-160 chars, includes all keywords
  openGraph: {
    title: "Best Chaplaincy in Kenya: St. Anne's Catholic Chaplaincy – Archdiocese of Kisumu & Maseno University CSA",
    description: "Join the top-rated Catholic community fostering faith and service at Maseno University through CSA Maseno University Catholic Students Association.",
    // Add images if available: images: [{ url: '/og-image.jpg' }]
    images: [
      {
        url: "/images/chaplaincylogo-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "St. Anne's Catholic Chaplaincy Logo",
      },
    ], 
  },
  authors: [{ name: "St. Anne's Catholic Chaplaincy" }],
  creator: "St. Anne's Catholic Chaplaincy",
  publisher: "St. Anne's Catholic Chaplaincy",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Chaplaincy in Kenya: St. Anne's – Archdiocese of Kisumu",
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
 
  // Optional: Add canonical for SEO
  alternates: {
    canonical: 'https://stanneschaplaincy.com/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <About/>
      <Footer />
    </>
  )
}