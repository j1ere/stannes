// app/admin/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Users, BookOpen, Image, Calendar as CalIcon, MessageSquare, Menu} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [router])

  const toggleSidebar = () => {
    // Optional: if you want manual toggle on mobile, implement here
    // But layout usually handles mobile sidebar visibility
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-12 md:pt-16">
      {/* Mobile Header with Toggle */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-700 hover:text-gray-900"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <main className="ml-0 md:ml-64 p-4 md:p-8 pt-8 md:pt-0 transition-all duration-300">
        {/* Admin Note */}
        <div className="max-w-3xl mx-auto mb-8 p-6 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-500 shadow-md">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">📌 Admin Notice</h2>
          <p>Maintained by The Chaplaincy ICT Team</p>
          <p className="text-gray-700 mb-2">
            Please ensure the <span className="font-semibold text-gray-900">chaplaincy website</span> is updated <span className="underline">regularly</span>, especially after events, new messages, or semester theme changes. All PHONE NUMBERS MUST ALSO BE UPDATED ACROSS THE WEBSITE WHEN A NEW CSA EXECUTIVE ASSUMES OFFICE.
          </p>
          <p className="text-red-600 font-bold">
            ⚠️ <span className="uppercase">Warning:</span> This platform is for authorized administrative use only. Misuse may lead to <span className="underline">serious consequences</span>. Always handle content responsibly.
          </p>
          <p>for more information and clarifications about the website source code, email admin@stanneschaplaincy.com or call : +254 743 658 999</p>
          <p>This platform was officially Launched on 12th April 2026</p>
        </div>

        {/* Dashboard Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Manage St. Anne's Chaplaincy content
          </p>
        </div>

        {/* Dashboard Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link
            href="/admin/groups"
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <Users className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-2 md:mb-3 mx-auto flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Manage Groups</h3>
          </Link>

          <Link
            href="/admin/theme"
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-orange-600 mb-2 md:mb-3 mx-auto flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Semester Theme</h3>
          </Link>

          <Link
            href="/admin/photos"
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <Image className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mb-2 md:mb-3 mx-auto flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Captured Moments</h3>
          </Link>

          <Link
            href="/admin/events"
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <CalIcon className="w-8 h-8 md:w-10 md:h-10 text-purple-600 mb-2 md:mb-3 mx-auto flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Manage Events</h3>
          </Link>

          <Link
            href="/admin/manage-prayers"
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <CalIcon className="w-8 h-8 md:w-10 md:h-10 text-purple-600 mb-2 md:mb-3 mx-auto flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Manage Prayers</h3>
          </Link>


          <Link
            href="/admin/messages"
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-pink-600 mb-2 md:mb-3 mx-auto flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Contact Messages</h3>
          </Link>
        </div>
      </main>
    </div>
  )
}