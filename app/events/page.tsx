// import type { Metadata } from "next"
// import Navbar from "@/app/components/navbar"
// import Footer from "@/app/components/footer"
// import EventsClient from "./events-client"
// import type { UpcomingEvent } from '@/app/events/types'    
// import { Calendar, Users, Heart, Mountain, Gift, Crown } from "lucide-react"

// export const metadata: Metadata = {
//   title: "Events & Activities | St. Anne's Chaplaincy",
//   description:
//     "Discover upcoming events, retreats, charity activities, and celebrations at St. Anne's Catholic Chaplaincy.",
//   keywords: ["Catholic events", "retreats", "charity work", "cultural week", "Mass times", "Maseno University"],
//   openGraph: {
//     title: "Events & Activities - St. Anne's Chaplaincy",
//     description: "Join us for exciting community gatherings and spiritual activities.",
//     type: "website",
//   },
// }

// async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
//   try {
//     // Fetch from backend with ISR (revalidate every 24 hours)
//     // Order by date, referencing chaplaincy and normal calendar
//     const res = await fetch('https://backend.example.com/upcoming-events?year=2026&limit=6&order=chronological', {
//       next: { revalidate: 86400 } // ISR: revalidate daily
//     })
//     if (res.ok) {
//       return await res.json()
//     }
//   } catch (error) {
//     console.error('Failed to fetch upcoming events:', error)
//   }

//   // Fallback to static data (for development/preview)
//   return [
//     {
//       title: "Sunday Mass",
//       date: "Every Sunday",
//       time: "8:00 AM & 6:00 PM",
//       location: "Main Chapel",
//       type: "Regular",
//       icon: Calendar,
//       color: "from-green-500 to-green-600",
//       description:
//         "Join us for the celebration of the Holy Eucharist every Sunday. Experience the beauty of Catholic liturgy with our vibrant community.",
//       details: {
//         duration: "1.5 hours",
//         dresscode: "Modest attire preferred",
//         languages: "English and Swahili",
//         contact: "Fr. John Doe - 0712345678",
//         preparation: "Arrive 15 minutes early for preparation and fellowship",
//         childcare: "Available during 6:00 PM mass",
//       },
//     },
//     {
//       title: "CSA Council Meeting",
//       date: "January 28, 2026",
//       time: "2:00 PM",
//       location: "Conference Hall",
//       type: "Meeting",
//       icon: Users,
//       color: "from-green-500 to-green-600",
//       description:
//         "Monthly CSA council meeting to discuss upcoming events, community projects, and address student concerns.",
//       details: {
//         duration: "2 hours",
//         agenda: "Event planning, budget review, new initiatives",
//         attendees: "CSA officials and interested members",
//         contact: "CSA President - 0798765432",
//         requirements: "Bring notepad and pen",
//         refreshments: "Light snacks will be provided",
//       },
//     },
//     {
//       title: "Charity Visit - Children's Home",
//       date: "February 2, 2026",
//       time: "9:00 AM",
//       location: "Local Children's Home",
//       type: "Charity",
//       icon: Heart,
//       color: "from-emerald-500 to-emerald-600",
//       description: "Visit local children's home to share love, donate items, and spend quality time with the children.",
//       details: {
//         duration: "4 hours",
//         activities: "Games, songs, storytelling, meal sharing",
//         donations: "Clothes, toys, food items, books",
//         contact: "Charity Coordinator - 0787654321",
//         transport: "Bus from chaplaincy at 8:30 AM",
//         requirements: "Bring items to donate and positive energy",
//       },
//     },
//     {
//       title: "CSA Hike",
//       date: "February 15, 2026",
//       time: "6:00 AM",
//       location: "Kakamega Hills",
//       type: "Recreation",
//       icon: Mountain,
//       color: "from-amber-500 to-orange-500",
//       description:
//         "Adventure hiking trip to Kakamega Hills with outdoor activities, team building, and nature exploration.",
//       details: {
//         duration: "Full day (6 AM - 8 PM)",
//         activities: "Hiking, football, races, tug of war, photography",
//         requirements: "Hiking boots, water bottle, snacks",
//         contact: "Recreation Team - 0776543210",
//         cost: "KSh 500 per person (transport and lunch included)",
//         registration: "Deadline: February 10, 2026",
//       },
//     },
//     {
//       title: "Spiritual Retreat",
//       date: "March 1-3, 2026",
//       time: "All Day",
//       location: "Retreat Center",
//       type: "Spiritual",
//       icon: Gift,
//       color: "from-green-600 to-emerald-700",
//       description:
//         "Three-day spiritual retreat for deeper prayer, reflection, and spiritual growth in partnership with Vincentian Ministries.",
//       details: {
//         duration: "3 days, 2 nights",
//         activities: "Prayer sessions, meditation, spiritual talks, confession",
//         facilitator: "Vincentian Ministries team",
//         contact: "Spiritual Director - 0765432109",
//         cost: "KSh 2,500 per person (accommodation and meals included)",
//         requirements: "Bible, notebook, comfortable clothes",
//       },
//     },
//     {
//       title: "CSA Cultural Week",
//       date: "March 15-22, 2026",
//       time: "Various Times",
//       location: "University Campus",
//       type: "Cultural",
//       icon: Crown,
//       color: "from-orange-600 to-amber-700",
//       description:
//         "Week-long cultural celebration showcasing diverse traditions, culminating with Mr. & Miss Chaplaincy crowning ceremony.",
//       details: {
//         duration: "7 days",
//         activities: "Cultural dances, traditional food, fashion show, talent show",
//         highlight: "Mr. & Miss Chaplaincy competition",
//         contact: "Cultural Committee - 0754321098",
//         participation: "Open to all CSA members",
//         prizes: "Various awards and recognition certificates",
//       },
//     },
//   ]
// }

