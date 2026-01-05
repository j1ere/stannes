import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Users,
  Heart,
  BookOpen,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Cross,
  ChevronRight,
  Camera,
  Star,
  Music,
} from "lucide-react";
import { HeroSection } from "@/app/components/home/hero-section";
import { SemesterThemeSection } from "@/app/components/home/semester-theme-section";
import ScrollToTop from "@/app/components/scroll-to-top";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "St. Anne's Chaplaicy, Maseno University | Archdiocese of Kisumu", // Shortened, keyword-frontloaded for SERPs
  description:
    "Welcome to St. Anne's Catholic Chaplaincy, the best chaplaincy in Kenya at Maseno University under the Archdiocese of Kisumu. Join our vibrant CSA Maseno University Catholic Students Association (CSA) community of 1000+ members for faith, fellowship, prayer houses, Mass, and service. Experience spiritual growth today!", // ~158 chars; all keywords + CTA
  keywords: [
    "St Anne's Chaplaincy",
    "Maseno University",
    "Catholic Community Kenya",
    "University Catholic Chaplaincy",
    "Prayer Houses",
    "Sunday Mass Kenya",
    "Catholic Student Fellowship",
    "Archdiocese of Kisumu",
    "Catholic Students Association",
    "CSA maseno",
    "best chaplaincy",
    "best chaplaincy kenya",
    // Optional: Add "CSA Maseno University" for completeness
  ],
  openGraph: {
    title:
      "Best Chaplaincy in Kenya: St. Anne's Catholic Chaplaincy – Archdiocese of Kisumu & Maseno University CSA", // Keyword-rich for shares
    description:
      "Join Kenya's top Catholic community of 1000+ at Maseno University through CSA Maseno University Catholic Students Association. Faith, fellowship, and service await.",
    type: "website",
    url: "https://stanneschaplaincy.com", // Canonical site URL
    images: [
      {
        url: "/images/church.jpeg",
        width: 1200,
        height: 630,
        alt: "St. Anne's Catholic Chaplaincy Church at Maseno University – Archdiocese of Kisumu", // Enhanced alt for SEO/accessibility
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Best Catholic Chaplaincy in Kenya: St. Anne's – Archdiocese of Kisumu", // Aligned, concise
    description:
      "Vibrant community at Maseno University CSA fostering faith, prayer houses, and service for 1000+ members.",
    images: ["/images/church.jpeg"],
  },
  // New: Branding for E-A-T
  authors: [{ name: "St. Anne's Catholic Chaplaincy" }],
  creator: "St. Anne's Catholic Chaplaincy",
  publisher: "St. Anne's Catholic Chaplaincy",
  // New: Privacy tweaks
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // New: Indexing directives
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

  // New: Canonical for homepage
  alternates: {
    canonical: "https://stanneschaplaincy.com", // Root domain
  },
};

export const revalidate = 3600; //make this 12 hrs

export default async function Home() {
  const quickLinks = [
    {
      title: "Mass & Prayer Schedules",
      description: "Weekly Mass times and prayer house meetings",
      icon: Clock,
      href: "/prayer",
      gradient: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconBg: "from-emerald-500 to-green-500",
    },
    {
      title: "Daily Readings",
      description: "something about daily readings",
      icon: BookOpen,
      href: "/prayer",
      gradient: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      iconBg: "from-orange-500 to-amber-500",
    },
    {
      title: "Events & Activities",
      description: "Charity events, hikes, and cultural week",
      icon: Calendar,
      href: "/events",
      gradient: "from-green-600 to-emerald-700",
      bgColor: "bg-green-50",
      iconBg: "from-green-600 to-emerald-600",
    },
    {
      title: "Donate",
      description: "Support our mission and community",
      icon: Heart,
      href: "/contact",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconBg: "from-amber-500 to-orange-500",
    },
  ];

  const upcomingEvents = [
    {
      title: "Sunday Mass",
      time: "8:00 AM & 6:00 PM",
      date: "Every Sunday",
      location: "Main Chapel",
      icon: Cross,
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "CSA Council Meeting",
      time: "2:00 PM",
      date: "This Saturday",
      location: "Conference Hall",
      icon: Users,
      gradient: "from-orange-500 to-amber-600",
    },
    {
      title: "Charity Visit",
      time: "9:00 AM",
      date: "Next Sunday",
      location: "Children's Home",
      icon: Heart,
      gradient: "from-green-600 to-emerald-700",
    },
  ];

  const quickStats = [
    {
      icon: Users,
      label: "Active Members",
      value: "1000+",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      icon: Heart,
      label: "Small Christian Communities",
      value: "27",
      gradient: "from-orange-500 to-amber-600",
    },
    {
      icon: BookOpen,
      label: "Groups & Movements",
      value: "12+",
      gradient: "from-green-600 to-emerald-700",
    },
    {
      icon: Calendar,
      label: "Years Serving",
      value: "10+",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Quick Links - Floating Cards */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-green-100/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mb-4 sm:mb-6 shadow-lg">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-800 via-emerald-700 to-orange-700 bg-clip-text text-transparent">
                Quick Access Hub
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need at your fingertips - from Mass schedules to
                community events
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4"
                  >
                    <div
                      className={`relative p-8 h-full ${link.bgColor} border border-white shadow-xl hover:shadow-2xl transition-all duration-500`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>

                      <div
                        className={`relative w-16 h-16 bg-gradient-to-r ${link.iconBg} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {link.description}
                      </p>

                      <div className="flex items-center text-green-600 font-semibold group-hover:text-orange-600 transition-colors">
                        <span className="mr-2">Explore</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="greenGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E5FAEC" />
                  <stop offset="20%" stopColor="#DFF9E9" />
                  <stop offset="50%" stopColor="#E5FAED" />
                  <stop offset="70%" stopColor="#EBFDF4" />
                  <stop offset="80%" stopColor="#EDFDF5" />
                  <stop offset="100%" stopColor="#EDFDF5" />
                </linearGradient>
              </defs>
              <path
                fill="url(#greenGradient)"
                d="M0,0 C400,80 800,40 1200,0 L1200,120 L0,120 Z"
              />
            </svg>
          </div>
        </section>

        {/* Semester Theme Section */}
        <SemesterThemeSection />

        {/* Stats Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="group text-center transform hover:scale-110 transition-all duration-500 touch-manipulation"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative backdrop-blur-sm bg-white/10 rounded-2xl p-4 sm:p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div
                        className={`w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-12`}
                      >
                        <IconComponent className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-orange-200 transition-colors duration-300">
                        {stat.value}
                      </h3>
                      <p className="text-green-100 font-medium text-sm sm:text-base">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="orangeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#fff7ed" />
                  <stop offset="50%" stopColor="#fffbeb" />
                  <stop offset="100%" stopColor="#fff7ed" />
                </linearGradient>
              </defs>
              <path
                fill="url(#orangeGradient)"
                d="M0,120 C200,40 400,80 600,60 C800,40 1000,80 1200,60 C1100,90 1150,90 1200,60 L1200,120 L0,120 Z"
              />
            </svg>
          </div>
        </section>

        {/* Community Showcase */}
        <section className="relative py-20 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-bounce"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6 shadow-lg animate-pulse">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-800 to-green-800 bg-clip-text text-transparent">
                Our Community Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the heart of St. Anne&apos;s through the moments that
                define our faith community
              </p>
            </div>

            <div className="space-y-6">
              {/* Row 1 - Hero Image */}
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02]">
                <div className="aspect-[21/9] sm:aspect-[21/8] relative overflow-hidden">
                  <img
                    src="/images/church.jpeg"
                    alt="Sunday Mass Celebration"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                    ✨ Featured Story
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-3xl">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        Sunday Mass Celebration
                      </h3>
                      <p className="text-white/90 text-lg mb-6 leading-relaxed">
                        Our vibrant community gathering for Sunday worship,
                        where faith comes alive through prayer, song, and
                        fellowship. Every Sunday, over 1000 members unite in
                        celebration of the Eucharist.
                      </p>
                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <Users className="w-4 h-4 mr-2" />
                          <span>1000+ Members</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Every Sunday</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Main Chapel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 - Three Medium Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    src: "/images/If you claim you can't meet anyone, take action in new directions_ You never know where your new journey will take you and who you will meet along the way.jpeg",
                    title: "Charity Outreach",
                    description:
                      "Visiting local children's homes and spreading God's love through action",
                    icon: Heart,
                    iconBg: "from-pink-500 to-rose-500",
                    badge: "Monthly Events",
                    badgeIcon: Calendar,
                  },
                  {
                    src: "/images/img1.jpeg",
                    title: "St. Anne's feast day",
                    description:
                      "Small faith communities meeting weekly for prayer and fellowship",
                    icon: BookOpen,
                    iconBg: "from-blue-500 to-indigo-500",
                    badge: "Annual event",
                    badgeIcon: Users,
                  },
                  {
                    src: "/images/_ (25).jpeg",
                    title: "Students' Cultural week",
                    description:
                      "Celebrating our diverse Catholic heritage and traditions",
                    icon: Sparkles,
                    iconBg: "from-purple-500 to-pink-500",
                    badge: "Annual Event",
                    badgeIcon: Star,
                  },
                ].map((item, idx) => {
                  const IconComponent = item.icon;
                  const BadgeIconComponent = item.badgeIcon;
                  return (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    >
                      <div className="aspect-[4/5] relative overflow-hidden">
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        <div
                          className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${item.iconBg} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/90 text-sm mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                            <BadgeIconComponent className="w-3 h-3 mr-1" />
                            <span>{item.badge}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Row 3 - Two Large Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    src: "/images/meet.jpeg",
                    title: "CSA Hikes and     Fun day",
                    description:
                      "Young Catholics building lifelong friendships while serving the community and growing in faith through various activities.",
                    icons: [
                      { Icon: Users, bg: "from-green-500 to-emerald-500" },
                      { Icon: Heart, bg: "from-orange-500 to-amber-500" },
                    ],
                    tags: ["Fun games", "Snacks", "Hike"],
                  },
                  {
                    src: "/images/img4.jpeg",
                    title: "Spiritual Retreats",
                    description:
                      "Annual retreats for spiritual renewal and deeper connection with God through prayer and reflection.",
                    icons: [
                      { Icon: Cross, bg: "from-indigo-500 to-purple-500" },
                    ],
                    tags: ["Prayer", "Reflection", "Renewal"],
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={item.src || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

                      <div className="absolute top-4 right-4 flex space-x-2">
                        {item.icons.map((iconData, iconIdx) => {
                          const IconComponent = iconData.Icon;
                          return (
                            <div
                              key={iconIdx}
                              className={`w-10 h-10 bg-gradient-to-r ${iconData.bg} rounded-full flex items-center justify-center shadow-lg`}
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                          );
                        })}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-white/90 mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 4 - Two Smaller Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    src: "/images/Dance.jpeg",
                    title: "Arch-bishop's pastoral visits",
                    description:
                      "Archbishop’s Pastoral Visits nurture faith and unity through guidance and pastoral care.",
                    icon: Sparkles,
                    iconBg: "from-pink-500 to-purple-500",
                    badge: "Annual",
                    badgeIcon: Music,
                  },
                  {
                    src: "/images/Join the Movement_ Clean Up Your Community Today! 🌼🌍.jpeg",
                    title: "(ADOK) Catholic Teachers Prayer Day",
                    description: "(ADOK) Catholic Teachers Prayer Day unites teachers in prayer and reflection, strengthening faith and community in the Archdiocese of Kisumu.",
                    icon: Heart,
                    iconBg: "from-green-500 to-teal-500",
                    badge: "Annual Event",
                    badgeIcon: Users,
                  },
                ].map((item, idx) => {
                  const IconComponent = item.icon;
                  const BadgeIconComponent = item.badgeIcon;
                  return (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        <div
                          className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${item.iconBg} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/90 text-sm mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                            <BadgeIconComponent className="w-3 h-3 mr-1" />
                            <span>{item.badge}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: Camera,
                    value: "150+",
                    label: "Photos Captured",
                    gradient: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: Heart,
                    value: "25+",
                    label: "Charity Events",
                    gradient: "from-orange-500 to-amber-500",
                  },
                  {
                    icon: Users,
                    value: "1000+",
                    label: "Active Members",
                    gradient: "from-green-600 to-emerald-600",
                  },
                  {
                    icon: Sparkles,
                    value: "12+",
                    label: "Annual Events",
                    gradient: "from-amber-500 to-orange-500",
                  },
                ].map((stat, idx) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={idx} className="text-center group cursor-pointer">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/events"
                  className="group inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  View All Events
                  <Calendar className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </Link>
                <Link
                  href="/groups"
                  className="group inline-flex items-center border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Join Our Community
                  <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-white"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,60 C150,120 350,0 500,60 C650,120 850,0 1000,60 C1100,90 1150,90 1200,60 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Mass Times & Contact */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-green-100/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl animate-bounce"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
              {/* Mass Schedule */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                      Mass Schedule
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        day: "Sunday Mass",
                        time: "7:00 AM & 9:00 AM",
                        gradient: "from-green-500 to-emerald-500",
                      },
                      {
                        day: "Weekday Mass",
                        time: "5:00 PM",
                        gradient: "from-emerald-500 to-green-600",
                      },
                      {
                        day: "Confessions",
                        time: "4:00 PM on Fridays",
                        gradient: "from-green-600 to-emerald-700",
                      },
                    ].map((mass, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl bg-white/60 p-6 border border-green-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                            {mass.day}
                          </span>
                          <span
                            className={`font-bold bg-gradient-to-r ${mass.gradient} bg-clip-text text-transparent`}
                          >
                            {mass.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent">
                      Visit Us
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        icon: MapPin,
                        label: "Location",
                        value: "Maseno University Campus\nKisumu, Kenya",
                        gradient: "from-green-500 to-emerald-500",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "+254 XXX XXX XXX",
                        gradient: "from-orange-500 to-amber-500",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: "info@stanneschaplaincy.com",
                        gradient: "from-green-600 to-orange-500",
                      },
                    ].map((contact, index) => {
                      const IconComponent = contact.icon;
                      return (
                        <div
                          key={index}
                          className="group flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-orange-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
                        >
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${contact.gradient} rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">
                              {contact.label}
                            </p>
                            <p className="text-gray-700 whitespace-pre-line">
                              {contact.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="greenToEmerald"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
              <path
                fill="url(#greenToEmerald)"
                d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              />
            </svg>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-orange-600 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 shadow-lg animate-pulse">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Upcoming Events
              </h2>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Join us for these exciting community gatherings and spiritual
                activities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  >
                    <div className="p-8">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${event.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-200 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <div className="space-y-3 text-green-100">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/events"
                className="group inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                View All Events
                <Calendar className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="ctaGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#FF7009" />
                  <stop offset="25%" stopColor="#FF800B" />
                  <stop offset="50%" stopColor="#FF8705" />
                  <stop offset="75%" stopColor="#FF920A" />
                  <stop offset="100%" stopColor="#FE9D07" />
                </linearGradient>
              </defs>
              <path
                fill="url(#ctaGradient)"
                d="M0,60 C200,20 400,100 600,40 C800,0 1000,80 1200,40 L1200,120 L0,120 Z"
              />
            </svg>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-500 via-amber-500 to-green-500 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-bounce"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 sm:p-12 border border-white/20 shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-6 sm:mb-8 shadow-lg animate-pulse">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                Join Our Catholic Family
              </h2>
              <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Whether you&apos;re a student or community member, everyone is
                welcome in our vibrant Catholic community at St. Anne&apos;s
                Chaplaincy
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
                <Link
                  href="/contact"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-700 rounded-full font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="flex items-center justify-center">
                    Get Involved Today
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/prayer"
                  className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/40 text-white rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
                >
                  Daily Prayers
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
}
