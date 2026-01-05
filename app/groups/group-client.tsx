import { Users, Music, Heart, BookOpen, Sparkles, Cross, Star, Crown, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import ScrollToTop from "@/app/components/scroll-to-top";

const Groups = () => {
  const prayerHouses = [
    {
      slug: "st-augustine",
      name: "St. Augustine",
      communities: ["St. Francis", "St. Charity", "St. Rita"],
      gradient: "from-green-500 to-emerald-600",
      members: "80+",
      description: "Inspired by the life and writings of St. Augustine of Hippo, this prayer house focuses on intellectual and spiritual growth through contemplative prayer, scripture study, and community dialogue.",
    },
    {
      slug: "st-rose",
      name: "St. Rose",
      communities: ["St. Christopher", "St. George", "St. Josephine Bhakita"],
      gradient: "from-orange-500 to-amber-600",
      members: "75+",
      description: "Named after St. Rose of Lima, this house emphasizes service, humility, and devotion, gathering for intercessory prayer and acts of charity within the community.",
    },
    {
      slug: "st-faustina",
      name: "St. Faustina",
      communities: ["St. John Bosco", "St. Joseph", "St. Cecilia", "St. Maria Goreti", "St. Michael", "St. Monica"],
      gradient: "from-emerald-500 to-green-600",
      members: "120+",
      description: "Devoted to St. Faustina Kowalska and Divine Mercy, this largest prayer house leads in merciful outreach, adoration, and fostering a culture of forgiveness and compassion.",
    },
    {
      slug: "st-peter",
      name: "St. Peter",
      communities: ["St. Theresa of Avilla", "St. Stephen", "St. Scholastica", "St. Charles Lwanga"],
      gradient: "from-amber-500 to-orange-600",
      members: "90+",
      description: "Honoring St. Peter the Apostle, this house builds leadership and unity, with prayers centered on the Church's mission, evangelization, and steadfast faith.",
    },
    {
      slug: "st-agnes",
      name: "St. Agnes",
      communities: ["St. Elizabeth", "St. Getrude", "St. Kizito", "St. Andrew"],
      gradient: "from-green-600 to-emerald-700",
      members: "70+",
      description: "In the spirit of St. Agnes, a martyr of purity and courage, this house nurtures young faith through youth-focused prayer, sacramental preparation, and peer support.",
    },
    {
      slug: "st-thomas",
      name: "St. Thomas",
      communities: ["St. Ambrose", "St. Raphael", "St. Veronica"],
      gradient: "from-orange-600 to-amber-700",
      members: "65+",
      description: "Drawing from St. Thomas Aquinas, this house promotes theological depth, apologetics, and reasoned faith, with sessions on doctrine and philosophical reflection.",
    },
  ];

  const movements = [
    {
      slug: "ogopa-Mungu",
      name: "Liturgical Dancers (Ogopa Mungu)",
      description: "Expressing worship through sacred dance and movement",
      icon: Sparkles,
      gradient: "from-green-500 to-emerald-500",
      members: "25+",
      meetingDay: "Thursdays",
    },
    {
      slug: "choir",
      name: "Choir",
      description: "Leading the community in song and musical worship",
      icon: Music,
      gradient: "from-orange-500 to-amber-500",
      members: "40+",
      meetingDay: "Tuesdays",
    },
    {
      slug: "divine-mercy",
      name: "Divine Mercy",
      description: "Devotion to the Divine Mercy of Jesus Christ",
      icon: Heart,
      gradient: "from-emerald-500 to-green-600",
      members: "30+",
      meetingDay: "Fridays",
    },
    {
      slug: "legion-of-Mary",
      name: "Legion of Mary",
      description: "Marian devotion and apostolic work",
      icon: Crown,
      gradient: "from-amber-500 to-orange-600",
      members: "35+",
      meetingDay: "Sundays",
    },
    {
      slug: "praise-and-worship",
      name: "Praise and Worship",
      description: "Contemporary worship and spiritual music",
      icon: Star,
      gradient: "from-green-600 to-emerald-700",
      members: "50+",
      meetingDay: "Wednesdays",
    },
    {
      slug: "cjpd",
      name: "CJPD",
      description: "Catholic Justice, Peace and Development",
      icon: BookOpen,
      gradient: "from-orange-600 to-amber-700",
      members: "20+",
      meetingDay: "Saturdays",
    },
    {
      slug: "nmcs",
      name: "NMCS",
      description: "Nurturing Catholic values and spirituality",
      icon: Cross,
      gradient: "from-green-500 to-emerald-600",
      members: "45+",
      meetingDay: "Mondays",
    },
    {
      slug: "prolife",
      name: "Prolife Movement",
      description: "Advocating for the sanctity of human life",
      icon: Heart,
      gradient: "from-orange-500 to-amber-600",
      members: "15+",
      meetingDay: "Saturdays",
    },
  ];

  const yearGroups = [
   
    { 
      slug: "Mary-mirror-of-justice",
      year: "Mary mirror of justice",
      description: "New members beginning their faith journey",
      gradient: "from-amber-500 to-orange-600",
      members: "80+",
      activities: ["joined: 2025", "left: 2029"],
    },
    
     {
      slug: "Mary-seat-of-wisdom",
      year: "Mary seat of wisdom",
      description: "Growing in faith and community involvement",
      gradient: "from-emerald-500 to-green-600",
      members: "100+",
      activities: ["joined: 2024", "left: 2028"],
    },
    
    {
      slug: "blessed-souls",
      year: "Blessed souls",
      description: "Taking leadership roles and mentoring others",
      gradient: "from-orange-500 to-amber-500",
      members: "120+",
      activities: ["joined: 2023", "left: 2027"],
    },
    {
      slug: "springs-of-life",
      year: "Springs of life",
      description: "Senior members preparing for graduation",
      gradient: "from-green-500 to-emerald-500",
      members: "150+",
      activities: ["joined: 2022", "left: 2026"],
    },
  ];

  const alumniYearGroups = [
    {
      year: "Class of 2023",
      description: "Recent graduates maintaining strong ties and supporting current students",
      gradient: "from-green-500 to-emerald-600",
      members: "200+",
      activities: ["Mentorship Programs", "Career Networking", "Annual Reunions"],
    },
    {
      year: "Class of 2022",
      description: "Building professional networks while staying connected to faith roots",
      gradient: "from-orange-500 to-amber-600",
      members: "180+",
      activities: ["Guest Speaking", "Fundraising Initiatives", "Alumni Retreats"],
    },
    {
      year: "Class of 2021",
      description: "Established alumni leading in service and community outreach",
      gradient: "from-emerald-500 to-green-600",
      members: "160+",
      activities: ["Volunteer Coordination", "Legacy Giving", "Faith Sharing Events"],
    },
    {
      year: "Class of 2020 & Earlier",
      description: "Veteran alumni providing wisdom and ongoing support to the chaplaincy",
      gradient: "from-amber-500 to-orange-600",
      members: "300+",
      activities: ["Advisory Roles", "Scholarship Programs", "Heritage Celebrations"],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-600 py-16 relative overflow-hidden">
        {/* VGA Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-12 w-28 h-28 bg-white/10 rounded-full"></div>
          <div className="absolute top-16 right-16 w-20 h-20 bg-white/5 rotate-45 blur-sm"></div>
          <div className="absolute bottom-12 left-1/4 w-24 h-24 bg-emerald-300/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-8 right-1/3 w-32 h-32 bg-orange-300/15 rotate-12 blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/8 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Catholic Students' Association</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Discover the diverse community groups that make up our vibrant CSA family
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
        {/* VGA Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 right-8 w-36 h-36 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-60"></div>
          <div className="absolute top-32 left-12 w-24 h-24 bg-orange-200/30 rotate-45"></div>
          <div className="absolute bottom-16 right-1/4 w-40 h-40 bg-green-200/25 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-amber-200/35 rotate-12"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prayer Houses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Six prayer houses, each with multiple Christian communities, meeting regularly for prayer and fellowship
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerHouses.map((house, index) => (
              <Link key={index} href={`/groups/prayer-house/${house.slug}`} className="block hover:no-underline focus:no-underline">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer">
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
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Groups and Movements */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Complex Geometric Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-52 h-52 bg-gradient-to-r from-green-200/20 to-emerald-200/15 rounded-full blur-3xl"></div>
          <div className="absolute top-24 right-0 w-32 h-32 bg-orange-200/25 rotate-45 blur-lg"></div>
          <div className="absolute bottom-0 left-1/4 w-44 h-44 bg-amber-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 right-16 w-28 h-28 bg-emerald-300/25 rotate-12 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-green-300/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Groups & Movements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized groups focusing on different aspects of Catholic life, worship, and service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movements.map((movement, index) => (
            <Link key={index} href={`/groups/movements/${movement.slug}`} className="block hover:no-underline focus:no-underline">

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
            </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Year Groups */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* VGA Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-8 right-20 w-24 h-24 bg-orange-200/25 rotate-45 blur-sm"></div>
          <div className="absolute bottom-24 left-1/3 w-36 h-36 bg-emerald-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-amber-300/30 rotate-12"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Year Groups</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students organized by academic year, fostering peer support and spiritual mentorship
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yearGroups.map((group, index) => (
            <Link key={index} href={`/groups/year-groups/${group.slug}`} className="block hover:no-underline focus:no-underline">

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
             </Link> 
            ))}
          </div>
        </div>
      </section>
      {/* Alumni Year Groups */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* VGA Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-8 right-20 w-24 h-24 bg-amber-200/25 rotate-45 blur-sm"></div>
          <div className="absolute bottom-24 left-1/3 w-36 h-36 bg-green-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-orange-300/30 rotate-12"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Year Groups (mark as alumni) no one should be able to delete an year group without super admin password</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Graduates organized by class year, continuing the mission through mentorship, networking, and ongoing support
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumniYearGroups.map((group, index) => (
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
                  <div className="text-sm text-emerald-600 font-medium mb-3">{group.members} Members</div>
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
      {/* Special Committees */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50 relative overflow-hidden">
        {/* Layered VGA Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-green-200/25 to-emerald-200/20 rounded-full blur-2xl"></div>
          <div className="absolute top-32 left-0 w-36 h-36 bg-orange-200/30 rotate-45 blur-xl"></div>
          <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-amber-200/25 rounded-full blur-lg transform -translate-x-1/2"></div>
          <div className="absolute bottom-24 right-24 w-28 h-28 bg-green-300/20 rotate-12 blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Committees</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized committees handling specific aspects of chaplaincy operations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Development Committee</h3>
              <p className="text-gray-600 mb-3">
                Responsible for all infrastructure developments within the chaplaincy
              </p>
              <p className="text-sm text-gray-500">
                <strong>Leadership:</strong> Chair, Assistant, Treasurer, Secretary
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Welfare Committee</h3>
              <p className="text-gray-600 mb-3">In charge of all welfare matters for students within the chaplaincy</p>
              <p className="text-sm text-gray-500">
                <strong>Focus:</strong> Student support and well-being
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ICT Committee</h3>
              <p className="text-gray-600 mb-3">In charge of all technology within the chaplaincy</p>
              <p className="text-sm text-gray-500">
                <strong>Leadership:</strong> Organizing Secretary & Deputy
              </p>
            </div>
          </div>
        </div>
      </section>
     {/* Call to Action */}


<section className="py-16 bg-gradient-to-r from-green-600 to-orange-600">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold mb-4 text-white">Find Your Place</h2>
    <p className="text-xl mb-8 text-green-100">
      Join one of our many groups and movements to deepen your faith and build lasting friendships
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors">
        Join a Group
      </button>
      <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
        Contact Us
      </button>
    </div>

    {/* Socials */}
    <p>Catholic Students Association official social media accounts</p>
    <div className="flex justify-center gap-6">
      <a href="https://x.com/YourPage" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          {/* X / Twitter style icon */}
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>

      <a href="https://facebook.com/YourPage" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/>
        </svg>
      </a>

      <a
        href="https://tiktok.com/@YourPage"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-black transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M198.55 0h-39.72v140.02c0 21.98-17.84 39.82-39.82 39.82-21.97 0-39.82-17.84-39.82-39.82 0-21.97 17.85-39.82 39.82-39.82 10.7 0 20.36 4.28 27.74 11.19v-49.19h39.72c0 0 0 0 0 0z"/>
        </svg>
      </a>


      <a href="https://instagram.com/YourPage" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
      </a>
    </div>
  </div>
</section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Groups;