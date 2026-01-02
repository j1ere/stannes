import { Cross, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Home | St. Anne's Catholic Chaplaincy - Maseno University",
  description:
    "Welcome to St. Anne's Catholic Chaplaincy at Maseno University. A vibrant Catholic community of over 500 members fostering faith, fellowship, and service through prayer houses, events, and spiritual activities.",
  keywords: [
    "St Anne's Chaplaincy",
    "Maseno University",
    "Catholic Community Kenya",
    "University Catholic Chaplaincy",
    "Prayer Houses",
    "Sunday Mass Kenya",
    "Catholic Student Fellowship",
  ],
  openGraph: {
    title: "St. Anne's Catholic Chaplaincy - Maseno University",
    description:
      "A vibrant Catholic community of 500+ members fostering faith, fellowship, and service. Join us for Mass, prayer houses, and community events.",
    type: "website",
    url: "https://stanneschaplaincy.org",
    images: [
      {
        url: "/images/church.jpeg",
        width: 1200,
        height: 630,
        alt: "St. Anne's Catholic Chaplaincy - Maseno University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Anne's Catholic Chaplaincy - Maseno University",
    description: "Join our vibrant Catholic community of 500+ members united in faith and service",
    images: ["/images/church.jpeg"],
  },
}


export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Groups & Movements", href: "/groups" },
    { name: "Events", href: "/events" },
    { name: "Prayer & Spirituality", href: "/prayer" },
    { name: "Leadership", href: "/leadership" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    "Mass Times",
    "Confession",
    "Baptism Preparation",
    "Marriage Preparation",
    "Spiritual Counseling",
    "Youth Ministry",
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">St. Anne&apos;s</h3>
                <p className="text-sm text-gray-400">Maseno University</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A vibrant Catholic community fostering faith, fellowship, and service among students and community members
              at Maseno University.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>St. Anne&apos;s Chaplaincy</p>
                  <p>Maseno University Campus</p>
                  <p>Kisumu, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+254 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@stanneschaplaincy.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold mb-4">Mass Schedule</h4>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="font-medium text-blue-400">Sunday</p>
                <p className="text-sm text-gray-400">8:00 AM & 6:00 PM</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="font-medium text-amber-400">Weekdays</p>
                <p className="text-sm text-gray-400">6:30 AM & 6:00 PM</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="font-medium text-green-400">Saturday</p>
                <p className="text-sm text-gray-400">6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© 2025 St. Anne&apos;s Chaplaincy, Maseno University. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
