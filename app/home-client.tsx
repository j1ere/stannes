"use client";

import { useState, useEffect } from "react";
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
  Star,
  Music,
  Download,
} from "lucide-react";
import Link from "next/link";
import TypeWriter from "@/app/components/type-writer";
import ScrollToTop from "@/app/components/scroll-to-top";
import ConfettiBurst from "@/app/components/confetti-burst";
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger";

export default function HomeClient() {
  const [firstDone, setFirstDone] = useState(false);
  const [heroConfettiTriggered, setHeroConfettiTriggered] = useState(false);

  const {
    elementRef: semesterThemeRef,
    isTriggered: semesterConfettiTriggered,
  } = useScrollTrigger(0.3, false);

  const downloadThemeBanner = () => {
    const link = document.createElement("a");
    link.href = "/images/Frame 3 (1)_page-0001.jpg";
    link.download = "St-Annes-Semester-Theme-Banner.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const heroTimer = setTimeout(() => {
      setHeroConfettiTriggered(true);

      setTimeout(() => {
        setHeroConfettiTriggered(false);
      }, 100);
    }, 2000);

    return () => clearTimeout(heroTimer);
  }, []);

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
      title: "Join Our Community",
      description: "Prayer houses and fellowship groups",
      icon: Users,
      href: "/groups",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconBg: "from-amber-500 to-orange-500",
    },
  ];

  const quickStats = [
    {
      value: "500+",
      label: "Active Members",
      icon: Users,
      gradient: "from-emerald-400 to-green-500",
    },
    {
      value: "6",
      label: "Prayer Houses",
      icon: BookOpen,
      gradient: "from-orange-400 to-amber-500",
    },
    {
      value: "20+",
      label: "Weekly Events",
      icon: Calendar,
      gradient: "from-green-400 to-emerald-500",
    },
    {
      value: "15+",
      label: "Years of Service",
      icon: Heart,
      gradient: "from-amber-400 to-orange-500",
    },
  ];

  const upcomingEvents = [
    {
      title: "Sunday Mass",
      date: "Every Sunday",
      time: "8:00 AM & 6:00 PM",
      location: "Main Chapel",
      icon: Cross,
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "Prayer House Meetings",
      date: "Weekly",
      time: "Various Times",
      location: "Different Venues",
      icon: BookOpen,
      gradient: "from-orange-500 to-amber-600",
    },
    {
      title: "Youth Fellowship",
      date: "Every Friday",
      time: "5:00 PM",
      location: "Chaplaincy Hall",
      icon: Music,
      gradient: "from-green-600 to-emerald-700",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "St. Anne's Chaplaincy\nMaseno University Campus\nKisumu, Kenya",
      gradient: "from-emerald-500 to-green-500",
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
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <ConfettiBurst trigger={heroConfettiTriggered} />
      <ConfettiBurst trigger={semesterConfettiTriggered} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/church.jpeg"
            alt="St. Anne's Chaplaincy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-orange-900/60"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {i % 4 === 0 ? (
                <Cross className="w-5 h-5 text-white/70 transform rotate-12" />
              ) : i % 4 === 1 ? (
                <Star className="w-6 h-6 text-amber-300/70" />
              ) : i % 4 === 2 ? (
                <Sparkles className="w-4 h-4 text-green-300/60" />
              ) : (
                <div className="w-4 h-4 bg-white/50 rounded-full animate-pulse" />
              )}
            </div>
          ))}

          {[...Array(8)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1}s`,
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300/80" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-gray-500 rounded-full mb-8 shadow-2xl animate-pulse p-2 ring-4 ring-white/20 hover:ring-white/40 transition-all duration-500">
              <img
                src="/images/chaplaincylogo-removebg-preview.png"
                alt="St. Anne's Catholic Chaplaincy Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              <TypeWriter
                text="Welcome to"
                speed={50}
                delay={3000}
                onComplete={() => setFirstDone(true)}
                className="block mb-1 sm:mb-2"
              />
              {firstDone && (
                <TypeWriter
                  text="St. Anne's Chaplaincy"
                  speed={50}
                  delay={200}
                  className="block bg-gradient-to-r from-green-300 via-emerald-200 to-orange-300 bg-clip-text text-transparent"
                />
              )}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-green-100 font-medium">
              Maseno University Catholic Community
            </p>

            <p className="text-base sm:text-lg mb-8 sm:mb-12 text-green-200/90 max-w-3xl mx-auto leading-relaxed">
              Where Faith Meets Fellowship - Join our vibrant Catholic community
              of students and community members united in faith, service, and
              spiritual growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                href="/about"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ring-2 ring-white/20 hover:ring-white/40"
              >
                <span className="flex items-center justify-center">
                  Discover Our Community
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/events"
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/40 text-white rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
              >
                View Events
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C300,100 600,20 900,80 C1050,120 1150,60 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Quick Links */}
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
            {quickLinks.map((link, index) => (
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
                    <link.icon className="w-8 h-8 text-white" />
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
            ))}
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
                <stop offset="50%" stopColor="#E5FAED" />
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
      <section
        ref={semesterThemeRef}
        className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 overflow-hidden"
        style={{ minHeight: "600px" }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mb-4 sm:mb-6 shadow-lg animate-pulse">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-800 via-emerald-700 to-orange-700 bg-clip-text text-transparent">
              Semester Theme
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Academic Year 2024/2025 - Semester 2
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-green-100 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-relaxed px-2">
                &quot;GUIDE US, OH HOLY SPIRIT, TO TRUST IN GOD&apos;S LOVE AND
                PROMISES, EMBRACING OUR ROLE AS PILGRIMS OF HOPE THROUGH SIMPLE
                ACTS OF LOVE&quot;
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
          <svg
            className="w-full h-20 fill-green-600"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="group text-center transform hover:scale-110 transition-all duration-500 touch-manipulation"
              >
                <div className="relative backdrop-blur-sm bg-white/10 rounded-2xl p-4 sm:p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div
                    className={`w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-12`}
                  >
                    <stat.icon className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-orange-200 transition-colors duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-green-100 font-medium text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
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
              d="M0,120 C200,40 400,80 600,60 C800,40 1000,80 1200,60 L1200,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-orange-600 overflow-hidden">
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
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${event.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <event.icon className="w-8 h-8 text-white" />
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
            ))}
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
                <stop offset="50%" stopColor="#FF8705" />
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
  );
}
