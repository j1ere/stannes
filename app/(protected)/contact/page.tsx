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
import ContactForm from "@/app/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | St. Anne's Chaplaincy - Archdiocese of Kisumu",
  description:
    "Get in touch with St. Anne's Catholic Chaplaincy at Maseno University. Find our location, contact information, and send us a message.",
  keywords: [
    "contact",
    "location",
    "Maseno University",
    "Catholic chaplaincy",
    "get in touch",
    "Archdiocese of Kisumu",
  ],
  openGraph: {
    title: "Contact St. Anne's Chaplaincy",
    description: "Reach out to our Catholic community at Maseno University - Archdiocese of Kisumu.",
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
      details: ["info@stanneschaplaincy.com", "csa.maseno@stanneschaplaincy.com"],
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


  return (
    <>
      
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
              <ContactForm/>
            </div>
          </div>

          
        </section>

        {/* Key Contacts */}
        

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
                   next to the university campus.
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
              
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19263.3414049305!2d34.608201099999995!3d-0.0076783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ske!4v1775258721838!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
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
