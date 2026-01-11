// app/admin/messages/page.tsx
"use client";

import { useState } from "react";
import { Mail, Trash2, Reply, Eye, Phone, CheckSquare, Search, Filter } from "lucide-react";

// Enhanced Message interface based on contact form
interface Message {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
  newsletter: boolean;
  date: string;
  isRead: boolean;
  status?: "unread" | "read" | "replied";
}

// Mock initial data expanded from contact form
const initialMessages: Message[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+254 700 123 456",
    category: "events",
    message: "I'm interested in joining the upcoming CSA Charity Event. Could you provide more details about the location and how to register?",
    newsletter: true,
    date: "2026-01-05",
    isRead: false,
    status: "unread",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    email: "jane.smith@maseno.ac.ke",
    phone: undefined,
    category: "spiritual",
    message: "Hello, I'd like guidance on spiritual retreats available for new students. Thank you!",
    newsletter: false,
    date: "2026-01-04",
    isRead: true,
    status: "read",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    fullName: "Michael Johnson",
    email: "michael.j@outlook.com",
    phone: "+254 711 789 012",
    category: "groups",
    message: "Inquiry about joining the St. Augustine Prayer House. Are there any upcoming meetings?",
    newsletter: true,
    date: "2026-01-03",
    isRead: false,
    status: "unread",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    fullName: "Emily Davis",
    email: "emily.davis@gmail.com",
    phone: "+254 722 345 678",
    category: "general",
    message: "General inquiry about donations and support for the chaplaincy.",
    newsletter: true,
    date: "2026-01-02",
    isRead: true,
    status: "replied",
  },
  // Add more as needed
];

export default function ManageMessages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read" | "replied">("all");

  const unreadCount = messages.filter(m => !m.isRead).length;
  const totalCount = messages.length;

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || msg.category === filterCategory;
    const matchesStatus = filterStatus === "all" || msg.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true, status: "read" } : m));
  };

  const replyToMessage = (message: Message) => {
    // Simulate reply - in production, integrate with email service
    window.open(`mailto:${message.email}?subject=Re: Your Inquiry to St. Anne's Chaplaincy&body=Dear ${message.fullName},%0D%0AThank you for reaching out. We appreciate your interest in...`);
    markAsRead(message.id);
  };

  const deleteMessage = (id: number) => {
    const message = messages.find(m => m.id === id);
    if (message) {
      setSelectedMessage(message);
      setDeleteConfirmText("");
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === "DELETE") {
      if (selectedMessage) {
        setMessages(messages.filter(m => m.id !== selectedMessage.id));
      }
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
      setDeleteConfirmText("");
    } else {
      // Visual feedback
      const input = document.querySelector("input[placeholder='DELETE']") as HTMLInputElement;
      if (input) {
        input.style.borderColor = "#ef4444";
        setTimeout(() => { input.style.borderColor = "#d1d5db"; }, 500);
      }
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMessage(null);
    setDeleteConfirmText("");
  };

  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Mail className="w-8 h-8 text-pink-600 mr-3" />
              Contact Messages
            </h1>
            <p className="text-gray-600 mt-2">Manage incoming inquiries and messages from the community</p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-medium">
              {unreadCount} Unread
            </span>
            <span className="text-gray-600">
              Total: {totalCount}
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 glass-effect-strong">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Categories</option>
                  <option value="general">General Inquiry</option>
                  <option value="student">Student Services</option>
                  <option value="events">Events & Activities</option>
                  <option value="groups">Groups & Movements</option>
                  <option value="spiritual">Spiritual Guidance</option>
                  <option value="donations">Donations & Support</option>
                  <option value="partnerships">Partnerships</option>
                </select>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Showing {filteredMessages.length} of {messages.length} messages
          </p>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden glass-effect-strong">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-900">Name</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Email</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Category</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Message Preview</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Date</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => viewMessage(msg)}>
                    <td className="p-4 font-medium text-gray-900">{msg.fullName}</td>
                    <td className="p-4 text-gray-700">{msg.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        msg.category === "events" ? "bg-blue-100 text-blue-800" :
                        msg.category === "spiritual" ? "bg-green-100 text-green-800" :
                        msg.category === "groups" ? "bg-purple-100 text-purple-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {msg.category.charAt(0).toUpperCase() + msg.category.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 max-w-md">
                      <div className="text-sm text-gray-700 line-clamp-2">{msg.message}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{new Date(msg.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        !msg.isRead ? "bg-pink-100 text-pink-800" :
                        msg.status === "replied" ? "bg-green-100 text-green-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {msg.isRead ? (msg.status === "replied" ? "Replied" : "Read") : "Unread"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {msg.phone && (
                          <button
                            onClick={(e) => { e.stopPropagation(); window.open(`tel:${msg.phone}`); }}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            title="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        )}
                        {msg.newsletter && (
                          <span className="p-1 text-green-600" title="Subscribed to Newsletter">
                            <CheckSquare className="w-4 h-4" />
                          </span>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); replyToMessage(msg); }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Reply"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages found. Check your filters or wait for new inquiries.</p>
            </div>
          )}
        </div>
      </div>

      {/* View Message Modal */}
      {isViewModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Message Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900 font-semibold">{selectedMessage.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900 break-all">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedMessage.phone}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedMessage.category === "events" ? "bg-blue-100 text-blue-800" :
                    selectedMessage.category === "spiritual" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {selectedMessage.category.charAt(0).toUpperCase() + selectedMessage.category.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{new Date(selectedMessage.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter</label>
                  <p className={`text-sm ${selectedMessage.newsletter ? "text-green-600" : "text-gray-500"}`}>
                    {selectedMessage.newsletter ? "Subscribed" : "Not Subscribed"}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => replyToMessage(selectedMessage)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Reply className="w-5 h-5" />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => { setIsViewModalOpen(false); deleteMessage(selectedMessage.id); }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full glass-effect-strong">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Message?</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete the message from <strong>{selectedMessage.fullName}</strong>? This action cannot be undone.
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
                  <span>Delete Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}