// app/services/chaplaincy-services-client.tsx
"use client";

import { useState } from "react";
import {
  Calendar,
  ExternalLink,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  Shirt,
  Printer,
  ShoppingBag,
} from "lucide-react";
import ScrollToTop from "@/app/components/scroll-to-top";
import Image from "next/image";
import type { Service, BlogPost } from "@/app/services/types";

interface Props {
  initialBlogPosts: BlogPost[];
  initialServices: Service[];
}

const ChaplaincyServicesClient = ({
  initialBlogPosts,
  initialServices,
}: Props) => {
  const [selectedService, setSelectedService] = useState("tshirts");

  const getIconComponent = (iconName: string) => {
    const icons = { Shirt, Printer, ShoppingBag };
    return icons[iconName as keyof typeof icons] || ShoppingBag;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce" />
          <div className="absolute top-12 left-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-amber-300/20 rounded-full blur-lg" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Chaplaincy Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Supporting our community with quality services and staying connected
            through Catholic news
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C200,20 400,100 600,40 C800,0 1000,80 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Services Section ── */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Services
              </h2>
              <div className="flex flex-wrap gap-4 mb-8">
                {initialServices.map((service) => {
                  const IconComponent = getIconComponent(service.icon);
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        selectedService === service.id
                          ? "bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-2" />
                      {service.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Service Details */}
            {initialServices.map((service) => {
              if (selectedService !== service.id) return null;
              const IconComponent = getIconComponent(service.icon);
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        width={400}
                        height={300}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="mb-6">
                        <span className="text-2xl font-bold text-green-600">
                          {service.price}
                        </span>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Features:
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-600"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex space-x-4">
                        {/* Order via Email */}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&to=csa.maseno@stanneschaplaincy.com`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center"
                        >
                          Order Now
                        </a>

                        {/* Call */}
                        <a
                          href="tel:+254759556624"
                          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Us for Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+254 796 345 825</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">
                      csa.maseno@stanneschaplaincy.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Chaplaincy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
          </div>

          {/* ── Catholic Blog News Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Catholic News & Blog
                </h3>

                {initialBlogPosts.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No news available right now.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {initialBlogPosts.map((post) => (
                      <article
                        key={post.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        {/* Thumbnail — real image from API */}
                        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover"
                            // Vatican News images load fine; fall back gracefully if they don't
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/placeholder.svg";
                            }}
                          />
                        </div>

                        {/* Meta */}
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                            {post.category}
                          </span>
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                          {post.title}
                        </h4>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Footer row */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            Read More
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href="https://www.vaticannews.va/en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    View All News
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <a
                    href="https://www.vaticannews.va"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Vatican News
                  </a>
                  <a
                    href="https://www.kccb.or.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Catholic Bishops Conference
                  </a>
                  <a
                    href="/prayer/readings"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Daily Readings
                  </a>
                  <a
                    href="/prayer"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Prayer Requests
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default ChaplaincyServicesClient;
