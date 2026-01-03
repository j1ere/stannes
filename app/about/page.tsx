import type { Metadata } from "next"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"
import AboutClient from "./about-server"

export const metadata: Metadata = {
  title: "About Us | St. Anne's Chaplaincy - Archdiocese of Kisumu",
  description:
    "Learn about St. Anne's Catholic Chaplaincy at Maseno University - our mission, vision, values, and leadership structure.",
  openGraph: {
    title: "About St. Anne's Catholic Chaplaincy - Archdiocese of Kisumu",
    description: "A vibrant Catholic community fostering faith, fellowship, and service at Maseno University.",
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutClient />
      <Footer />
    </>
  )
}
