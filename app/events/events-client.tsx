// app/events/EventsClient.tsx
"use client";
import React from "react"
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
} from "lucide-react";
import { useState, useEffect } from "react";
import ScrollToTop from "@/app/components/scroll-to-top";
import type {
  UpcomingEvent,
  RegularActivity,
  AnnualEvent,
  CatholicEvent,
} from "@/app/events/types";
import Link from "next/link";
// interface Props {
//   upcomingEvents: UpcomingEvent[]
// }

const EventsClient = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [catholicEvents, setCatholicEvents] = useState<
    Record<number, CatholicEvent[]>
  >({});
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(
    null,
  );
  const [showEventModal, setShowEventModal] = useState(false);

  const [regularActivities, setRegularActivities] = useState<RegularActivity[]>(
    [],
  );
  const [isLoadingRegular, setIsLoadingRegular] = useState(true);

  const [calendarFiles, setCalendarFiles] = useState<{
    csa: string | null;
    program: string | null;
  }>({
    csa: null,
    program: null,
  });

  const [selectedLiturgicalEvent, setSelectedLiturgicalEvent] = useState<CatholicEvent | null>(null);

  // Fetch real Upcoming Events from public endpoint
  const fetchUpcomingEvents = async () => {
    try {
      const res = await fetch(
        "https://api.stanneschaplaincy.com/api/events/public/upcoming/",
      );
      if (res.ok) {
        const data = await res.json();
        setUpcomingEvents(data.upcoming_events || []);
      }
    } catch (error) {
      console.error("Failed to fetch upcoming events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Public Liturgical Calendar - FIXED
  const fetchPublicCalendar = async () => {
    try {
      const res = await fetch(
        "https://api.stanneschaplaincy.com/api/calendar/public/",
      );
      if (res.ok) {
        const data = await res.json();

        const grouped: Record<number, CatholicEvent[]> = {};

        data.calendar_entries.forEach((entry: any) => {
          const dateObj = new Date(entry.date);
          const month = dateObj.getMonth();
          const day = dateObj.getDate();

          if (!grouped[month]) grouped[month] = [];

          // FIXED: Properly handle all readings (list field)
          let readingDisplay = "";
          if (Array.isArray(entry.readings) && entry.readings.length > 0) {
            readingDisplay = entry.readings
              .map((r: string) => r.trim())
              .filter(Boolean)
              .join("\n\n"); // Separate readings with blank line for better readability
          }

          grouped[month].push({
            date: day,
            event: entry.event,
            type: entry.type || "weekday",
            liturgical_color: entry.liturgical_color || null,
            reading: readingDisplay || "No readings available",
          });
        });

        setCatholicEvents(grouped);
      }
    } catch (error) {
      console.error("Failed to fetch liturgical calendar:", error);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      Calendar,
      Users,
      Heart,
      Mountain,
      Crown,
      Gift,
    };
    return icons[iconName as keyof typeof icons] || Calendar;
  };

  const fetchRegularEvents = async () => {
    try {
      const res = await fetch(
        "https://api.stanneschaplaincy.com/api/events/public/regular/",
      );
      if (res.ok) {
        const data = await res.json();
        setRegularActivities(data.regular_events || []);
      }
    } catch (error) {
      console.error("Failed to fetch regular events:", error);
    } finally {
      setIsLoadingRegular(false);
    }
  };

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
      description:
        "Hiking hills with sporting activities like football, races, tug of war",
      frequency: "Semester",
      impact: "Recreation & Bonding",
    },
    {
      title: "CSA Cultural Week",
      description:
        "Cultural activities culminating in Mr. & Miss Chaplaincy crowning",
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
      description:
        "Partnership with Vincentian Ministries for spiritual reconnection",
      frequency: "Semester",
      impact: "Spiritual Growth",
    },
  ];

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
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const fetchCalendarFiles = async () => {
    try {
      const res = await fetch(
        "https://api.stanneschaplaincy.com/api/events/public/calendars/",
      );
      if (res.ok) {
        const data = await res.json();
        const files = data.calendar_files || [];
        setCalendarFiles({
          csa: files.find((f: any) => f.file_type === "csa")?.file_url ?? null,
          program:
            files.find((f: any) => f.file_type === "program")?.file_url ?? null,
        });
      }
    } catch (error) {
      console.error("Failed to fetch calendar files:", error);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleLearnMore = (event: UpcomingEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days: React.ReactNode[] = [];
    const monthEvents = catholicEvents[currentMonth] || [];

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50 rounded-xl" />
      );
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = monthEvents.filter((event) => event.date === day);
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentMonth &&
        new Date().getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 rounded-xl transition-all hover:shadow-sm cursor-pointer
            ${isToday ? "bg-blue-50 border-blue-300" : "bg-white hover:bg-gray-50"}`}
          onClick={() => {
            if (dayEvents.length > 0) {
              setSelectedLiturgicalEvent(dayEvents[0]);
            }
          }}
        >
          <div className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>
            {day}
          </div>

          {dayEvents.length > 0 && (
            <div className="mt-2 space-y-1">
              {dayEvents.slice(0, 2).map((event, idx) => (
                <div
                  key={idx}
                  className={`text-xs px-2 py-1 rounded font-medium truncate ${
                    event.type === "solemnity"
                      ? "bg-red-100 text-red-700"
                      : event.type === "feast"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {event.event}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-[10px] text-gray-500 pl-1">+{dayEvents.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  useEffect(() => {
    fetchUpcomingEvents();
    fetchPublicCalendar();
    fetchRegularEvents();
    fetchCalendarFiles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-gray-600">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - SSG */}
      
      {/* PDF Downloads Section - SSG */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-12 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-20 left-8 w-36 h-36 bg-green-200/25 rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Download Calendars
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get the official chaplaincy calendar and Program to stay updated
              with all events and activities
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Chaplaincy Calendar 2025/26
                </h3>
                <p className="text-gray-600 mb-6">
                  Complete calendar of CSA events, meetings, and activities for
                  the semester year
                </p>
                <button
                  onClick={() => {
                    if (calendarFiles.csa) {
                      const a = document.createElement("a");
                      a.href = calendarFiles.csa;
                      a.download = "CSA-Calendar-2025-26.pdf";
                      a.target = "_blank";
                      a.click();
                    } else {
                      alert("Calendar not yet available. Check back soon!");
                    }
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Calendar</span>
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Program Guide 2025/26
                </h3>
                <p className="text-gray-600 mb-6">
                  Major semester events guide
                </p>
                <button
                  onClick={() => {
                    if (calendarFiles.program) {
                      const a = document.createElement("a");
                      a.href = calendarFiles.program;
                      a.download = "Program-Guide-2025-26.pdf";
                      a.target = "_blank";
                      a.click();
                    } else {
                      alert(
                        "Program guide not yet available. Check back soon!",
                      );
                    }
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Program </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catholic Calendar Section - SSG (hardcoded, or fetch with long revalidate if API used) */}
      {/* Catholic Calendar Section with Clickable Modal */}
{/* ==================== CATHOLIC LITURGICAL CALENDAR SECTION ==================== */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Catholic Liturgical Calendar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow the Catholic liturgical year with important feast days, celebrations, and their biblical readings
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-6">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateMonth("prev")} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold">
                  {months[currentMonth]} {currentYear}
                </h3>
                <button onClick={() => navigateMonth("next")} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center font-medium text-gray-700 bg-gray-100 rounded">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== IMPROVED LITURGICAL EVENT MODAL ==================== */}
        {selectedLiturgicalEvent && (
          <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4"
            onClick={() => setSelectedLiturgicalEvent(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-90">
                      {months[currentMonth]} {selectedLiturgicalEvent.date}, {currentYear}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {selectedLiturgicalEvent.event}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedLiturgicalEvent(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-7">
                <div className="flex flex-wrap gap-3">
                  {/* Event Type */}
                  <span className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full ${
                    selectedLiturgicalEvent.type === "solemnity" 
                      ? "bg-red-100 text-red-700" 
                      : selectedLiturgicalEvent.type === "feast" 
                        ? "bg-amber-100 text-amber-700" 
                        : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {selectedLiturgicalEvent.type.toUpperCase()}
                  </span>

                  {/* IMPROVED Liturgical Color with colored dot */}
                  {selectedLiturgicalEvent.liturgical_color && (
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full bg-white border border-gray-200 text-gray-700 capitalize">
                      <span 
                        className="w-3 h-3 rounded-full inline-block"
                        style={{
                          backgroundColor: getColorHex(selectedLiturgicalEvent.liturgical_color)
                        }}
                      />
                      {selectedLiturgicalEvent.liturgical_color}
                    </span>
                  )}
                </div>

                {/* Readings - Now shows ALL readings properly */}
                {selectedLiturgicalEvent.reading && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      📖 Readings
                    </h4>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-gray-700 leading-relaxed whitespace-pre-line text-[15.5px]">
                      {selectedLiturgicalEvent.reading}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedLiturgicalEvent(null);
                        window.location.href = "/prayer";
                      }}
                      className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                    >
                      View Full Daily Readings →
                    </button>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 text-center">
                  <button
                    onClick={() => setSelectedLiturgicalEvent(null)}
                    className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Upcoming Events - ISR via fetch in parent */}
      {/* ==================== UPCOMING EVENTS SECTION ==================== */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for these upcoming events and be part of our growing Catholic community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => {
              const IconComponent = getIconComponent(event.icon);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${event.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center mr-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {event.category || "Event"}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                      </div>
                    </div>

                    <div className="space-y-2 text-gray-600 mb-6">
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
                      className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== EVENT DETAIL MODAL ==================== */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl">
            <div className="relative">
              <div className={`h-3 bg-gradient-to-r ${selectedEvent.color}`}></div>
              
              <button
                onClick={closeEventModal}
                className="absolute top-4 right-4 p-3 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${selectedEvent.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {React.createElement(getIconComponent(selectedEvent.icon), { className: "w-8 h-8 text-white" })}
                  </div>
                  <div>
                    <span className="uppercase text-xs tracking-widest text-gray-500 font-medium">
                      {selectedEvent.category || "Upcoming Event"}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight mt-1">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-medium">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-medium">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
                  <p className="text-gray-700 leading-relaxed text-[15.5px] whitespace-pre-line">
                    {selectedEvent.description || "No additional details provided."}
                  </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:brightness-105 transition-all">
                    Register / RSVP
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Regular Activities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our ongoing activities that form the backbone of our community
              life
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {regularActivities.map((activity, index) => (
              <div
                key={activity.id ?? index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {activity.title}
                </h3>
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
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,80 C150,40 350,100 500,60 C650,20 850,80 1000,40 C1100,60 1150,80 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div> */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Annual Signature Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Special events that define our community spirit and mission
              throughout the year
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {annualEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
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
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C250,100 450,20 650,80 C850,120 1050,40 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div> */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mass Schedule
            </h2>
            <p className="text-gray-600">
              Join us for regular celebration of the Eucharist
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-6">
              <h3 className="text-2xl font-bold text-center">
                Weekly Mass Times
              </h3>
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
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-green-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,20 C200,80 400,40 600,100 C800,60 1000,20 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div> */}
      </section>

      {/* Call to Action - SSG */}
      <section className="py-16 bg-gradient-to-br from-green-900 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Events</h2>
          <p className="text-xl mb-8 text-green-100">
            Be part of our vibrant community activities and grow in faith
            together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="bg-white text-green-900 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              Get Event Updates
            </button> */}
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </Link>
            
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

// Helper to map liturgical colors to nice hex values
const getColorHex = (color: string): string => {
  const colorMap: Record<string, string> = {
    white: "#f8fafc",
    green: "#15803d",
    purple: "#6b21a8",
    red: "#b91c1c",
    rose: "#e11d48",
    gold: "#d97706",
    "liturgical white": "#f1f5f9",
  };
  return colorMap[color.toLowerCase()] || "#64748b";
};

export default EventsClient;
