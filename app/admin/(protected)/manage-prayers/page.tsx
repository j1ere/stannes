"use client";

import { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Search, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

// ─── Types & Constants ────────────────────────────────────────────────────────
interface Prayer {
  id: number;
  name: string;
  content: string;
}

const API_BASE = "https://api.stanneschaplaincy.com/api/prayers/prayers/";
const CSRF_URL = "https://api.stanneschaplaincy.com/auth/csrf/";

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function getCSRFToken(): Promise<string> {
  const res = await fetch(CSRF_URL, { credentials: "include" });
  const data = await res.json();
  return data.csrfToken;
}

function toPoeticFormat(raw: string): string {
  const stanzas = raw.split(/\n{2,}/);
  return stanzas
    .map((stanza) =>
      stanza
        .split("\n")
        .map((line) => {
          const trimmed = line.trim();
          if (!trimmed) return "";
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        })
        .join("\n")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n");
}

// ─── PrayerCard ───────────────────────────────────────────────────────────────
function PrayerCard({
  prayer,
  onEdit,
  onDelete,
}: {
  prayer: Prayer;
  onEdit: (p: Prayer) => void;
  onDelete: (p: Prayer) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const lines = prayer.content.split("\n");
  const preview = lines.slice(0, 3).join("\n");
  const hasMore = lines.length > 3;

  return (
    <article className="bg-white border border-[#ddd5c0] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4 group">
      <header className="flex items-center gap-3">
        <BookOpen size={20} className="text-[#b8963e] flex-shrink-0" />
        <h3 className="font-serif text-xl font-bold text-[#1c1812] flex-1 leading-tight">
          {prayer.name}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(prayer)}
            className="w-9 h-9 flex items-center justify-center rounded-2xl text-[#b8963e] hover:bg-[#b8963e]/10 transition-colors"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(prayer)}
            className="w-9 h-9 flex items-center justify-center rounded-2xl text-[#b34040] hover:bg-[#b34040]/10 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <pre className="font-serif text-[15.5px] leading-relaxed text-[#4a4235] whitespace-pre-wrap">
          {expanded ? prayer.content : preview}
          {!expanded && hasMore && (
            <span className="block h-8 bg-gradient-to-t from-white to-transparent -mt-8" />
          )}
        </pre>
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[#b8963e] hover:text-[#d4af6a] text-sm font-medium transition-colors self-start mt-2"
        >
          {expanded ? (
            <>
              <ChevronUp size={17} /> Show less
            </>
          ) : (
            <>
              <ChevronDown size={17} /> Read full prayer
            </>
          )}
        </button>
      )}
    </article>
  );
}

// ─── PrayerModal ──────────────────────────────────────────────────────────────
function PrayerModal({
  editing,
  onClose,
  onSaved,
}: {
  editing: Prayer | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(editing?.name ?? "");
  const [content, setContent] = useState(editing?.content ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  const handleSave = async () => {
    if (!name.trim() || !content.trim()) {
      setError("Both name and content are required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const csrfToken = await getCSRFToken();
      const payload = { name: name.trim(), content: toPoeticFormat(content) };
      const url = editing ? `${API_BASE}${editing.id}/` : API_BASE;
      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.detail || JSON.stringify(errData) || "Failed to save prayer.");
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[94vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#ddd5c0] px-6 py-5 flex items-center justify-between z-10">
          <h2 className="font-serif text-3xl font-bold text-[#1c1812]">
            {editing ? "Edit Prayer" : "New Prayer"}
          </h2>
          <button
            onClick={onClose}
            className="p-3 text-[#8c7d6a] hover:bg-[#f0ead8] rounded-2xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(94vh-140px)]">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold tracking-widest text-[#4a4235] mb-1.5 uppercase">
              Prayer Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3.5 border border-[#ddd5c0] rounded-2xl focus:border-[#b8963e] outline-none text-[#1c1812] text-lg"
              placeholder="e.g., Our Father"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold tracking-widest text-[#4a4235] mb-1.5 uppercase">
              Prayer Text
              <span className="block font-normal normal-case tracking-normal text-[#8c7d6a] mt-1 text-sm">
                Separate stanzas with a blank line
              </span>
            </label>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-4 border border-[#ddd5c0] rounded-2xl focus:border-[#b8963e] outline-none font-serif text-[#1c1812] leading-relaxed min-h-[260px] resize-y"
              placeholder="Our Father, who art in heaven,..."
            />
          </div>

          {/* Live Preview */}
          {content.trim() && (
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#8c7d6a] mb-3 uppercase">Live Preview</p>
              <pre className="bg-[#f9f5eb] border-l-4 border-[#b8963e] p-6 rounded-r-2xl font-serif text-[#1c1812] leading-loose whitespace-pre-wrap text-[15.5px]">
                {toPoeticFormat(content)}
              </pre>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#ddd5c0] px-6 py-6 flex justify-end gap-4 bg-white">
          <button
            onClick={onClose}
            className="px-8 py-3.5 border border-[#ddd5c0] rounded-2xl font-semibold text-[#4a4235] hover:bg-[#f0ead8] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3.5 bg-[#b8963e] hover:bg-[#d4af6a] text-white rounded-2xl font-semibold flex items-center gap-2 disabled:opacity-60 transition-colors"
          >
            <Save size={18} />
            {saving ? "Saving…" : editing ? "Update Prayer" : "Add Prayer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DeleteModal ──────────────────────────────────────────────────────────────
function DeleteModal({
  prayer,
  onClose,
  onDeleted,
}: {
  prayer: Prayer;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [confirm, setConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm.toUpperCase() !== "DELETE") return;

    setDeleting(true);
    try {
      const csrfToken = await getCSRFToken();
      const res = await fetch(`${API_BASE}${prayer.id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-CSRFToken": csrfToken },
      });

      if (res.ok) {
        onDeleted();
        onClose();
      } else {
        alert("Failed to delete the prayer.");
      }
    } catch {
      alert("A network error occurred.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-serif text-2xl font-bold text-red-700">Delete Prayer?</h2>
            <button onClick={onClose} className="text-[#8c7d6a] hover:text-black">
              <X size={24} />
            </button>
          </div>

          <p className="text-[#4a4235] mb-6">
            You are about to permanently delete <strong className="font-semibold">"{prayer.name}"</strong>.<br />
            This action cannot be undone.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4a4235] mb-2">
              Type <span className="font-bold text-red-600">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDelete()}
              className="w-full px-4 py-3 border border-red-200 focus:border-red-500 rounded-2xl outline-none text-center font-mono tracking-widest"
              placeholder="DELETE"
            />
          </div>
        </div>

        <div className="border-t border-[#ddd5c0] px-8 py-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#ddd5c0] rounded-2xl font-semibold text-[#4a4235] hover:bg-[#f0ead8]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={confirm.toUpperCase() !== "DELETE" || deleting}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-2xl font-semibold flex items-center gap-2 transition-colors"
          >
            <Trash2 size={17} />
            {deleting ? "Deleting…" : "Delete Prayer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ManagePrayers() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPrayer, setEditingPrayer] = useState<Prayer | null>(null);
  const [deletingPrayer, setDeletingPrayer] = useState<Prayer | null>(null);

  const fetchPrayers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE, { credentials: "include" });
      const data = await res.json();
      setPrayers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch prayers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const filtered = prayers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingPrayer(null);
    setModalOpen(true);
  };

  const openEdit = (prayer: Prayer) => {
    setEditingPrayer(prayer);
    setModalOpen(true);
  };

  const openDelete = (prayer: Prayer) => {
    setDeletingPrayer(prayer);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-10 px-4 md:px-6 font-sans text-[#1c1812]">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif text-5xl font-bold tracking-tight flex items-center gap-4">
              <BookOpen size={40} className="text-[#b8963e]" />
              Prayer Library
            </h1>
            <p className="text-[#8c7d6a] mt-2 text-lg">
              Manage the community’s collection of prayers
            </p>
          </div>

          <button
            onClick={openNew}
            className="bg-[#2d6a4f] hover:bg-[#256042] text-white px-7 py-3.5 rounded-2xl font-semibold flex items-center gap-3 self-start transition-all active:scale-95"
          >
            <Plus size={20} />
            New Prayer
          </button>
        </div>

        {/* Search */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c7d6a]" />
            <input
              type="text"
              placeholder="Search prayers by name or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-3.5 bg-white border border-[#ddd5c0] rounded-2xl focus:border-[#b8963e] outline-none text-base"
            />
          </div>
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-sm text-[#8c7d6a] mb-5 pl-1">
            Showing {filtered.length} of {prayers.length} prayer{prayers.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Content Area */}
        {loading ? (
          <div className="text-center py-20 text-[#8c7d6a] text-lg">Loading prayers...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={80} className="mx-auto mb-6 text-[#ddd5c0]" />
            <p className="font-serif text-2xl text-[#8c7d6a]">No prayers found.</p>
            <p className="text-[#8c7d6a] mt-2">Add a new prayer to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prayer) => (
              <PrayerCard
                key={prayer.id}
                prayer={prayer}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modalOpen && (
        <PrayerModal
          editing={editingPrayer}
          onClose={() => setModalOpen(false)}
          onSaved={fetchPrayers}
        />
      )}

      {deletingPrayer && (
        <DeleteModal
          prayer={deletingPrayer}
          onClose={() => setDeletingPrayer(null)}
          onDeleted={fetchPrayers}
        />
      )}
    </div>
  );
}