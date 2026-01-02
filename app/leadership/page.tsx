import type { Metadata } from "next"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"

export const metadata: Metadata = {
  title: "Leadership | St. Anne's Chaplaincy",
  description:
    "Meet the leadership team of St. Anne's Catholic Chaplaincy including the Chaplain, CSA Executive, and Non-Student Executive.",
  keywords: ["CSA leadership", "chaplaincy council", "student executive", "Catholic leadership", "Maseno University"],
  openGraph: {
    title: "Leadership Structure - St. Anne's Chaplaincy",
    description: "Dedicated leaders guiding our Catholic community at Maseno University.",
    type: "website",
  },
}

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        <section className="bg-gradient-to-r from-green-600 to-orange-600 py-16 text-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Leadership Structure</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Meet the dedicated leaders who guide our Catholic community
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Leadership Details</h2>
              <p className="text-gray-600 mb-8">
                Full leadership structure including CSA Executive, Non-Student Executive, and Chaplaincy Council.
              </p>
              <p className="text-sm text-gray-500">Detailed leadership information coming soon.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
