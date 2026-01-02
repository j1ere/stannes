"use client"
import { BookOpen, Download, Sparkles } from "lucide-react"
import ConfettiBurst from "@/app/components/confetti-burst"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

export function SemesterThemeSection() {
  const { elementRef: semesterThemeRef, isTriggered: semesterConfettiTriggered } = useScrollTrigger(0.3, false)

  const downloadThemeBanner = () => {
    const link = document.createElement("a")
    link.href = "/images/Frame 3 (1)_page-0001.jpg"
    link.download = "St-Annes-Semester-Theme-Banner.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      ref={semesterThemeRef}
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      <ConfettiBurst trigger={semesterConfettiTriggered} duration={4000} />

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl animate-bounce"></div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-green-500/60" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mb-4 sm:mb-6 shadow-lg animate-pulse">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-800 via-emerald-700 to-orange-700 bg-clip-text text-transparent">
            🎉 Semester Theme 🎉
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Academic Year 2024/2025 - Semester 2</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-green-100 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-relaxed px-2">
              &quot;GUIDE US, OH HOLY SPIRIT, TO TRUST IN GOD&apos;S LOVE AND PROMISES, EMBRACING OUR ROLE AS PILGRIMS
              OF HOPE THROUGH SIMPLE ACTS OF LOVE&quot;
            </h3>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="relative rounded-xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-green-200/50">
              <img
                src="/images/Frame 3 (1)_page-0001.jpg"
                alt="Semester Theme Banner"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <button
                  onClick={downloadThemeBanner}
                  className="bg-white/90 backdrop-blur-sm text-green-700 p-2 sm:p-3 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-lg ring-2 ring-green-200/50 hover:ring-green-300/70"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg animate-pulse">
                ✨ New Theme!
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={downloadThemeBanner}
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-orange-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ring-2 sm:ring-4 ring-green-200/30 hover:ring-green-300/50 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Download Theme Banner</span>
              <span className="sm:hidden">Download Banner</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-2 animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 fill-green-600" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="greenGradiented" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#05A843" />
              <stop offset="20%" stopColor="#16AA5A" />
              <stop offset="50%" stopColor="#10A65D" />
              <stop offset="70%" stopColor="#06A05E" />
              <stop offset="80%" stopColor="#059D64" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path fill="url(#greenGradiented)" d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
