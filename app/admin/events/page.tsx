// app/admin/events/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Upload, File, Calendar, Clock, MapPin, Plus, Edit3, Trash2, X } from "lucide-react";
import Image from "next/image"; // If needed for icons


// Enhanced Event interfaces
interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string; // e.g., "Charity", "Hike", "Cultural"
  icon: string; // e.g., "Heart", "Mountain"
  color: string; // e.g., "from-green-500 to-emerald-600"
}

interface RegularEvent {
  id: number;
  title: string; // e.g., "Sunday Mass"
  schedule: string; // e.g., "Every Sunday"
  time: string; // e.g., "8:00 AM & 6:00 PM"
  location: string; // e.g., "Main Chapel"
  description?: string;
  category: string; // e.g., "Mass & Liturgy"
}

// Mock initial data
const initialUpcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "CSA Charity Event",
    date: "2026-01-15",
    time: "10:00 AM",
    location: "Children's Home",
    description: "Visiting children homes, elderly homes, and hospitals",
    category: "Charity",
    icon: "Heart",
    color: "from-red-500 to-pink-600",
  },
  {
    id: 2,
    title: "CSA Hike",
    date: "2026-01-20",
    time: "7:00 AM",
    location: "Kakamega Hills",
    description: "Hiking hills with sporting activities like football, races, tug of war",
    category: "Recreation",
    icon: "Mountain",
    color: "from-green-500 to-emerald-600",
  },
  // Add more as needed
];

const initialRegularEvents: RegularEvent[] = [
  {
    id: 1,
    title: "Sunday Mass",
    schedule: "Every Sunday",
    time: "8:00 AM & 6:00 PM",
    location: "Main Chapel",
    description: "Join us for regular celebration of the Eucharist",
    category: "Mass & Liturgy",
  },
  {
    id: 2,
    title: "Weekday Mass",
    schedule: "Monday to Friday",
    time: "5:00 PM",
    location: "Main Chapel",
    description: "Daily mass for students and community",
    category: "Mass & Liturgy",
  },
  {
    id: 3,
    title: "Friday Confessions",
    schedule: "Every Friday",
    time: "4:00 PM",
    location: "Main Chapel",
    description: "Confessions available before mass",
    category: "Spiritual",
  },
  // Add more as needed
];

