import type { Metadata } from "next"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"

export const metadata: Metadata = {
  title: "Prayer & Spirituality | St. Anne's Chaplaincy",
  description:
    "Daily prayers, Mass readings, and spiritual resources from St. Anne's Catholic Chaplaincy at Maseno University.",
  keywords: ["daily prayers", "Mass readings", "Catholic spirituality", "prayer schedule", "Rosary"],
  openGraph: {
    title: "Prayer & Spirituality - St. Anne's Chaplaincy",
    description: "Deepen your relationship with God through prayer, scripture, and spiritual resources.",
    type: "website",
  },
}

export default function PrayerPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        <section className="bg-gradient-to-r from-green-600 to-orange-600 py-16 text-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Prayer & Spirituality</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Deepen your relationship with God through prayer, scripture, and spiritual resources
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Coming Soon</h2>
              <p className="text-gray-600 mb-8">
                Daily Mass readings, prayer schedules, and spiritual resources will be available here.
              </p>
              <p className="text-sm text-gray-500">
                This page will include API-driven content for daily readings and prayers.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
