import React from 'react';
import { Users, Heart, Award, Cross, Sparkles, Calendar, Crown, Target, Eye, Star } from "lucide-react"; // Added Star icon for "best" section
import ScrollToTop from "@/app/components/scroll-to-top";
import type { LucideIcon } from "lucide-react";

interface LeadershipItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

interface AchievementItem {
  icon: LucideIcon;
  label: string;
  value: string;
  gradient: string;
}

// New interface for "Why Best" section
interface BestReasonItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const About = () => {
  const leadership: LeadershipItem[] = [
    {
  title: "The Chaplain",
  description: "The spiritual head of the chaplaincy, providing guidance, oversight, and pastoral care to students and the wider community.",
  icon: Cross,
  gradient: "from-green-500 to-emerald-600",
},
{
  title: "Non-Students Council",
  description: "Responsible for leading non-student jumuiyas and movements, supporting the chaplaincy’s mission and activities.",
  icon: Heart,
  gradient: "from-emerald-500 to-green-600",
},
{
  title: "Students Council",
  description: "Comprising 120 student leaders, this council directs the Catholic Students’ Association, coordinating programs and fostering community.",
  icon: Users,
  gradient: "from-orange-500 to-amber-600",
},
{
  title: "Chaplaincy Executive Council",
  description: "The top leadership body of the chaplaincy, integrating student and non-student executives to oversee all programs and governance.",
  icon: Award,
  gradient: "from-amber-500 to-orange-600",
},
  ];

  const values: ValueItem[] = [
    {
      title: "Faith",
      description: "Deepening our relationship with God through prayer, worship, and sacraments.",
      icon: Cross,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Fellowship",
      description: "Building strong bonds within our diverse Catholic community at Maseno University.",
      icon: Users,
      gradient: "from-orange-500 to-amber-500",
    },
    {
      title: "Service",
      description: "Serving others through charity work and community outreach in Kenya",
      icon: Heart,
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "Growth",
      description: "Continuous spiritual, academic, and personal development for Catholic Students.",
      icon: Sparkles,
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const achievements: AchievementItem[] = [
    { icon: Users, label: "Active Members", value: "1000+", gradient: "from-green-500 to-emerald-600" },
    { icon: Calendar, label: "Years of Service", value: "10+", gradient: "from-orange-500 to-amber-600" },
    { icon: Heart, label: "Small Christian Communities", value: "27", gradient: "from-emerald-500 to-green-600" },
    { icon: Crown, label: "Leadership Positions", value: "120+", gradient: "from-amber-500 to-orange-600" },
  ];

  // New array for "Why Best" section – substantiates "best chaplaincy" claims
  const bestReasons: BestReasonItem[] = [
    {
  title: "Empowering Community",
  description: "As a leading Catholic chaplaincy in Kenya, we have engaged over 5,000 students through CSA programs, fostering a strong, faith-centered community.",
  icon: Users,
  gradient: "from-green-500 to-emerald-600",
},
{
  title: "Faith in Action",
  description: "Serving under the Archdiocese of Kisumu for over 10 years, our vibrant groups and movements provide spaces for prayer, reflection, and spiritual growth.",
  icon: Cross,
  gradient: "from-orange-500 to-amber-600",
},
{
  title: "Spiritual & Personal Growth",
  description: "Through faith and service, we nurture students’ spiritual and personal growth at Maseno University.",
  icon: Heart,
  gradient: "from-emerald-500 to-green-600",
},
{
  title: "Shaping Future Leaders",
  description: "With many alumni in leadership roles across Kenya, St. Anne’s Chaplaincy continues to shape the next generation of quality leaders.",
  icon: Star,
  gradient: "from-amber-500 to-orange-600",
},

  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Simple Header – Updated H1 for keywords */}
      <section className="bg-gradient-to-r from-green-600 to-orange-600 py-16 relative overflow-hidden">
        {/* VGA Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rotate-45"></div>
          <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-emerald-300/20 rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-orange-300/15 rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1> {/* Keyword-rich H1 */}
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            A vibrant Catholic community at Maseno University fostering faith, fellowship, and service under the Archdiocese of Kisumu.
          </p>
        </div>
      </section>

      {/* Mission & Vision Side by Side – Added keywords */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* VGA Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-100 to-amber-100 rotate-45 blur-2xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-200/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To create a welcoming Catholic community that nurtures spiritual growth, academic excellence, and social responsibility among Maseno University students, guided by the teachings of Christ, the Catholic Church, and the Archdiocese of Kisumu.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border-l-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be a beacon of Catholic faith and values in Kenya's university community as the best chaplaincy, producing holistic graduates from Maseno University who are spiritually mature, academically excellent, and committed to serving God and humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Why We're the Best – Targets "best chaplaincy in kenya" */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-16 w-24 h-24 bg-emerald-200/25 rotate-45"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-amber-200/15 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-green-200/20 rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why St. Anne's is the Best Chaplaincy</h2> {/* Direct keyword H2 */}
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what sets our Archdiocese of Kisumu-affiliated chaplaincy apart at Maseno University.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestReasons.map((reason, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${reason.gradient} rounded-lg flex items-center justify-center mb-4`}
                >
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Grid – Minor keyword tweaks */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-green-200/20 rounded-full"></div>
          <div className="absolute top-32 right-16 w-24 h-24 bg-orange-200/25 rotate-45"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-emerald-200/15 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-amber-200/20 rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental values guide everything we do as a Catholic community in the best chaplaincy in Kenya
            </p> */}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-lg flex items-center justify-center mb-4`}
                >
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Structure – Keyword tweaks */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* VGA Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-20 h-20 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full"></div>
          <div className="absolute top-40 left-8 w-16 h-16 bg-orange-300/25 rotate-45"></div>
          <div className="absolute bottom-24 right-1/4 w-32 h-32 bg-green-200/15 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Structure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our collaborative leadership drives excellence as the top Catholic chaplaincy at Maseno University
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-gray-200 hover:border-green-300 transition-colors"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Stats – Expanded for keywords */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50 relative overflow-hidden">
        {/* Complex VGA Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-56 h-56 bg-gradient-to-br from-green-200/30 to-emerald-200/20 rounded-full blur-2xl"></div>
          <div className="absolute top-20 right-0 w-40 h-40 bg-orange-200/25 rotate-45 blur-xl"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-amber-200/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-emerald-300/30 rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Rich Heritage in the Archdiocese of Kisumu</h2> {/* Keyword H2 */}
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  St. Anne's Chaplaincy has been a cornerstone of Catholic life at Maseno University for over one decade, serving as a spiritual home for thousands of students through  Catholic Students Association (CSA).
                </p>
                <p>
                  Following all Catholic guidelines, rules, and calendar of events as prescribed by the Vatican and the Archdiocese of Kisumu, we maintain our connection to the universal Catholic Church while addressing the unique needs of our university community.
                </p>
                <p>
                  Our chaplaincy operates with a comprehensive structure that includes prayer houses, year groups, various movements, and special committees, all working together to create a vibrant Catholic ecosystem that positions us as Kenya's best chaplaincy.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action – Keyword tweak */}
      

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default About; 