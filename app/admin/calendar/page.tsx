// app/admin/calendar/page.tsx
"use client";

import { useState , useEffect} from "react";
import { Plus, Edit3, Trash2, Calendar as CalIcon, Search, Filter } from "lucide-react";
import Image from "next/image"; // For potential icons
import { Sidebar } from "@/app/components/admin-sidebar";
import { useRouter } from "next/navigation";


// Enhanced Entry interface
interface CalendarEntry {
  id: number;
  date: string; // YYYY-MM-DD
  event: string;
  type: "solemnity" | "feast" | "memorial" | "season" | "optional"; // Expanded types
  readings: string[]; // Array of readings
  verse?: string; // Optional verse reference
  notes?: string; // Admin notes
}

// Mock initial data for 2026 (Liturgical Year B) - expanded with more entries
const initialCalendar: CalendarEntry[] = [
  {
    id: 1,
    date: "2026-01-01",
    event: "The Blessed Virgin Mary, the Mother of God",
    type: "solemnity",
    readings: ["Numbers 6:22-27", "Galatians 4:4-7", "Luke 2:16-21"],
    verse: "Luke 2:16-21",
  },
  {
    id: 2,
    date: "2026-01-06",
    event: "Epiphany of the Lord",
    type: "solemnity",
    readings: ["Isaiah 60:1-6", "Ephesians 3:2-3a, 5-6", "Matthew 2:1-12"],
    verse: "Matthew 2:1-12",
  },
  {
    id: 3,
    date: "2026-01-25",
    event: "Conversion of St. Paul, Apostle",
    type: "feast",
    readings: ["Acts 22:3-16", "Acts 9:1-22", "Mark 16:15-18"],
    verse: "Acts 22:3-16",
  },
  {
    id: 4,
    date: "2026-02-02",
    event: "Presentation of the Lord",
    type: "feast",
    readings: ["Malachi 3:1-4", "Hebrews 2:14-18", "Luke 2:22-40 or 2:22-32"],
    verse: "Luke 2:22-40",
  },
  {
    id: 5,
    date: "2026-02-14",
    event: "Saints Cyril and Methodius, Patrons of Europe",
    type: "optional",
    readings: ["Genesis 46:1-30", "1 Thessalonians 5:1-6, 9-11", "Luke 12:35-40"],
  },
  {
    id: 6,
    date: "2026-02-18", // Ash Wednesday (example for Lent start)
    event: "Ash Wednesday - Start of Lent",
    type: "season",
    readings: ["Joel 2:12-18", "2 Corinthians 5:20—6:2", "Matthew 6:1-6, 16-18"],
    notes: "Beginning of Lenten season",
  },
  // Add more entries as needed for full year
];

export default function ManageCalendar() {
  const [entries, setEntries] = useState<CalendarEntry[]>(initialCalendar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CalendarEntry>({
    id: 0,
    date: "",
    event: "",
    type: "feast",
    readings: [],
    verse: "",
    notes: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "solemnity" | "feast" | "memorial" | "season" | "optional">("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [entryToDelete, setEntryToDelete] = useState<CalendarEntry | null>(null);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.readings.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  const openModal = (entry?: CalendarEntry) => {
    if (entry) {
      setFormData(entry);
      setEditingId(entry.id);
    } else {
      setFormData({
        id: Date.now(),
        date: "",
        event: "",
        type: "feast",
        readings: [],
        verse: "",
        notes: "",
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      id: 0,
      date: "",
      event: "",
      type: "feast",
      readings: [],
      verse: "",
      notes: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "readings") {
      setFormData(prev => ({ ...prev, readings: value.split('\n').map(r => r.trim()).filter(r => r) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const saveEntry = () => {
    if (editingId !== null) {
      setEntries(entries.map(e => e.id === editingId ? formData : e));
    } else {
      setEntries([...entries, formData]);
    }
    closeModal();
  };

  const openDeleteModal = (entry: CalendarEntry) => {
    setEntryToDelete(entry);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEntryToDelete(null);
    setDeleteConfirmText("");
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === "DELETE") {
      if (entryToDelete) {
        setEntries(entries.filter(e => e.id !== entryToDelete.id));
      }
      closeDeleteModal();
    } else {
      // Visual feedback
      const input = document.querySelector("input[placeholder='DELETE']") as HTMLInputElement;
      if (input) {
        input.style.borderColor = "#ef4444";
        setTimeout(() => { input.style.borderColor = "#d1d5db"; }, 500);
      }
    }
  };

  const deleteEntry = (id: number) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      openDeleteModal(entry);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "solemnity": return "bg-red-100 text-red-800 border-red-300";
      case "feast": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "memorial": return "bg-green-100 text-green-800 border-green-300";
      case "season": return "bg-blue-100 text-blue-800 border-blue-300";
      case "optional": return "bg-gray-100 text-gray-800 border-gray-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

 

  return (
    <>
     
    
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <CalIcon className="w-8 h-8 text-indigo-600 mr-3" />
              Manage Catholic Calendar 2026
            </h1>
            <p className="text-gray-600 mt-2">Liturgical Year B - Add, edit, and manage feasts, readings, and seasons. Current date: January 06, 2026</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 glass-effect-strong">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events or readings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="all">All Types</option>
                <option value="solemnity">Solemnity</option>
                <option value="feast">Feast</option>
                <option value="memorial">Memorial</option>
                <option value="season">Season</option>
                <option value="optional">Optional</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Showing {filteredEntries.length} of {entries.length} entries
          </p>
        </div>

        {/* Entries Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden glass-effect-strong">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-900">Date</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Event</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Type</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Readings</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Verse</th>
                  <th className="p-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{entry.event}</div>
                      {entry.notes && <div className="text-xs text-gray-500 italic">{entry.notes}</div>}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(entry.type)}`}>
                        {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-700 max-w-xs">
                        {entry.readings.length > 0 ? entry.readings.join(', ') : 'None'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 italic">{entry.verse || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(entry)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105"
                          title="Edit Entry"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-105"
                          title="Delete Entry"
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
          {filteredEntries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CalIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No entries found. Add your first calendar entry above!</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>Note: Populated with key feasts for 2026 (Liturgical Year B). Use the form to add daily readings, seasons, or import from USCCB/Vatican sources.</p>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit" : "Add"} Calendar Entry
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <input
                    type="text"
                    name="event"
                    placeholder="e.g., Epiphany of the Lord"
                    value={formData.event}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="feast">Feast</option>
                    <option value="solemnity">Solemnity</option>
                    <option value="memorial">Memorial</option>
                    <option value="season">Season</option>
                    <option value="optional">Optional Memorial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verse Reference</label>
                  <input
                    type="text"
                    name="verse"
                    placeholder="e.g., Matthew 2:1-12"
                    value={formData.verse || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Readings (one per line)</label>
                <textarea
                  name="readings"
                  placeholder="e.g., Isaiah 60:1-6&#10;Ephesians 3:2-3a, 5-6&#10;Matthew 2:1-12"
                  value={formData.readings.join('\n')}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Optional)</label>
                <textarea
                  name="notes"
                  placeholder="Internal notes..."
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={2}
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEntry}
                  disabled={!formData.date || !formData.event}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <CalIcon className="w-5 h-5" />
                  <span>{editingId ? "Update" : "Add"} Entry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && entryToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full glass-effect-strong">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Entry?</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <strong>&quot;{entryToDelete.event}&quot;</strong> on {new Date(entryToDelete.date).toLocaleDateString()}? This action cannot be undone.
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
                  <span>Delete Entry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}