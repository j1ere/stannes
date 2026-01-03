// app/events/EventsClient.tsx
"use client"

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Mountain,
  Crown,
  Gift,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { useState } from "react"
import ScrollToTop from "@/app/components/scroll-to-top"
import type { UpcomingEvent, RegularActivity, AnnualEvent, CatholicEvent } from '@/app/events/types'

interface Props {
  upcomingEvents: UpcomingEvent[]
}

const EventsClient = ({ upcomingEvents }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)

  const getIconComponent = (iconName: string) => {
    const icons = {
      Calendar,
      Users,
      Heart,
      Mountain,
      Crown,
      Gift,
    }
    return icons[iconName as keyof typeof icons] || Calendar
  }

  // SSG: Static hardcoded data for regular activities
  const regularActivities: RegularActivity[] = [
    {
      activity: "Prayer House Meetings",
      schedule: "Every Saturday",
      location: "Designated Halls & Church",
      description: "Prayer, fellowship, and youth interactions",
    },
    {
      activity: "Small Christian Communities",
      schedule: "Weekends",
      location: "Members' Houses",
      description: "Meals, discussions, prayers, and Bible study",
    },
    {
      activity: "Groups & Movements Meetings",
      schedule: "Weekly",
      location: "Various Locations",
      description: "Specific activities for each group",
    },
    {
      activity: "Catechism Classes",
      schedule: "Twice Weekly",
      location: "Chaplaincy Center",
      description: "Preparation for Catholic baptism",
    },
  ]

  // SSG: Static hardcoded data for annual events
  const annualEvents: AnnualEvent[] = [
    {
      title: "CSA Charity Event",
      description: "Visiting children homes, elderly homes, and hospitals",
      frequency: "Semester",
      impact: "Community Service",
    },
    {
      title: "CSA Hike",
      description: "Hiking hills with sporting activities like football, races, tug of war",
      frequency: "Semester",
      impact: "Recreation & Bonding",
    },
    {
      title: "CSA Cultural Week",
      description: "Cultural activities culminating in Mr. & Miss Chaplaincy crowning",
      frequency: "Annual",
      impact: "Cultural Celebration",
    },
    {
      title: "Fourth Years Weekend",
      description: "Celebration for outgoing CSA team with gala night",
      frequency: "Annual",
      impact: "Farewell Celebration",
    },
    {
      title: "Spiritual Retreats",
      description: "Partnership with Vincentian Ministries for spiritual reconnection",
      frequency: "Semester",
      impact: "Spiritual Growth",
    },
  ]

  // SSG: Static hardcoded Catholic events (fixed dates; for movable feasts, fetch from API like http://calapi.inadiutorium.cz/api/v0/en/day/d-m-y)
  const catholicEvents: Record<number, CatholicEvent[]> = {
    0: [
      // January
      {
        date: 1,
        event: "Mary, Mother of God",
        type: "solemnity",
        verse: "Luke 2:16-21",
        reading: "So they went with haste and found Mary and Joseph, and the child lying in the manger.",
      },
      {
        date: 6,
        event: "Epiphany of the Lord",
        type: "solemnity",
        verse: "Matthew 2:1-12",
        reading:
          "When Jesus was born in Bethlehem of Judea, in the days of King Herod, behold, magi from the east arrived in Jerusalem.",
      },
      {
        date: 25,
        event: "Conversion of St. Paul",
        type: "feast",
        verse: "Acts 22:3-16",
        reading: "I am a Jew, born in Tarsus in Cilicia, but brought up in this city.",
      },
    ],
    1: [
      // February
      {
        date: 2,
        event: "Presentation of the Lord",
        type: "feast",
        verse: "Luke 2:22-40",
        reading:
          "When the time came for their purification according to the law of Moses, they took him up to Jerusalem to present him to the Lord.",
      },
      {
        date: 14,
        event: "St. Valentine",
        type: "memorial",
        verse: "1 John 4:7-21",
        reading:
          "Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God.",
      },
      {
        date: 22,
        event: "Chair of St. Peter",
        type: "feast",
        verse: "Matthew 16:13-19",
        reading:
          "When Jesus went into the region of Caesarea Philippi he asked his disciples, 'Who do people say that the Son of Man is?'",
      },
    ],
    2: [
      // March
      {
        date: 19,
        event: "St. Joseph, Husband of Mary",
        type: "solemnity",
        verse: "2 Samuel 7:4-5a, 12-14a, 16",
        reading: "The LORD spoke to Nathan the prophet: 'Go and say to my servant David...",
      },
      {
        date: 25,
        event: "Annunciation of the Lord",
        type: "solemnity",
        verse: "Luke 1:26-38",
        reading: "The angel Gabriel was sent from God to a town of Galilee called Nazareth...",
      },
    ],
    3: [
      // April
      {
        date: 11,
        event: "St. Stanislaus",
        type: "feast",
        verse: "John 10:11-16",
        reading: "I am the good shepherd. A good shepherd lays down his life for the sheep.",
      },
    ],
    4: [
      // May
      {
        date: 1,
        event: "St. Joseph the Worker",
        type: "optional memorial",
        verse: "Colossians 3:23-24",
        reading: "Whatever you do, do from your heart, as for the Lord and not for others...",
      },
      {
        date: 31,
        event: "Visitation of the Blessed Virgin Mary",
        type: "feast",
        verse: "Luke 1:39-56",
        reading: "Mary set out and traveled to the hill country in haste to a town of Judah...",
      },
    ],
    5: [
      // June
      {
        date: 24,
        event: "Nativity of St. John the Baptist",
        type: "solemnity",
        verse: "Luke 1:57-66, 80",
        reading: "When the time arrived for Elizabeth to have her child she gave birth to a son.",
      },
      {
        date: 29,
        event: "Saints Peter and Paul, Apostles",
        type: "solemnity",
        verse: "Acts 12:1-11",
        reading: "The church was at peace throughout all Judea, Galilee, and Samaria...",
      },
    ],
    6: [
      // July
      {
        date: 3,
        event: "St. Thomas, Apostle",
        type: "feast",
        verse: "John 20:24-29",
        reading: "Thomas, called Didymus, one of the Twelve, was not with them when Jesus came.",
      },
      {
        date: 11,
        event: "St. Benedict, Abbot",
        type: "memorial",
        verse: "Proverbs 2:1-9",
        reading: "My son, if you receive my words and treasure my commands...",
      },
    ],
    7: [
      // August
      {
        date: 6,
        event: "Transfiguration of the Lord",
        type: "feast",
        verse: "Luke 9:28b-36",
        reading: "Jesus took Peter, John, and James and went up the mountain to pray.",
      },
      {
        date: 15,
        event: "Assumption of the Blessed Virgin Mary",
        type: "solemnity",
        verse: "Luke 1:39-47",
        reading: "My soul proclaims the greatness of the Lord; my spirit rejoices in God my Savior.",
      },
    ],
    8: [
      // September
      {
        date: 8,
        event: "Nativity of the Blessed Virgin Mary",
        type: "feast",
        verse: "Micah 5:1-4a or Romans 8:28-30",
        reading: "You, Bethlehem-Ephrathah too small to be among the clans of Judah...",
      },
      {
        date: 29,
        event: "Saints Michael, Gabriel, and Raphael, Archangels",
        type: "feast",
        verse: "John 1:47-51",
        reading: "Jesus saw Nathanael coming toward him and said of him, 'Here is a true Israelite.'",
      },
    ],
    9: [
      // October
      {
        date: 2,
        event: "Guardian Angels",
        type: "memorial",
        verse: "Exodus 23:20-23",
        reading: "See, I am sending an angel before you, to guard you on the way...",
      },
      {
        date: 28,
        event: "Saints Simon and Jude, Apostles",
        type: "feast",
        verse: "Luke 6:12-16",
        reading: "Jesus departed to the mountain to pray, and he spent the night in prayer to God.",
      },
    ],
    10: [
      // November
      {
        date: 1,
        event: "All Saints",
        type: "solemnity",
        verse: "Revelation 7:2-4, 9-14",
        reading: "I, John, saw another angel rise from the east, holding the seal of the living God...",
      },
      {
        date: 2,
        event: "Commemoration of All the Faithful Departed",
        type: "All Souls",
        verse: "John 6:37-40",
        reading: "Everything that the Father gives me will come to me, and I will not reject anyone who comes to me...",
      },
    ],
    11: [
      // December
      {
        date: 8,
        event: "Immaculate Conception",
        type: "solemnity",
        verse: "Luke 1:26-38",
        reading: "In the sixth month, the angel Gabriel was sent from God to a town of Galilee called Nazareth...",
      },
      {
        date: 25,
        event: "Christmas",
        type: "solemnity",
        verse: "John 1:1-18 or John 1:1-5, 9-14",
        reading: "In the beginning was the Word, and the Word was with God, and the Word was God...",
      },
      {
        date: 26,
        event: "St. Stephen, First Martyr",
        type: "feast",
        verse: "Acts 6:8-10; 7:1-2, 51-60",
        reading: "Stephen, filled with grace and power, was working great wonders and signs among the people.",
      },
      {
        date: 28,
        event: "Holy Innocents",
        type: "feast",
        verse: "Matthew 2:13-18",
        reading: "An angel of the Lord appeared in a dream to Joseph and said, 'Rise, take the child and his mother...",
      },
    ],
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const downloadCSACalendar = () => {
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(CSA Calendar 2026) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000185 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
279
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "CSA-Calendar-2026.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    console.log("CSA Calendar downloaded successfully!")
  }

  const downloadProgramCalendar = () => {
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 52
>>
stream
BT
/F1 12 Tf
72 720 Td
(Program Calendar 2026) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000185 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
287
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Program-Calendar-2026.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    console.log("Program Calendar downloaded successfully!")
  }

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const handleLearnMore = (event: UpcomingEvent) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const closeEventModal = () => {
    setShowEventModal(false)
    setSelectedEvent(null)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days: React.ReactNode[] = []
    const monthEvents = catholicEvents[currentMonth] || []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = monthEvents.filter((event) => event.date === day)
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentMonth &&
        new Date().getFullYear() === currentYear

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 ${isToday ? "bg-blue-50 border-blue-300" : "bg-white"}`}
        >
          <div className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</div>
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className={`text-xs mt-1 p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                event.type === "solemnity"
                  ? "bg-red-100 text-red-800"
                  : event.type === "feast"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
              }`}
              title={`${event.event} - ${event.verse}`}
            >
              <div className="font-medium">{event.event}</div>
              <div className="text-xs opacity-75">{event.verse}</div>
            </div>
          ))}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - SSG */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-12 left-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-24 right-20 w-24 h-24 bg-white/5 rotate-45 blur-sm"></div>
          <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-amber-300/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-12 right-1/3 w-36 h-36 bg-orange-300/15 rotate-12 blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/8 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Activities</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Stay connected with our vibrant community through spiritual, social, and charitable activities
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C200,20 400,100 600,40 C800,0 1000,80 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* PDF Downloads Section - SSG */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-20 left-8 w-36 h-36 bg-green-200/25 rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Calendars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get our official CSA and Program calendars to stay updated with all events and activities
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">CSA Calendar 2026</h3>
                <p className="text-gray-600 mb-6">
                  Complete calendar of CSA events, meetings, and activities for the academic year
                </p>
                <button
                  onClick={downloadCSACalendar}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CSA Calendar</span>
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Program Calendar 2026</h3>
                <p className="text-gray-600 mb-6">
                  Detailed program schedule including masses, retreats, and spiritual activities
                </p>
                <button
                  onClick={downloadProgramCalendar}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Program Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catholic Calendar Section - SSG (hardcoded, or fetch with long revalidate if API used) */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-16 right-16 w-28 h-28 bg-orange-200/25 rotate-45 blur-lg"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Catholic Liturgical Calendar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow the Catholic liturgical year with important feast days, celebrations, and their biblical readings
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold">
                  {months[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="h-10 flex items-center justify-center font-medium text-gray-700 bg-gray-100 rounded"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                  <span className="text-sm text-gray-600">Solemnity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span className="text-sm text-gray-600">Feast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm text-gray-600">Memorial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events - ISR via fetch in parent */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute top-32 left-8 w-28 h-28 bg-amber-200/30 rotate-45 blur-lg"></div>
          <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-green-200/25 rounded-full blur-xl"></div>
          <div className="absolute bottom-16 left-1/3 w-24 h-24 bg-orange-200/35 rotate-12"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for these upcoming events and be part of our growing Catholic community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => {
              const IconComponent = getIconComponent(event.icon)
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${event.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center mr-4`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{event.type}</span>
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLearnMore(event)}
                      className="w-full mt-4 bg-gradient-to-r from-green-500 to-orange-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,40 900,60 C1050,80 1150,20 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Event Details Modal - Client-side */}
      {showEventModal && selectedEvent && (() => {
        const SelectedIcon = getIconComponent(selectedEvent.icon)
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <div className={`h-2 bg-gradient-to-r ${selectedEvent.color}`}></div>
                <button
                  onClick={closeEventModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${selectedEvent.color} rounded-full flex items-center justify-center mr-4`}
                    >
                      <SelectedIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {selectedEvent.type}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-600" />
                      <span className="text-gray-700">{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-gray-700">{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="text-gray-700">{selectedEvent.location}</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(selectedEvent.details).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 capitalize mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-gray-700 text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Register for Event
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Share Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Regular Activities - SSG */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-24 right-16 w-28 h-28 bg-orange-200/25 rotate-45 blur-lg"></div>
          <div className="absolute bottom-16 left-1/4 w-36 h-36 bg-blue-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-amber-300/30 rotate-12"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Regular Activities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our ongoing activities that form the backbone of our community life
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {regularActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.activity}</h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    <span>
                      <strong>Schedule:</strong> {activity.schedule}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                    <span>
                      <strong>Location:</strong> {activity.location}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,80 C150,40 350,100 500,60 C650,20 850,80 1000,40 C1100,60 1150,80 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Annual Events - SSG */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-green-200/25 to-emerald-200/20 rounded-full blur-2xl"></div>
          <div className="absolute top-32 left-0 w-36 h-36 bg-orange-200/30 rotate-45 blur-xl"></div>
          <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-amber-200/25 rounded-full blur-lg transform -translate-x-1/2"></div>
          <div className="absolute bottom-24 right-24 w-28 h-28 bg-blue-300/20 rotate-12 blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Annual Signature Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Special events that define our community spirit and mission throughout the year
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {annualEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {event.frequency}
                  </span>
                  <span className="text-gray-600">{event.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C250,100 450,20 650,80 C850,120 1050,40 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Mass Schedule - SSG */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 w-44 h-44 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-8 right-20 w-32 h-32 bg-orange-200/25 rotate-45 blur-xl"></div>
          <div className="absolute bottom-16 left-1/3 w-36 h-36 bg-blue-200/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-8 right-8 w-28 h-28 bg-amber-300/30 rotate-12 blur-lg"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mass Schedule</h2>
            <p className="text-gray-600">Join us for regular celebration of the Eucharist</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-6">
              <h3 className="text-2xl font-bold text-center">Weekly Mass Times</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Sunday</h4>
                  <p className="text-green-600 font-semibold">7:00 AM</p>
                  <p className="text-green-600 font-semibold">9:00 AM</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Weekdays</h4>
                  <p className="text-amber-600 font-semibold">5:00 PM</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Fridays</h4>
                  <p className="text-green-600 font-semibold">4:00 PM</p>
                  <p className="text-sm text-gray-600 mt-2">Confessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,20 C200,80 400,40 600,100 C800,60 1000,20 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Call to Action - SSG */}
      <section className="py-16 bg-gradient-to-br from-green-900 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Events</h2>
          <p className="text-xl mb-8 text-green-100">
            Be part of our vibrant community activities and grow in faith together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-900 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              Get Event Updates
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}

export default EventsClient 