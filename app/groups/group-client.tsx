"use client"

import { Users, Music, Heart, BookOpen, Sparkles, Cross, Star, Crown, Calendar, Clock } from "lucide-react"
import ScrollToTop from "@/app/components/scroll-to-top"

export default function GroupsClient() {
  const prayerHouses = [
    {
      name: "St. Augustine",
      communities: ["St. Francis", "St. Charity", "St. Rita"],
      gradient: "from-green-500 to-emerald-600",
      members: "80+",
    },
    {
      name: "St. Rose",
      communities: ["St. Christopher", "St. George", "St. Josephine Bhakita"],
      gradient: "from-orange-500 to-amber-600",
      members: "75+",
    },
    {
      name: "St. Faustina",
      communities: ["St. John Bosco", "St. Joseph", "St. Cecilia", "St. Maria Goreti", "St. Michael", "St. Monica"],
      gradient: "from-emerald-500 to-green-600",
      members: "120+",
    },
    {
      name: "St. Peter",
      communities: ["St. Theresa of Avilla", "St. Stephen", "St. Scholastica", "St. Charles Lwanga"],
      gradient: "from-amber-500 to-orange-600",
      members: "90+",
    },
    {
      name: "St. Agnes",
      communities: ["St. Elizabeth", "St. Getrude", "St. Kizito", "St. Andrew"],
      gradient: "from-green-600 to-emerald-700",
      members: "70+",
    },
    {
      name: "St. Thomas",
      communities: ["St. Ambrose", "St. Raphael", "St. Veronica"],
      gradient: "from-orange-600 to-amber-700",
      members: "65+",
    },
  ]

  const movements = [
    {
      name: "Liturgical Dancers (Ogopa Mungu)",
      description: "Expressing worship through sacred dance and movement",
      icon: Sparkles,
      gradient: "from-green-500 to-emerald-500",
      members: "25+",
      meetingDay: "Thursdays",
    },
    {
      name: "Choir",
      description: "Leading the community in song and musical worship",
      icon: Music,
      gradient: "from-orange-500 to-amber-500",
      members: "40+",
      meetingDay: "Tuesdays",
    },
    {
      name: "Divine Mercy",
      description: "Devotion to the Divine Mercy of Jesus Christ",
      icon: Heart,
      gradient: "from-emerald-500 to-green-600",
      members: "30+",
      meetingDay: "Fridays",
    },
    {
      name: "Legion of Mary",
      description: "Marian devotion and apostolic work",
      icon: Crown,
      gradient: "from-amber-500 to-amber-600",
      members: "35+",
      meetingDay: "Sundays",
    },
    {
      name: "Praise and Worship",
      description: "Contemporary worship and spiritual music",
      icon: Star,
      gradient: "from-green-600 to-emerald-700",
      members: "50+",
      meetingDay: "Wednesdays",
    },
    {
      name: "CJPD",
      description: "Catholic Justice, Peace and Development",
      icon: BookOpen,
      gradient: "from-orange-600 to-amber-700",
      members: "20+",
      meetingDay: "Saturdays",
    },
    {
      name: "NMCS",
      description: "Nurturing Catholic values and spirituality",
      icon: Cross,
      gradient: "from-green-500 to-emerald-600",
      members: "45+",
      meetingDay: "Mondays",
    },
    {
      name: "Prolife Movement",
      description: "Advocating for the sanctity of human life",
      icon: Heart,
      gradient: "from-orange-500 to-amber-600",
      members: "15+",
      meetingDay: "Saturdays",
    },
  ]

  const yearGroups = [
    {
      year: "First Years",
      description: "New members beginning their faith journey",
      gradient: "from-green-500 to-emerald-500",
      members: "150+",
      activities: ["Orientation", "Faith Formation", "Mentorship"],
    },
    {
      year: "Second Years",
      description: "Growing in faith and community involvement",
      gradient: "from-orange-500 to-amber-500",
      members: "120+",
      activities: ["Leadership Training", "Service Projects", "Retreats"],
    },
    {
      year: "Third Years",
      description: "Taking leadership roles and mentoring others",
      gradient: "from-emerald-500 to-green-600",
      members: "100+",
      activities: ["Mentoring", "Event Planning", "Committee Work"],
    },
    {
      year: "Fourth Years",
      description: "Senior members preparing for graduation",
      gradient: "from-amber-500 to-orange-600",
      members: "80+",
      activities: ["Leadership", "Legacy Projects", "Transition Planning"],
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-12 w-28 h-28 bg-white/10 rounded-full"></div>
          <div className="absolute top-16 right-16 w-20 h-20 bg-white/5 rotate-45 blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Groups & Movements</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Discover the diverse community groups that make up our vibrant Catholic family
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-green-200 text-sm">Prayer Houses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8+</div>
              <div className="text-green-200 text-sm">Movements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-green-200 text-sm">Year Groups</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Houses */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prayer Houses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Six prayer houses, each with multiple Christian communities, meeting regularly for prayer and fellowship
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerHouses.map((house, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className={`h-2 bg-gradient-to-r ${house.gradient} rounded-t-xl`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{house.name}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {house.members}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-700">Communities:</p>
                    {house.communities.map((community, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                        {community}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Saturdays at designated halls</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Groups and Movements */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Groups & Movements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized groups focusing on different aspects of Catholic life, worship, and service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movements.map((movement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${movement.gradient} rounded-lg flex items-center justify-center mb-4`}
                >
                  <movement.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{movement.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{movement.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{movement.members} Members</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Meets {movement.meetingDay}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Year Groups */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Year Groups</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students organized by academic year, fostering peer support and spiritual mentorship
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yearGroups.map((group, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${group.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{group.year}</h3>
                  <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                  <div className="text-sm text-green-600 font-medium mb-3">{group.members} Members</div>
                  <div className="space-y-1">
                    {group.activities.map((activity, idx) => (
                      <span key={idx} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs mr-1">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
