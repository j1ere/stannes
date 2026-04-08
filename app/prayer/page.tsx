// app/prayer/page.tsx
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollToTop from "@/app/components/scroll-to-top";
import DailyVerse from "./components/DailyVerse";
import PrayerScheduleCard from "./components/PrayerScheduleCard";
import ReadFullReadingsButton from "./components/ReadFullReadingsButton";
import TodaysReadingsSection from "./components/TodaysReadingsSection";
import { Download, Moon, Heart, Cross, Sun } from "lucide-react";
import TraditionalPrayersSection from "./components/TraditionalPrayersSection";

interface PrayerItem {
  title: string;
  time: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const dailyPrayers: PrayerItem[] = [
  {
    title: "Morning Prayers",
    time: "5:00 AM",
    description: "GSQ in Siriba, Underground water tank in College Campus",
    icon: (props) => <Sun {...props} />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Evening Rosary",
    time: "8:30 PM",
    description: "GSQ in Siriba, Underground water tank in College Campus",
    icon: (props) => <Moon {...props} />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Daily Mass",
    time: "5:00 PM",
    description: "Chaplaincy",
    icon: (props) => <Heart {...props} />,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Divine Mercy Chaplet",
    time: "Wednesdays 5:45 PM",
    description: "Chaplaincy",
    icon: (props) => <Cross {...props} />,
    color: "from-orange-500 to-amber-600",
  },
];

export default function Prayer() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">

        {/* Hero Section */}
        {/* <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prayer & Spirituality
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Deepen your faith journey with daily prayers, readings, and spiritual resources
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,40 C150,100 350,20 500,80 C650,120 850,40 1000,60 C1100,80 1150,60 1200,80 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section> */}

        {/* Daily Verse */}
        <DailyVerse />

        {/* Today's Mass Readings
            TodaysReadingsSection owns its own <section> tag + padding,
            so we don't wrap it in another one. */}
        <TodaysReadingsSection />

        {/* "Read Full Readings" button sits just below the cards */}
        <div className="bg-stone-50 dark:bg-stone-950 pb-10 text-center">
          <ReadFullReadingsButton />
        </div>

        {/* Daily Prayers */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Prayer Schedule</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our community in prayer throughout the day
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dailyPrayers.map((prayer, index) => (
                <PrayerScheduleCard key={index} prayer={prayer} />
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Catholic Prayers */}
        <TraditionalPrayersSection/>
        {/* <section className="py-16 bg-white relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Traditional Catholic Prayers</h2>
              <p className="text-gray-600">
                Access traditional Catholic prayers for personal and communal worship
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Our Father",
                "Holy Rosary",
                "Chaplet of Divine Mercy",
                "Nicene Creed",
                "Act of Contrition",
                "Litany of the Saints (Swahili)",
                "Litany of the Saints",
                "Prayer to the Holy Spirit",
                "Angelus",
                "Catena",
                "Lord Make me an Instrument of your peace"
              ].map((prayerName, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{prayerName}</h3>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}