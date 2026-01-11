// app/admin/theme/page.tsx
"use client";

import { useState } from "react";
import { Upload, Archive, Download, Edit3, Trash2, Plus, Eye, Calendar, Search } from "lucide-react";
import Image from "next/image";
import ConfettiBurst from "@/app/components/confetti-burst"; // Assume this exists from frontend
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"; // Assume this exists

// Enhanced Theme interface
interface Theme {
  id: number;
  text: string;
  image: string; // URL or blob
  year: string; // e.g., "2024/2025 - Semester 2"
  isActive: boolean;
  dateCreated: string;
}

// Mock initial data
const initialCurrentTheme: Theme = {
  id: 1,
  text: "GUIDE US, OH HOLY SPIRIT, TO TRUST IN GOD'S LOVE AND PROMISES, EMBRACING OUR ROLE AS PILGRIMS OF HOPE THROUGH SIMPLE ACTS OF LOVE",
  image: "/images/Frame 3 (1)_page-0001.jpg",
  year: "2024/2025 - Semester 2",
  isActive: true,
  dateCreated: "2025-12-01",
};

const initialArchivedThemes: Theme[] = [
  {
    id: 2,
    text: "PREVIOUS THEME TEXT FOR SEMESTER 1",
    image: "/images/previous-theme.jpg",
    year: "2024/2025 - Semester 1",
    isActive: false,
    dateCreated: "2025-08-01",
  },
  // Add more as needed
];

export default function ManageTheme() {
  const { elementRef: themeRef, isTriggered: themeConfettiTriggered } = useScrollTrigger(0.3, false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialCurrentTheme);
  const [archivedThemes, setArchivedThemes] = useState<Theme[]>(initialArchivedThemes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Theme>({
    id: 0,
    text: "",
    image: "",
    year: "",
    isActive: false,
    dateCreated: new Date().toISOString().split('T')[0],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [themeToDelete, setThemeToDelete] = useState<Theme | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredArchived = archivedThemes.filter(theme =>
    theme.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (theme?: Theme) => {
    if (theme) {
      setFormData(theme);
      setEditingId(theme.id);
    } else {
      setFormData({
        id: Date.now(),
        text: "",
        image: "",
        year: `${new Date().getFullYear()}/${new Date().getFullYear() + 1} - Semester 2`,
        isActive: false,
        dateCreated: new Date().toISOString().split('T')[0],
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
      text: "",
      image: "",
      year: "",
      isActive: false,
      dateCreated: "",
    });
    setPreviewImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const saveTheme = () => {
    if (!formData.text || !formData.image || !formData.year) return;

    const updatedTheme = { ...formData, dateCreated: new Date().toISOString().split('T')[0] };

    if (editingId) {
      if (editingId === currentTheme.id) {
        setCurrentTheme(updatedTheme);
      } else {
        setArchivedThemes(archivedThemes.map(t => t.id === editingId ? updatedTheme : t));
      }
    } else {
      // New theme becomes active
      setCurrentTheme(updatedTheme);
      setArchivedThemes(prev => [updatedTheme, ...prev]);
    }

    if (editingId && editingId !== currentTheme.id) {
      // If editing archived, update archived
      setArchivedThemes(prev => prev.map(t => t.id === editingId ? updatedTheme : t));
    }

    closeModal();
  };

  const archiveCurrentTheme = () => {
    if (confirm("Archive the current theme? It will be moved to archived list.")) {
      setArchivedThemes(prev => [currentTheme, ...prev]);
      // Load previous or prompt for new - for now, just archive
      openModal();
    }
  };

  const downloadTheme = (theme: Theme) => {
    // Simulate download - in production, create blob or link
    const link = document.createElement("a");
    link.href = theme.image;
    link.download = `st-annes-theme-${theme.year.replace(/\//g, '-')}.jpg`;
    link.click();
  };

  const openDeleteModal = (theme: Theme) => {
    setThemeToDelete(theme);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setThemeToDelete(null);
    setDeleteConfirmText("");
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === "DELETE") {
      if (themeToDelete) {
        if (themeToDelete.id === currentTheme.id) {
          alert("Cannot delete active theme. Archive it first.");
          closeDeleteModal();
          return;
        }
        setArchivedThemes(archivedThemes.filter(t => t.id !== themeToDelete.id));
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

  const deleteTheme = (id: number) => {
    const theme = archivedThemes.find(t => t.id === id);
    if (theme) {
      openDeleteModal(theme);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 min-h-screen" ref={themeRef}>
      <ConfettiBurst trigger={themeConfettiTriggered} duration={4000} />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-8 h-8 text-emerald-600 mr-3" />
              Manage Semester Theme
            </h1>
            <p className="text-gray-600 mt-2">Update and archive themes for the academic year</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              Active: {currentTheme.year}
            </span>
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Theme</span>
            </button>
          </div>
        </div>

        {/* Current Theme Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 glass-effect-strong relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Eye className="w-6 h-6 text-emerald-600 mr-2" />
                Current Active Theme
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={archiveCurrentTheme}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Archive className="w-4 h-4" />
                  <span>Archive</span>
                </button>
                <button
                  onClick={() => downloadTheme(currentTheme)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => openModal(currentTheme)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 text-lg leading-relaxed mb-4 whitespace-pre-wrap">{currentTheme.text}</p>
                <p className="text-sm text-gray-500 mb-4">Year: <span className="font-semibold text-gray-900">{currentTheme.year}</span></p>
                <p className="text-sm text-gray-500">Created: {new Date(currentTheme.dateCreated).toLocaleDateString()}</p>
              </div>
              <div className="relative">
                <Image
                  src={currentTheme.image}
                  alt="Current Theme Banner"
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Archived Themes Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 glass-effect-strong">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Archive className="w-5 h-5 text-gray-600 mr-2" />
              Archived Themes
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search archived themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">Showing {filteredArchived.length} of {archivedThemes.length} archived themes</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchived.map((theme) => (
              <div
                key={theme.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <Image
                    src={theme.image}
                    alt={`Archived Theme ${theme.year}`}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => downloadTheme(theme)}
                      className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                      title="Download"
                    >
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                    <button
                      onClick={() => openModal(theme)}
                      className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3 h-3 text-blue-600" />
                    </button>
                    <button
                      onClick={() => deleteTheme(theme.id)}
                      className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-3">{theme.text}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{theme.year}</span>
                  <span>{new Date(theme.dateCreated).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          {filteredArchived.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No archived themes yet. Archive the current theme to start!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Theme Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit" : "New"} Semester Theme
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year & Semester *</label>
                <input
                  type="text"
                  name="year"
                  placeholder="e.g., 2024/2025 - Semester 2"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme Text *</label>
                <textarea
                  name="text"
                  placeholder="Enter the inspirational theme text..."
                  value={formData.text}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme Banner Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  required={!editingId}
                />
                {previewImage && (
                  <div className="mt-4">
                    <Image
                      src={previewImage}
                      alt="Theme Preview"
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                {formData.image && !previewImage && editingId && (
                  <div className="mt-4">
                    <Image
                      src={formData.image}
                      alt="Current Theme"
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTheme}
                  disabled={!formData.text || !formData.year || (!editingId && !previewImage)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{editingId ? "Update" : "Create"} Theme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && themeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full glass-effect-strong">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Archived Theme?</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete the theme for <strong>{themeToDelete.year}</strong>? This action cannot be undone.
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
                  <span>Delete Theme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}