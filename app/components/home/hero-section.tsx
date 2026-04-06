"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, ArrowRight, Cross, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import TypeWriter from "@/app/components/type-writer";
import ConfettiBurst from "@/app/components/confetti-burst";

export function HeroSection() {
  const [firstDone, setFirstDone] = useState(false);
  const [heroConfettiTriggered, setHeroConfettiTriggered] = useState(false);
  const [showVerse, setShowVerse] = useState(false);
  const [verse, setVerse] = useState<{
    text: string;
    ref: string;
    date: string;
    url: string;
    verse_url?: string;
  } | null>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);

  const [floatingElements, setFloatingElements] = useState<any[]>([]);
  const [sparkleElements, setSparkleElements] = useState<any[]>([]);

  useEffect(() => {
    const floats = [...Array(12)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      icon: i % 4,
    }));

    const sparkles = [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${1.5 + Math.random() * 1}s`,
    }));

    setFloatingElements(floats);
    setSparkleElements(sparkles);
  }, []);

  // Confetti trigger
  useEffect(() => {
    const heroTimer = setTimeout(() => {
      setHeroConfettiTriggered(true);
      setTimeout(() => setHeroConfettiTriggered(false), 100);
    }, 2000);

    return () => clearTimeout(heroTimer);
  }, []);

  // Fetch verse directly from backend
  const fetchVerse = async () => {
    try {
      setLoadingVerse(true);
      setShowVerse(false);

      const res = await fetch(
        "https://api.stanneschaplaincy.com/api/calendar/daily-verse/",
      );
      const data = await res.json();

      setVerse(data);
    } catch (error) {
      console.error("Failed to fetch verse:", error);
      setVerse(null);
    } finally {
      setLoadingVerse(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  // Trigger animation when verse arrives
  useEffect(() => {
    if (verse) {
      requestAnimationFrame(() => setShowVerse(true));
    }
  }, [verse]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ConfettiBurst trigger={heroConfettiTriggered} duration={5000} />

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="images/IMG_20250328_162344_520.jpg"
          alt="St. Anne's Chaplaincy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-orange-900/60"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-40"
            style={{
              left: el.left,
              top: el.top,
              animationDelay: el.animationDelay,
              animationDuration: el.animationDuration,
            }}
          >
            {el.icon === 0 ? (
              <Cross className="w-5 h-5 text-white/70 transform rotate-12" />
            ) : el.icon === 1 ? (
              <Star className="w-6 h-6 text-amber-300/70" />
            ) : el.icon === 2 ? (
              <Sparkles className="w-4 h-4 text-green-300/60" />
            ) : (
              <div className="w-4 h-4 bg-white/50 rounded-full animate-pulse" />
            )}
          </div>
        ))}

        {sparkleElements.map((el, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-pulse opacity-60"
            style={{
              left: el.left,
              top: el.top,
              animationDelay: el.animationDelay,
              animationDuration: el.animationDuration,
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-300/80" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-gray-500 rounded-full mb-8 shadow-2xl animate-pulse p-2 ring-4 ring-white/20 hover:ring-white/40 transition-all duration-500">
          <img
            src="/images/chaplaincylogo-removebg-preview.png"
            alt="St. Anne's Catholic Chaplaincy Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Main Heading */}
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
          Maseno University
        </p>
        <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-green-100 font-medium">
          (This platform is still under development)
        </p>

        {/* Daily Verse */}
        <div
          className={`text-base sm:text-lg mb-8 sm:mb-12 text-green-200/90 max-w-3xl mx-auto leading-relaxed
            transform transition-all duration-[3500ms] delay-400 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${showVerse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
        >
          {loadingVerse ? (
            <p>Loading daily verse...</p>
          ) : verse ? (
            <>
              <p className="italic mb-2">{verse.text}</p>
              <p
                className={`font-semibold text-green-100 transition-all duration-[2500ms] delay-[900ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${showVerse ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
              >
                {verse.ref}
              </p>
            </>
          ) : (
            <p>Unable to load verse.</p>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link
            href="/about"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ring-2 ring-white/20 hover:ring-white/40"
          >
            <span className="flex items-center justify-center">
              Daily readings
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

      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce sm:hidden">
        <span className="text-white/80 text-xs mb-1">Scroll</span>
        <svg
          className="w-5 h-5 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
