"use client"

import { BookOpen, Heart, Cross, Star, Sun, Moon, Calendar, Download, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ScrollToTop from "@/app/components/scroll-to-top" // Adjust path as needed for Next.js structure
import Navbar from "../components/navbar"
import Footer from "../components/footer"

interface PrayerItem {
  title: string
  time: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface ResourceItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface Reading {
  title: string
  reference: string
  shortExcerpt: string
  fullText: string
  type: string
}

interface DailyVerse {
  date: string
  verse: string
  text: string
  reflection: string
}

const Prayer = () => {
  const [isPrayerFormOpen, setIsPrayerFormOpen] = useState(false) // Optional: for expanding forms if needed

  const dailyPrayers: PrayerItem[] = [
    {
      title: "Morning Prayer",
      time: "6:00 AM",
      description: "Start your day with God through morning prayers and reflection",
      icon: Sun,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Evening Prayer",
      time: "6:00 PM",
      description: "End your day in gratitude and reflection with evening prayers",
      icon: Moon,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Rosary",
      time: "Various Times",
      description: "Meditate on the mysteries of Christ's life with the Holy Rosary",
      icon: Heart,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Divine Mercy Chaplet",
      time: "3:00 PM",
      description: "Pray the Divine Mercy Chaplet at the hour of mercy",
      icon: Cross,
      color: "from-orange-500 to-amber-600",
    },
  ]

  const spiritualResources: ResourceItem[] = [
    // {
    //   title: "Daily Mass Readings",
    //   description: "Follow the liturgical calendar with daily scripture readings",
    //   icon: BookOpen,
    // },
    // {
    //   title: "Saints of the Day",
    //   description: "Learn about and pray with the saints celebrated each day",
    //   icon: Star,
    // },
    {
      title: "Liturgical Calendar",
      description: "Stay connected with the Church's seasons and celebrations",
      icon: Calendar,
    },
    {
      title: "Prayer Intentions",
      description: "Submit and pray for community prayer intentions",
      icon: Heart,
    },
  ]

  const todaysReadings: Record<string, Reading> = {
    firstReading: {
      title: "First Reading",
      reference: "1 John 3:22–4:6",
      shortExcerpt: "Beloved: We receive from him whatever we ask, because we keep his commandments...",
      fullText: `Beloved:  
We receive from him whatever we ask, because we keep his commandments and do what pleases him. And his commandment is this: we should believe in the name of his Son, Jesus Christ, and love one another just as he commanded us. Those who keep his commandments remain in him, and he in them, and the way we know that he remains in us is from the Spirit whom he gave us.  

Beloved, do not trust every spirit but test the spirits to see whether they belong to God, because many false prophets have gone out into the world. This is how you can know the Spirit of God: every spirit that acknowledges Jesus Christ come in the flesh belongs to God, and every spirit that does not acknowledge Jesus does not belong to God. This is the spirit of the antichrist who, as you heard, is to come, but in fact is already in the world. You belong to God, children, and you have conquered them, for the one who is in you is greater than the one who is in the world. They belong to the world; accordingly, their teaching belongs to the world, and the world listens to them. We belong to God, and anyone who knows God listens to us, while anyone who does not belong to God refuses to hear us. This is how we know the spirit of truth and the spirit of deceit.  

The word of the Lord.`,
      type: "first-reading",
    },
    psalm: {

      title: "Responsorial Psalm",
      reference: "Psalm 2:7bc-8, 10-12a",
      shortExcerpt: "I will give you all the nations for an inheritance.",
      fullText: `R. (8ab) I will give you all the nations for an inheritance.  
The LORD said to me, “you are my Son; this day I have begotten you. Ask of me and I will give you the nations for an inheritance and the ends of the earth for your possession.”  
R. I will give you all the nations for an inheritance.  

And now, O kings, give heed; take warning, you rulers of the earth. Serve the LORD with fear, and rejoice before him; with trembling rejoice.  
R. I will give you all the nations for an inheritance.`,
      type: "psalm",
    },
    gospel: {
      title: "Gospel",
      reference: "Matthew 4:12-17, 23-25",
      shortExcerpt: "When Jesus heard that John had been arrested, he withdrew to Galilee...",
      fullText: `When Jesus heard that John had been arrested, he withdrew to Galilee. He left Nazareth and went to live in Capernaum by the sea, in the region of Zebulun and Naphtali, that what had been said through Isaiah the prophet might be fulfilled:  

Land of Zebulun and land of Naphtali, the way to the sea, beyond the Jordan, Galilee of the Gentiles, the people who sit in darkness have seen a great light, on those dwelling in a land overshadowed by death light has arisen.  

From that time on, Jesus began to preach and say, “Repent, for the Kingdom of heaven is at hand.”  

He went around all of Galilee, teaching in their synagogues, proclaiming the Gospel of the Kingdom, and curing every disease and illness among the people. His fame spread to all of Syria, and they brought to him all who were sick with various diseases and racked with pain, those who were possessed, lunatics, and paralytics, and he cured them. And great crowds from Galilee, the Decapolis, Jerusalem, and Judea, and from beyond the Jordan followed him.  

The Gospel of the Lord.`,
      type: "gospel",
    },
  }

  // Daily Verse Section - Hardcoded for now; make API-driven
  const dailyVerse: DailyVerse = {
    date: new Date("2026-01-05").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    verse: "Matthew 11:28-30",
    text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
    reflection:
      "In today's busy world, Jesus invites us to find our rest in Him. When we feel overwhelmed by life's challenges, we can turn to Christ who offers us peace and comfort. His invitation is always open, and His love is unconditional.",
  }

  const handleReadFullReadings = () => {
    window.open("https://bible.usccb.org/daily-bible-reading", "_blank")
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce"></div>

          {/* VGA Geometric Shapes */}
          <div className="absolute top-10 left-12 w-36 h-36 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-20 right-16 w-28 h-28 bg-white/5 rotate-45 blur-lg"></div>
          <div className="absolute bottom-12 left-1/4 w-32 h-32 bg-amber-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-16 right-1/3 w-24 h-24 bg-orange-300/15 rotate-12"></div>
          <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-white/8 rounded-full transform -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Prayer & Spirituality {/*(this should all be api driven)*/}</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            st. of the day API
          </p>
        </div>

        {/* Flowing Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C150,100 350,20 500,80 C650,120 850,40 1000,60 C1100,80 1150,60 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-44 h-44 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-32 left-8 w-32 h-32 bg-amber-200/30 rotate-45 blur-xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-green-200/25 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Verse</h2>
            <p className="text-gray-600">{dailyVerse.date}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-600 mb-4">{dailyVerse.verse}</h3>
            <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">"{dailyVerse.text}"</p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">{dailyVerse.reflection}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C250,20 450,100 650,40 C850,0 1050,80 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Today's Readings */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* VGA Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-44 h-44 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-32 left-8 w-32 h-32 bg-amber-200/30 rotate-45 blur-xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-green-200/25 rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 left-1/3 w-28 h-28 bg-orange-200/35 rotate-12 blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Mass Readings</h2>
            <p className="text-gray-600">
              {new Date("2026-01-05").toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(todaysReadings).map(([key, reading]) => (
              <Link
                key={key}
                href={`/prayer/reading/${reading.type}`}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 block"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{reading.title}</h3>
                <p className="text-green-600 font-semibold mb-3">{reading.reference}</p>
                <p className="text-gray-700 italic">"{reading.shortExcerpt}"</p>
                <p className="text-green-600 text-sm mt-3 font-medium">Click to read full text →</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleReadFullReadings}
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Full Readings
            </button>
          </div>
        </div>

        {/* Curved Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C250,20 450,100 650,40 C850,0 1050,80 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Daily Prayers */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50 relative overflow-hidden">
        {/* VGA Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-20 w-36 h-36 bg-green-200/30 rounded-full blur-2xl"></div>
          <div className="absolute top-24 right-16 w-32 h-32 bg-orange-200/25 rotate-45 blur-xl"></div>
          <div className="absolute bottom-16 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-amber-300/30 rotate-12 blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Prayer Schedule</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community in prayer throughout the day with these regular prayer times
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dailyPrayers.map((prayer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${prayer.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <prayer.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{prayer.title}</h3>
                <p className="text-center text-lg font-semibold text-blue-600 mb-3">{prayer.time}</p>
                <p className="text-gray-600 text-center text-sm">{prayer.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,80 C200,40 400,100 600,60 C800,20 1000,80 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Spiritual Resources */}
      {/* <section className="py-16 bg-white relative overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-green-200/25 to-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-32 left-0 w-40 h-40 bg-orange-200/30 rotate-45 blur-2xl"></div>
          <div className="absolute bottom-0 left-1/2 w-44 h-44 bg-amber-200/25 rounded-full blur-xl transform -translate-x-1/2"></div>
          <div className="absolute bottom-24 right-24 w-32 h-32 bg-blue-300/20 rotate-12 blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Spiritual Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access various spiritual resources to enhance your prayer life and faith journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spiritualResources.map((resource, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center">
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <button className="text-green-600 font-semibold hover:text-green-800 transition-colors">
                  Access Resource →
                </button>
              </div>
            ))}
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,20 C200,80 400,40 600,100 C800,60 1000,20 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section> */}

      {/* Prayer Requests */}
      {/* <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 w-48 h-48 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-8 right-20 w-36 h-36 bg-orange-200/25 rotate-45 blur-2xl"></div>
          <div className="absolute bottom-16 left-1/3 w-40 h-40 bg-blue-200/15 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-amber-300/30 rotate-12 blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prayer Requests</h2>
            <p className="text-gray-600">Submit your prayer intentions and join our community in prayer</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="intention" className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Intention
                </label>
                <textarea
                  id="intention"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Share your prayer request..."
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Keep this prayer request anonymous
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Submit Prayer Request
              </button>
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C150,20 350,100 500,40 C650,0 850,80 1000,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section> */}

      {/* Catholic Prayers */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* VGA Decorative Pattern */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-44 h-44 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-60"></div>
          <div className="absolute top-32 left-8 w-36 h-36 bg-orange-200/30 rotate-45 blur-xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-blue-200/25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 left-1/3 w-32 h-32 bg-amber-200/35 rotate-12 blur-lg"></div>
        </div> */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Traditional Catholic Prayers</h2>
            <p className="text-gray-600">Access traditional Catholic prayers for personal and communal worship</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Our Father",
              "Holy Rosary",
              "Chaplait of Divine mercy",
              "Necene Creed",
              "Act of Contrition",
              "Liturny of the Saints (swahili)",
              "Liturny of the Saints",
              "Prayer to the Holy Spirit",
              "Angelus",
              "Catena"
            ].map((prayer, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{prayer}</h3>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Wave Divider */}
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C250,100 450,20 650,80 C850,120 1050,40 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div> */}
      </section>

      {/* Call to Action */}
      {/* <section className="py-16 bg-gradient-to-br from-green-900 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Grow in Prayer</h2>
          <p className="text-xl mb-8 text-green-100">Join our prayer community and deepen your relationship with God</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-900 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              Join Prayer Group
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 transform hover:scale-105">
              Download Prayer App
            </button>
          </div>
        </div>
      </section> */}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
    <Footer/>
    </>
  )
}

export default Prayer