// export default async function EventsPage() {
//   const upcomingEvents = await getUpcomingEvents()

//   return <EventsClient upcomingEvents={upcomingEvents} />
// }


import type { Metadata } from "next"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"
import EventsClient from "./events-client"
import type { UpcomingEvent } from '@/app/events/types'

export const metadata: Metadata = {
  title: "Events & Activities | St. Anne's Chaplaincy",
  description:
    "Discover upcoming events, retreats, charity activities, and celebrations at St. Anne's Catholic Chaplaincy.",
  keywords: ["Catholic events", "retreats", "charity work", "cultural week", "Mass times", "Maseno University"],
  openGraph: {
    title: "Events & Activities - St. Anne's Chaplaincy",
    description: "Join us for exciting community gatherings and spiritual activities.",
    type: "website",
  },
}

function getUpcomingEvents(): UpcomingEvent[] {
  // Use dummy data only (no backend calls)
  // icon is now a string for serialization
  return [  // <- Plain array, no JSX
    {
      title: "Sunday Mass",
      date: "Every Sunday",
      time: "8:00 AM & 6:00 PM",
      location: "Main Chapel",
      type: "Regular",
      icon: "Calendar",
      color: "from-green-500 to-green-600",
      description:
        "Join us for the celebration of the Holy Eucharist every Sunday. Experience the beauty of Catholic liturgy with our vibrant community.",
      details: {
        duration: "1.5 hours",
        dresscode: "Modest attire preferred",
        languages: "English and Swahili",
        contact: "Fr. John Doe - 0712345678",
        preparation: "Arrive 15 minutes early for preparation and fellowship",
        childcare: "Available during 6:00 PM mass",
      },
    },
    {
      title: "CSA Council Meeting",
      date: "January 28, 2026",
      time: "2:00 PM",
      location: "Conference Hall",
      type: "Meeting",
      icon: "Users",
      color: "from-green-500 to-green-600",
      description:
        "Monthly CSA council meeting to discuss upcoming events, community projects, and address student concerns.",
      details: {
        duration: "2 hours",
        agenda: "Event planning, budget review, new initiatives",
        attendees: "CSA officials and interested members",
        contact: "CSA President - 0798765432",
        requirements: "Bring notepad and pen",
        refreshments: "Light snacks will be provided",
      },
    },
    {
      title: "Charity Visit - Children's Home",
      date: "February 2, 2026",
      time: "9:00 AM",
      location: "Local Children's Home",
      type: "Charity",
      icon: "Heart",
      color: "from-emerald-500 to-emerald-600",
      description: "Visit local children's home to share love, donate items, and spend quality time with the children.",
      details: {
        duration: "4 hours",
        activities: "Games, songs, storytelling, meal sharing",
        donations: "Clothes, toys, food items, books",
        contact: "Charity Coordinator - 0787654321",
        transport: "Bus from chaplaincy at 8:30 AM",
        requirements: "Bring items to donate and positive energy",
      },
    },
    {
      title: "CSA Hike",
      date: "February 15, 2026",
      time: "6:00 AM",
      location: "Kakamega Hills",
      type: "Recreation",
      icon: "Mountain",
      color: "from-amber-500 to-orange-500",
      description:
        "Adventure hiking trip to Kakamega Hills with outdoor activities, team building, and nature exploration.",
      details: {
        duration: "Full day (6 AM - 8 PM)",
        activities: "Hiking, football, races, tug of war, photography",
        requirements: "Hiking boots, water bottle, snacks",
        contact: "Recreation Team - 0776543210",
        cost: "KSh 500 per person (transport and lunch included)",
        registration: "Deadline: February 10, 2026",
      },
    },
    {
      title: "Spiritual Retreat",
      date: "March 1-3, 2026",
      time: "All Day",
      location: "Retreat Center",
      type: "Spiritual",
      icon: "Gift",
      color: "from-green-600 to-emerald-700",
      description:
        "Three-day spiritual retreat for deeper prayer, reflection, and spiritual growth in partnership with Vincentian Ministries.",
      details: {
        duration: "3 days, 2 nights",
        activities: "Prayer sessions, meditation, spiritual talks, confession",
        facilitator: "Vincentian Ministries team",
        contact: "Spiritual Director - 0765432109",
        cost: "KSh 2,500 per person (accommodation and meals included)",
        requirements: "Bible, notebook, comfortable clothes",
      },
    },
    {
      title: "CSA Cultural Week",
      date: "March 15-22, 2026",
      time: "Various Times",
      location: "University Campus",
      type: "Cultural",
      icon: "Crown",
      color: "from-orange-600 to-amber-700",
      description:
        "Week-long cultural celebration showcasing diverse traditions, culminating with Mr. & Miss Chaplaincy crowning ceremony.",
      details: {
        duration: "7 days",
        activities: "Cultural dances, traditional food, fashion show, talent show",
        highlight: "Mr. & Miss Chaplaincy competition",
        contact: "Cultural Committee - 0754321098",
        participation: "Open to all CSA members",
        prizes: "Various awards and recognition certificates",
      },
    },
  ]
}

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents()

  return (
    <>
      <Navbar />
      <EventsClient upcomingEvents={upcomingEvents} />
      <Footer />
    </>
  )
}