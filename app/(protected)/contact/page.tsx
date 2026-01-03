import type { Metadata } from "next";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | St. Anne's Chaplaincy",
  description:
    "Get in touch with St. Anne's Catholic Chaplaincy at Maseno University. Find our location, contact information, and send us a message.",
  keywords: [
    "contact",
    "location",
    "Maseno University",
    "Catholic chaplaincy",
    "get in touch",
  ],
  openGraph: {
    title: "Contact St. Anne's Chaplaincy",
    description: "Reach out to our Catholic community at Maseno University.",
    type: "website",
  },
};

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  details: string[];
  color: string;
}

interface SocialMedia {
  name: string;
  icon: LucideIcon;
  url: string;
  color: string;
}

interface KeyContact {
  role: string;
  name: string;
  email: string;
  phone: string;
}

const Contact = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: MapPin,
      title: "Location",
      details: [
        "St. Anne's Chaplaincy",
        "Maseno University Campus",
        "Kisumu, Kenya",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 XXX XXX XXX", "+254 XXX XXX XXX"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@stanneschaplaincy.com", "csa@stanneschaplaincy.com"],
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: After Mass",
      ],
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const socialMedia: SocialMedia[] = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "hover:text-pink-600",
    },
    { name: "Twitter", icon: Twitter, url: "#", color: "hover:text-blue-400" },
  ];

  const keyContacts: KeyContact[] = [
    {
      role: "Chaplain",
      name: "Rev. Father [Name]",
      email: "chaplain@stanneschaplaincy.com",
      phone: "+254 XXX XXX XXX",
    },
    {
      role: "CSA Chairperson",
      name: "[To be elected]",
      email: "chair@stanneschaplaincy.com",
      phone: "+254 XXX XXX XXX",
    },
    {
      role: "Chaplaincy Chairperson",
      name: "[Community Leader]",
      email: "community@stanneschaplaincy.com",
      phone: "+254 XXX XXX XXX",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce"></div>

            {/* VGA Geometric Shapes */}
            <div className="absolute top-12 left-8 w-44 h-44 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rotate-45 blur-xl"></div>
            <div className="absolute bottom-16 left-1/4 w-36 h-36 bg-amber-300/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 right-1/3 w-28 h-28 bg-orange-300/15 rotate-12 blur-lg"></div>
            <div className="absolute top-1/3 right-1/2 w-24 h-24 bg-white/8 rounded-full blur-sm"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Get in touch with St. Anne's Chaplaincy - we're here to welcome
              you into our Catholic community
            </p>
          </div>

          {/* Dynamic Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-24 fill-white"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,20 C200,80 400,40 600,100 C800,60 1000,20 1200,80 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white relative overflow-hidden">
          {/* VGA Background Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 right-12 w-52 h-52 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-32 left-8 w-40 h-40 bg-amber-200/30 rotate-45 blur-2xl"></div>
            <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-green-200/25 rounded-full blur-xl"></div>
            <div className="absolute bottom-16 left-1/3 w-36 h-36 bg-orange-200/35 rotate-12 blur-lg"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach out to us through any of these channels. We're always
                happy to hear from you!
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curved Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-green-50"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,60 C250,20 450,100 650,40 C850,0 1050,80 1200,60 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50 relative overflow-hidden">
          {/* VGA Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-12 left-20 w-44 h-44 bg-green-200/30 rounded-full blur-2xl"></div>
            <div className="absolute top-24 right-16 w-40 h-40 bg-orange-200/25 rotate-45 blur-xl"></div>
            <div className="absolute bottom-16 left-1/4 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-amber-300/30 rotate-12 blur-lg"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Have questions or want to get involved? We'd love to hear from
                you!
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="general">General Inquiry</option>
                    <option value="student">Student Services</option>
                    <option value="events">Events & Activities</option>
                    <option value="groups">Groups & Movements</option>
                    <option value="spiritual">Spiritual Guidance</option>
                    <option value="donations">Donations & Support</option>
                    <option value="partnerships">Partnerships</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Subscribe to our newsletter for updates and events
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Dynamic Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-white"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,80 C200,40 400,100 600,60 C800,20 1000,80 1200,40 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Key Contacts */}
        <section className="py-16 bg-white relative overflow-hidden">
          {/* Complex VGA Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-green-200/25 to-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-32 left-0 w-44 h-44 bg-orange-200/30 rotate-45 blur-2xl"></div>
            <div className="absolute bottom-0 left-1/2 w-52 h-52 bg-amber-200/25 rounded-full blur-xl transform -translate-x-1/2"></div>
            <div className="absolute bottom-24 right-24 w-40 h-40 bg-blue-300/20 rotate-12 blur-lg"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Key Contacts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach out directly to our leadership team for specific matters
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {keyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {contact.role}
                  </h3>
                  <p className="text-gray-700 font-medium mb-4">
                    {contact.name}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flowing Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-green-50"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,40 C150,100 350,20 500,80 C650,120 850,40 1000,60 C1100,80 1150,60 1200,80 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Map and Directions */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50 relative overflow-hidden">
          {/* VGA Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-16 w-56 h-56 bg-green-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-8 right-20 w-48 h-48 bg-orange-200/25 rotate-45 blur-2xl"></div>
            <div className="absolute bottom-16 left-1/3 w-52 h-52 bg-blue-200/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-44 h-44 bg-amber-300/30 rotate-12 blur-lg"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Visit Us
              </h2>
              <p className="text-gray-600">
                Find us on the Maseno University campus in Kisumu, Kenya
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Directions
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>From Kisumu City:</strong> Take the Kisumu-Busia
                    road towards Maseno. The university is clearly signposted
                    along the main road.
                  </p>
                  <p>
                    <strong>On Campus:</strong> St. Anne's Chaplaincy is located
                    within the university campus. Look for signs directing to
                    the Catholic Chaplaincy.
                  </p>
                  <p>
                    <strong>Public Transport:</strong> Matatus and buses
                    regularly run from Kisumu to Maseno. Ask the conductor to
                    drop you at the university.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Visitors are welcome during office
                    hours and for all public masses and events. Please check our
                    events calendar for special activities.
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Map integration coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Organic Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-white"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,20 C200,80 400,40 600,100 C800,60 1000,20 1200,80 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 bg-white relative overflow-hidden">
          {/* Final VGA Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-16 w-60 h-60 bg-green-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-8 right-20 w-48 h-48 bg-orange-200/25 rotate-45 blur-2xl"></div>
            <div className="absolute bottom-16 left-1/3 w-52 h-52 bg-blue-200/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-44 h-44 bg-amber-300/30 rotate-12 blur-lg"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <p className="text-gray-600 mb-8">
              Stay connected with our community through social media
            </p>
            <div className="flex justify-center space-x-6">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-16 h-16 bg-gradient-to-br from-blue-50 to-amber-50 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>

          {/* Final Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-20 fill-green-900"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M0,40 C250,100 450,20 650,80 C850,120 1050,40 1200,60 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-green-900 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 text-green-100">
              We welcome everyone to be part of our Catholic family at St.
              Anne's Chaplaincy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-900 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
                Visit Us This Sunday
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 transform hover:scale-105">
                Schedule a Meeting
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