export default function ManageEvents() {
  const [calendars, setCalendars] = useState({ csa: "", program: "" });
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>(initialUpcomingEvents);
  const [regularEvents, setRegularEvents] = useState<RegularEvent[]>(initialRegularEvents);
  const [isAddUpcomingModalOpen, setIsAddUpcomingModalOpen] = useState(false);
  const [isAddRegularModalOpen, setIsAddRegularModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UpcomingEvent | RegularEvent | null>(null);
  const [newUpcomingEvent, setNewUpcomingEvent] = useState<UpcomingEvent>({
    id: 0,
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    icon: "Calendar",
    color: "from-blue-500 to-indigo-600",
  });
  const [newRegularEvent, setNewRegularEvent] = useState<RegularEvent>({
    id: 0,
    title: "",
    schedule: "",
    time: "",
    location: "",
    description: "",
    category: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [eventToDelete, setEventToDelete] = useState<(UpcomingEvent | RegularEvent) | null>(null);

  const uploadCalendar = (type: "csa" | "program", file: File) => {
    // Handle PDF upload logic here (e.g., upload to server)
    setCalendars({ ...calendars, [type]: file.name });
  };

  const saveUpcomingEvent = () => {
    if (editingEvent) {
      setUpcomingEvents(upcomingEvents.map(e => e.id === editingEvent.id ? newUpcomingEvent : e));
    } else {
      setUpcomingEvents([...upcomingEvents, { ...newUpcomingEvent, id: Date.now() }]);
    }
    setIsAddUpcomingModalOpen(false);
    setEditingEvent(null);
    setNewUpcomingEvent({
      id: 0,
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      category: "",
      icon: "Calendar",
      color: "from-blue-500 to-indigo-600",
    });
  };

  const saveRegularEvent = () => {
    if (editingEvent) {
      setRegularEvents(regularEvents.map(e => e.id === editingEvent.id ? newRegularEvent : e));
    } else {
      setRegularEvents([...regularEvents, { ...newRegularEvent, id: Date.now() }]);
    }
    setIsAddRegularModalOpen(false);
    setEditingEvent(null);
    setNewRegularEvent({
      id: 0,
      title: "",
      schedule: "",
      time: "",
      location: "",
      description: "",
      category: "",
    });
  };

  const openDeleteModal = (event: UpcomingEvent | RegularEvent) => {
    setEventToDelete(event);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
    setDeleteConfirmText("");
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === "DELETE") {
      if (eventToDelete) {
        if ("icon" in eventToDelete) {
          setUpcomingEvents(upcomingEvents.filter(e => e.id !== eventToDelete.id));
        } else {
          setRegularEvents(regularEvents.filter(e => e.id !== eventToDelete.id));
        }
      }
      closeDeleteModal();
    } else {
      // Optional: visual feedback
      const input = document.querySelector("input[placeholder='DELETE']") as HTMLInputElement;
      if (input) {
        input.style.borderColor = "#ef4444";
        setTimeout(() => input.style.borderColor = "#d1d5db", 500);
      }
    }
  };

  const openEditUpcoming = (event: UpcomingEvent) => {
    setNewUpcomingEvent(event);
    setEditingEvent(event);
    setIsAddUpcomingModalOpen(true);
  };

  const openEditRegular = (event: RegularEvent) => {
    setNewRegularEvent(event);
    setEditingEvent(event);
    setIsAddRegularModalOpen(true);
  };

 

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-8 h-8 text-purple-600 mr-3" />
              Manage Events
            </h1>
            <p className="text-gray-600 mt-2">Organize calendars, programs, and community activities</p>
          </div>
        </div>

        {/* PDF Upload Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 glass-effect-strong">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <File className="w-5 h-5 text-gray-600 mr-2" />
              Chaplaincy Calendar
            </h2>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => uploadCalendar("csa", e.target.files?.[0] || new File([], ""))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <p className="text-sm text-gray-600 mt-2">Current: {calendars.csa || "None uploaded"}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 glass-effect-strong">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <File className="w-5 h-5 text-gray-600 mr-2" />
              Program Guide
            </h2>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => uploadCalendar("program", e.target.files?.[0] || new File([], ""))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <p className="text-sm text-gray-600 mt-2">Current: {calendars.program || "None uploaded"}</p>
          </div>
        </div>

        {/* Regular Events Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 glass-effect-strong">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Clock className="w-5 h-5 text-orange-600 mr-2" />
              Regular Activities & Mass Schedule
            </h2>
            <button
              onClick={() => {
                setIsAddRegularModalOpen(true);
                setEditingEvent(null);
              }}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Regular Event</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Schedule:</strong> {event.schedule}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Location:</strong> {event.location}
                </p>
                {event.description && <p className="text-xs text-gray-500 mb-3">{event.description}</p>}
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{event.category}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditRegular(event)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(event)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 glass-effect-strong">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              Upcoming Events
            </h2>
            <button
              onClick={() => {
                setIsAddUpcomingModalOpen(true);
                setEditingEvent(null);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Upcoming Event</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className={`h-2 bg-gradient-to-r ${event.color} rounded-t-xl mb-4`}></div>
                <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-3">
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
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{event.description}</p>
                <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  {event.category}
                </span>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => openEditUpcoming(event)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(event)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Event Modal */}
      {isAddUpcomingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEvent ? "Edit" : "Add"} Upcoming Event
              </h2>
              <button onClick={() => setIsAddUpcomingModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Title *"
                  value={newUpcomingEvent.title}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <input
                  type="date"
                  value={newUpcomingEvent.date}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Time *"
                  value={newUpcomingEvent.time}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Location *"
                  value={newUpcomingEvent.location}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <select
                  value={newUpcomingEvent.category}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Category</option>
                  <option value="Charity">Charity</option>
                  <option value="Recreation">Recreation</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Spiritual">Spiritual</option>
                </select>
                <input
                  placeholder="Icon (e.g., Heart)"
                  value={newUpcomingEvent.icon}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, icon: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  placeholder="Color Gradient (e.g., from-green-500 to-emerald-600)"
                  value={newUpcomingEvent.color}
                  onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <textarea
                placeholder="Description *"
                value={newUpcomingEvent.description}
                onChange={(e) => setNewUpcomingEvent({ ...newUpcomingEvent, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
                required
              />
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsAddUpcomingModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveUpcomingEvent}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{editingEvent ? "Update" : "Add"} Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Event Modal */}
      {isAddRegularModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEvent ? "Edit" : "Add"} Regular Event
              </h2>
              <button onClick={() => setIsAddRegularModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Title *"
                  value={newRegularEvent.title}
                  onChange={(e) => setNewRegularEvent({ ...newRegularEvent, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Schedule * (e.g., Every Sunday)"
                  value={newRegularEvent.schedule}
                  onChange={(e) => setNewRegularEvent({ ...newRegularEvent, schedule: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Time * (e.g., 8:00 AM & 6:00 PM)"
                  value={newRegularEvent.time}
                  onChange={(e) => setNewRegularEvent({ ...newRegularEvent, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Location *"
                  value={newRegularEvent.location}
                  onChange={(e) => setNewRegularEvent({ ...newRegularEvent, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <select
                  value={newRegularEvent.category}
                  onChange={(e) => setNewRegularEvent({ ...newRegularEvent, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Category</option>
                  <option value="Mass & Liturgy">Mass & Liturgy</option>
                  <option value="Spiritual">Spiritual</option>
                  <option value="Fellowship">Fellowship</option>
                </select>
              </div>
              <textarea
                placeholder="Description (Optional)"
                value={newRegularEvent.description || ""}
                onChange={(e) => setNewRegularEvent({ ...newRegularEvent, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsAddRegularModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveRegularEvent}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{editingEvent ? "Update" : "Add"} Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && eventToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full glass-effect-strong">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Event?</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <strong>&quot;{eventToDelete.title}&quot;</strong>? This action cannot be undone.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <strong>DELETE</strong> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-red-600 font-mono uppercase tracking-wider"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      confirmDelete();
                    }
                  }}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteConfirmText.toUpperCase() !== "DELETE"}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}