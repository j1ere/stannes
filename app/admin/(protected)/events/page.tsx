// app/admin/events/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  File,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  X,
} from "lucide-react";

// Interfaces (kept exactly the same)
interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  icon: string;
  color: string;
}

interface RegularEvent {
  id: number;
  title: string;
  schedule: string;
  time: string;
  location: string;
  description?: string;
  category: string;
}

const API_BASE = "https://api.stanneschaplaincy.com/api/events";

export default function ManageEvents() {
  const [calendars, setCalendars] = useState({ csa: "", program: "" });
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [regularEvents, setRegularEvents] = useState<RegularEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isAddUpcomingModalOpen, setIsAddUpcomingModalOpen] = useState(false);
  const [isAddRegularModalOpen, setIsAddRegularModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<
    UpcomingEvent | RegularEvent | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [eventToDelete, setEventToDelete] = useState<
    (UpcomingEvent | RegularEvent) | null
  >(null);

  // Form states
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

  // Helper: Get CSRF Token
  const getCSRFToken = async (): Promise<string> => {
    const res = await fetch("https://api.stanneschaplaincy.com/auth/csrf/", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
  };

  // Fetch all data
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [calRes, upRes, regRes] = await Promise.all([
        fetch(`${API_BASE}/calendars/`, { credentials: "include" }),
        fetch(`${API_BASE}/upcoming/`, { credentials: "include" }),
        fetch(`${API_BASE}/regular/`, { credentials: "include" }),
      ]);

      const calendarsData = await calRes.json();
      const upcomingData = await upRes.json();
      const regularData = await regRes.json();

      // Set calendars
      const csaFile = calendarsData.find((f: any) => f.file_type === "csa");
      const programFile = calendarsData.find(
        (f: any) => f.file_type === "program",
      );

      setCalendars({
        csa: csaFile?.file?.split("/").pop() || "",
        program: programFile?.file?.split("/").pop() || "",
      });

      setUpcomingEvents(upcomingData);
      setRegularEvents(regularData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Upload Calendar PDF
  const uploadCalendar = async (type: "csa" | "program", file: File) => {
    try {
      const csrfToken = await getCSRFToken();

      const formData = new FormData();
      formData.append("file_type", type);
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/calendars/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      });

      if (res.ok) {
        const newFile = await res.json();
        setCalendars((prev) => ({
          ...prev,
          [type]: file.name,
        }));
        alert(`${type.toUpperCase()} calendar uploaded successfully!`);
      } else {
        alert("Failed to upload calendar");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    }
  };

  // Save Upcoming Event (Create or Update)
  const saveUpcomingEvent = async () => {
    try {
      const csrfToken = await getCSRFToken();
      const url = editingEvent
        ? `${API_BASE}/upcoming/${editingEvent.id}/`
        : `${API_BASE}/upcoming/`;

      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(newUpcomingEvent),
      });

      if (res.ok) {
        fetchAllData(); // Refresh list
        setIsAddUpcomingModalOpen(false);
        setEditingEvent(null);
        // Reset form
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
      } else {
        alert("Failed to save event");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // Save Regular Event
  const saveRegularEvent = async () => {
    try {
      const csrfToken = await getCSRFToken();
      const url = editingEvent
        ? `${API_BASE}/regular/${editingEvent.id}/`
        : `${API_BASE}/regular/`;

      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(newRegularEvent),
      });

      if (res.ok) {
        fetchAllData();
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
      } else {
        alert("Failed to save event");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // Delete Event
  const confirmDelete = async () => {
    if (deleteConfirmText.toUpperCase() !== "DELETE" || !eventToDelete) return;

    try {
      const csrfToken = await getCSRFToken();
      const isUpcoming = "icon" in eventToDelete;
      const endpoint = isUpcoming ? "upcoming" : "regular";

      const res = await fetch(`${API_BASE}/${endpoint}/${eventToDelete.id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-CSRFToken": csrfToken },
      });

      if (res.ok) {
        fetchAllData();
        closeDeleteModal();
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
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

  // Loading state
  if (isLoading) {
    return <div className="p-6 text-center">Loading events...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen pt-16">
      {/* Rest of your JSX remains EXACTLY the same from here */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-8 h-8 text-purple-600 mr-3" />
              Manage Events
            </h1>
            <p className="text-gray-600 mt-2">
              Organize calendars, programs, and community activities
            </p>
          </div>
        </div>

        {/* PDF Upload Section - Updated onChange */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 glass-effect-strong">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <File className="w-5 h-5 text-gray-600 mr-2" />
              Chaplaincy Calendar
            </h2>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadCalendar("csa", file);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <p className="text-sm text-gray-600 mt-2">
              Current: {calendars.csa || "None uploaded"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 glass-effect-strong">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <File className="w-5 h-5 text-gray-600 mr-2" />
              Program Guide
            </h2>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadCalendar("program", file);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <p className="text-sm text-gray-600 mt-2">
              Current: {calendars.program || "None uploaded"}
            </p>
          </div>
        </div>

        {/* Regular Events Section - Unchanged except data source */}
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
                {event.description && (
                  <p className="text-xs text-gray-500 mb-3">
                    {event.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {event.category}
                  </span>
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

        {/* Upcoming Events Section - Unchanged except data source */}
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
                <div
                  className={`h-2 bg-gradient-to-r ${event.color} rounded-t-xl mb-4`}
                ></div>
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
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {event.description}
                </p>
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

      {/* All your modals remain 100% unchanged below */}
      {/* Upcoming Event Modal - With Dropdowns for Icon & Color */}
      {isAddUpcomingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEvent ? "Edit" : "Add"} Upcoming Event
              </h2>
              <button
                onClick={() => setIsAddUpcomingModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Title *"
                  value={newUpcomingEvent.title}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />

                <input
                  type="date"
                  value={newUpcomingEvent.date}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />

                <input
                  placeholder="Time *"
                  value={newUpcomingEvent.time}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      time: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />

                <input
                  placeholder="Location *"
                  value={newUpcomingEvent.location}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />

                {/* Category Select */}
                <select
                  value={newUpcomingEvent.category}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Category</option>
                  <option value="Charity">Charity</option>
                  <option value="Recreation">Recreation</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Spiritual">Spiritual</option>
                </select>

                {/* Icon Dropdown */}
                <select
                  value={newUpcomingEvent.icon}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      icon: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Calendar">Calendar</option>
                  <option value="Heart">Heart</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Users">Users (Group)</option>
                  <option value="Award">Award</option>
                  <option value="Star">Star</option>
                  <option value="Music">Music</option>
                  <option value="Book">Book</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Tree">Tree</option>
                </select>

                {/* Color Gradient Dropdown */}
                <select
                  value={newUpcomingEvent.color}
                  onChange={(e) =>
                    setNewUpcomingEvent({
                      ...newUpcomingEvent,
                      color: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="from-blue-500 to-indigo-600">
                    Blue → Indigo
                  </option>
                  <option value="from-red-500 to-pink-600">Red → Pink</option>
                  <option value="from-green-500 to-emerald-600">
                    Green → Emerald
                  </option>
                  <option value="from-purple-500 to-violet-600">
                    Purple → Violet
                  </option>
                  <option value="from-amber-500 to-orange-600">
                    Amber → Orange
                  </option>
                  <option value="from-teal-500 to-cyan-600">Teal → Cyan</option>
                  <option value="from-rose-500 to-fuchsia-600">
                    Rose → Fuchsia
                  </option>
                  <option value="from-lime-500 to-green-600">
                    Lime → Green
                  </option>
                </select>
              </div>

              <textarea
                placeholder="Description *"
                value={newUpcomingEvent.description}
                onChange={(e) =>
                  setNewUpcomingEvent({
                    ...newUpcomingEvent,
                    description: e.target.value,
                  })
                }
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

      {/* Regular Event Modal - Same structure, unchanged UI */}
      {isAddRegularModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEvent ? "Edit" : "Add"} Regular Event
              </h2>
              <button
                onClick={() => setIsAddRegularModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Title *"
                  value={newRegularEvent.title}
                  onChange={(e) =>
                    setNewRegularEvent({
                      ...newRegularEvent,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Schedule * (e.g., Every Sunday)"
                  value={newRegularEvent.schedule}
                  onChange={(e) =>
                    setNewRegularEvent({
                      ...newRegularEvent,
                      schedule: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Time * (e.g., 8:00 AM & 6:00 PM)"
                  value={newRegularEvent.time}
                  onChange={(e) =>
                    setNewRegularEvent({
                      ...newRegularEvent,
                      time: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  placeholder="Location *"
                  value={newRegularEvent.location}
                  onChange={(e) =>
                    setNewRegularEvent({
                      ...newRegularEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <select
                  value={newRegularEvent.category}
                  onChange={(e) =>
                    setNewRegularEvent({
                      ...newRegularEvent,
                      category: e.target.value,
                    })
                  }
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
                onChange={(e) =>
                  setNewRegularEvent({
                    ...newRegularEvent,
                    description: e.target.value,
                  })
                }
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

      {/* Delete Confirmation Modal - Unchanged */}
      {isDeleteModalOpen && eventToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full ">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Event?
                </h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete{" "}
                  <strong>"{eventToDelete.title}"</strong>? This action cannot
                  be undone.
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
                    if (e.key === "Enter") confirmDelete();
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
