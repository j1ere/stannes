// app/admin/messages/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Trash2,
  Reply,
  Phone,
  CheckSquare,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Inbox,
} from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.stanneschaplaincy.com";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
  newsletter: boolean;
  created_at: string;
  is_read: boolean;
  status: "unread" | "read" | "replied";
}

type FilterStatus = "all" | "unread" | "read" | "replied";

// ── CSRF helper ────────────────────────────────────────────────────────────
async function fetchCsrfToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/csrf/`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json();
  return data.csrfToken as string;
}

async function apiRequest(
  path: string,
  method: "GET" | "PATCH" | "DELETE",
  csrfToken: string,
): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  });
}

// ── Category badge colours ─────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  events: "bg-blue-100 text-blue-800",
  spiritual: "bg-green-100 text-green-800",
  groups: "bg-purple-100 text-purple-800",
  student: "bg-amber-100 text-amber-800",
  donations: "bg-emerald-100 text-emerald-800",
  partnerships: "bg-sky-100 text-sky-800",
  general: "bg-gray-100 text-gray-700",
};

function categoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-700";
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ManageMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // ── Toast ──────────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // ── Load data ──────────────────────────────────────────────────────────
  const loadMessages = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest(
        "/api/contact/admin/messages/",
        "GET",
        token,
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: Message[] = await res.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCsrfToken()
      .then((token) => {
        setCsrfToken(token);
        return loadMessages(token);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [loadMessages]);

  // ── Actions ────────────────────────────────────────────────────────────
  const markAsRead = async (id: number) => {
    await apiRequest(
      `/api/contact/admin/messages/${id}/read/`,
      "PATCH",
      csrfToken,
    );
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, is_read: true, status: "read" } : m,
      ),
    );
  };

  const markAsReplied = async (id: number) => {
    setActionLoading(true);
    try {
      await apiRequest(
        `/api/contact/admin/messages/${id}/replied/`,
        "PATCH",
        csrfToken,
      );
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, is_read: true, status: "replied" } : m,
        ),
      );
      showToast("Marked as replied");
    } finally {
      setActionLoading(false);
    }
  };

  const replyToMessage = async (message: Message) => {
    window.open(
      `mailto:${message.email}?subject=Re: Your Inquiry to St. Anne's Chaplaincy&body=Dear ${message.full_name},%0D%0AThank you for reaching out...`,
    );
    await markAsReplied(message.id);
  };

  const openDeleteModal = (message: Message) => {
    setSelectedMessage(message);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMessage || deleteConfirmText.toUpperCase() !== "DELETE")
      return;
    setActionLoading(true);
    try {
      const res = await apiRequest(
        `/api/contact/admin/messages/${selectedMessage.id}/delete/`,
        "DELETE",
        csrfToken,
      );
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      setMessages((prev) => prev.filter((m) => m.id !== selectedMessage.id));
      setIsDeleteModalOpen(false);
      setIsViewModalOpen(false);
      setSelectedMessage(null);
      showToast("Message deleted");
    } catch (err) {
      showToast("Failed to delete message");
    } finally {
      setActionLoading(false);
    }
  };

  const viewMessage = async (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    if (!message.is_read) await markAsRead(message.id);
  };

  // ── Filtered list ──────────────────────────────────────────────────────
  const filtered = messages.filter((msg) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      msg.full_name?.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q) ||
      msg.category.toLowerCase().includes(q);
    const matchCat =
      filterCategory === "all" || msg.category === filterCategory;
    const matchStatus = filterStatus === "all" || msg.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen pt-16">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[100] bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg animate-fade-in">
          {toastMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Mail className="w-8 h-8 text-pink-600 mr-3" />
              Contact Messages
            </h1>
            <p className="text-gray-600 mt-1">
              Manage incoming inquiries from the community
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              {unreadCount} Unread
            </span>
            <span className="text-gray-500 text-sm">
              Total: {messages.length}
            </span>
            <button
              onClick={() => loadMessages(csrfToken)}
              disabled={loading}
              className="p-2 rounded-lg border border-gray-300 hover:bg-white transition-colors"
              title="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 text-gray-600 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
            <button
              onClick={() => loadMessages(csrfToken)}
              className="ml-auto text-sm underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search name, email, message…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="general">General</option>
                  <option value="student">Student Services</option>
                  <option value="events">Events</option>
                  <option value="groups">Groups</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="donations">Donations</option>
                  <option value="partnerships">Partnerships</option>
                </select>
              </div>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as FilterStatus)
                }
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Showing {filtered.length} of {messages.length} messages
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <RefreshCw className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm">Loading messages…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Inbox className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-sm">No messages match your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
                  <tr>
                    {[
                      "Name",
                      "Email",
                      "Category",
                      "Message",
                      "Date",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="p-4 text-left text-sm font-semibold text-gray-700"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((msg) => (
                    <tr
                      key={msg.id}
                      onClick={() => viewMessage(msg)}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                        !msg.is_read ? "bg-pink-50/40 font-medium" : ""
                      }`}
                    >
                      <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                        <span className={!msg.is_read ? "font-semibold" : ""}>
                          {msg.full_name}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                        {msg.email}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor(msg.category)}`}
                        >
                          {capitalize(msg.category)}
                        </span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {msg.message}
                        </p>
                      </td>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(msg.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            msg.status === "unread"
                              ? "bg-pink-100 text-pink-800"
                              : msg.status === "replied"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {capitalize(msg.status)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div
                          className="flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {msg.phone && (
                            <button
                              onClick={() => window.open(`tel:${msg.phone}`)}
                              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                          )}
                          {msg.newsletter && (
                            <span
                              className="p-1.5 text-green-500"
                              title="Newsletter subscriber"
                            >
                              <CheckSquare className="w-4 h-4" />
                            </span>
                          )}
                          <button
                            onClick={() => replyToMessage(msg)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Reply"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(msg)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          )}
        </div>
      </div>

      {/* ── View Modal ── */}
      {isViewModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Message Details
              </h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  ["Full Name", selectedMessage.full_name],
                  ["Email", selectedMessage.email],
                  ["Phone", selectedMessage.phone ?? "—"],
                  ["Category", capitalize(selectedMessage.category)],
                  [
                    "Date",
                    new Date(selectedMessage.created_at).toLocaleDateString(),
                  ],
                  [
                    "Newsletter",
                    selectedMessage.newsletter
                      ? "Subscribed ✓"
                      : "Not subscribed",
                  ],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Message
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openDeleteModal(selectedMessage);
                  }}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                <button
                  onClick={() => replyToMessage(selectedMessage)}
                  disabled={actionLoading}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
                >
                  <Reply className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {isDeleteModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6">
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Delete Message?
              </h2>
              <p className="text-sm text-gray-600">
                This will permanently delete the message from{" "}
                <strong>{selectedMessage.full_name}</strong>. This cannot be
                undone.
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Type{" "}
                <span className="font-mono font-bold text-red-600">DELETE</span>{" "}
                to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmDelete();
                }}
                placeholder="DELETE"
                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg text-center font-mono uppercase tracking-widest text-red-600 text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText("");
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={
                  deleteConfirmText.toUpperCase() !== "DELETE" || actionLoading
                }
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
