// app/admin/theme/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Archive,
  Download,
  Edit3,
  Trash2,
  Plus,
  Eye,
  Calendar,
  Search,
} from "lucide-react";
import Image from "next/image";
import ConfettiBurst from "@/app/components/confetti-burst";
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger";

interface Theme {
  id: number;
  text: string;
  image: string; // image_url from backend
  year: string;
  isActive: boolean;
  dateCreated: string;
}

const API_BASE = "https://chaplaincyb.onrender.com/api/theme/themes/";

export default function ManageTheme() {
  const { elementRef: themeRef, isTriggered: themeConfettiTriggered } =
    useScrollTrigger(0.3, false);

  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [archivedThemes, setArchivedThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    year: "",
    image: null as File | null,
    is_active: false,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [themeToDelete, setThemeToDelete] = useState<Theme | null>(null);

  // CSRF Token
  const getCSRFToken = async (): Promise<string> => {
    const res = await fetch("https://chaplaincyb.onrender.com/auth/csrf/", {
      credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
  };

  // Fetch themes
  const fetchThemes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_BASE, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();

        const activeTheme = data.find((t: any) => t.is_active);
        const archived = data.filter((t: any) => !t.is_active);

        if (activeTheme) {
          setCurrentTheme({
            id: activeTheme.id,
            text: activeTheme.text,
            image: activeTheme.image_url || "",
            year: activeTheme.year,
            isActive: true,
            dateCreated: activeTheme.date_created,
          });
        } else {
          setCurrentTheme(null);
        }

        setArchivedThemes(
          archived.map((t: any) => ({
            id: t.id,
            text: t.text,
            image: t.image_url || "",
            year: t.year,
            isActive: false,
            dateCreated: t.date_created,
          })),
        );
      }
    } catch (error) {
      console.error("Failed to fetch themes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const filteredArchived = archivedThemes.filter(
    (theme) =>
      theme.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theme.year.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Save Theme (Create or Update)
  const saveTheme = async () => {
    if (!formData.text || !formData.year) return;

    try {
      const csrfToken = await getCSRFToken();
      const form = new FormData();
      form.append("text", formData.text);
      form.append("year", formData.year);
      form.append("is_active", String(formData.is_active));
      if (formData.image) form.append("image", formData.image);

      const url = editingId ? `${API_BASE}${editingId}/` : API_BASE;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "X-CSRFToken": csrfToken },
        body: form,
      });

      //   if (res.ok) {
      //     fetchThemes();
      //     closeModal();
      //   } else {
      //     alert("Failed to save theme");
      //   }
      // } catch (error) {
      //   console.error("Save error:", error);
      //   alert("Error occurred while saving theme");
      // }
      if (res.ok) {
        fetchThemes();
        closeModal();
      } else {
        const err = await res.json();
        console.log("ERROR:", err);
        alert(JSON.stringify(err));
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error occurred while saving theme");
    }
  };

  const downloadTheme = (theme: Theme) => {
    const link = document.createElement("a");
    link.href = theme.image;
    link.download = `st-annes-theme-${theme.year.replace(/\//g, "-")}.jpg`;
    link.click();
  };

  const openModal = (theme?: Theme) => {
    if (theme) {
      setEditingId(theme.id);
      setFormData({
        text: theme.text,
        year: theme.year,
        image: null,
        is_active: theme.isActive,
      });
      setPreviewImage(theme.image);
    } else {
      setEditingId(null);
      setFormData({
        text: "",
        year: `${new Date().getFullYear()}/${new Date().getFullYear() + 1} - Semester 2`,
        image: null,
        is_active: false,
      });
      setPreviewImage(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ text: "", year: "", image: null, is_active: false });
    setPreviewImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Delete archived theme only
  const confirmDelete = async () => {
    if (deleteConfirmText.toUpperCase() !== "DELETE" || !themeToDelete) return;

    try {
      const csrfToken = await getCSRFToken();
      const res = await fetch(`${API_BASE}${themeToDelete.id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-CSRFToken": csrfToken },
      });

      if (res.ok) {
        fetchThemes();
        closeDeleteModal();
      } else {
        alert("Failed to delete theme");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openDeleteModal = (theme: Theme) => {
    if (theme.isActive) {
      alert("Cannot delete the active theme. Please archive it first.");
      return;
    }
    setThemeToDelete(theme);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setThemeToDelete(null);
    setDeleteConfirmText("");
  };

  const deleteTheme = (id: number) => {
    const theme = archivedThemes.find((t) => t.id === id);
    if (theme) openDeleteModal(theme);
  };

  const activateTheme = async (theme: Theme) => {
    if (!confirm(`Make ${theme.year} the active theme?`)) return;

    try {
      const csrfToken = await getCSRFToken();

      const form = new FormData();
      form.append("is_active", "true");

      const res = await fetch(`${API_BASE}${theme.id}/`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: form,
      });

      if (res.ok) {
        fetchThemes();
      } else {
        alert("Failed to activate theme");
      }
    } catch (error) {
      console.error("Activate error:", error);
    }
  };

  const archiveCurrentTheme = async () => {
    if (!currentTheme || !confirm("Archive the current theme?")) return;

    try {
      const csrfToken = await getCSRFToken();

      const form = new FormData();
      form.append("is_active", "false");

      const res = await fetch(`${API_BASE}${currentTheme.id}/`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: form,
      });

      if (res.ok) {
        fetchThemes();
        openModal();
      }
    } catch (error) {
      console.error("Archive error:", error);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading themes...</div>;
  }

  return (
    <div
      className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 min-h-screen pt-16"
      ref={themeRef}
    >
      <ConfettiBurst trigger={themeConfettiTriggered} duration={4000} />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-8 h-8 text-emerald-600 mr-3" />
              Manage Semester Theme
            </h1>
            <p className="text-gray-600 mt-2">
              Update and archive themes for the academic year
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              Active: {currentTheme?.year || "None"}
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
        {currentTheme && (
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
                  <p className="text-gray-700 text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                    {currentTheme.text}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Year:{" "}
                    <span className="font-semibold text-gray-900">
                      {currentTheme.year}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Created:{" "}
                    {new Date(currentTheme.dateCreated).toLocaleDateString()}
                  </p>
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
        )}

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
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredArchived.length} of {archivedThemes.length}{" "}
            archived themes
          </p>
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
                      onClick={() => activateTheme(theme)}
                      className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                      title="Set Active"
                    >
                      <Eye className="w-3 h-3 text-emerald-600" />
                    </button>
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
                <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-3">
                  {theme.text}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{theme.year}</span>
                  <span>
                    {new Date(theme.dateCreated).toLocaleDateString()}
                  </span>
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

      {/* Add/Edit Theme Modal - UI Unchanged */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-effect-strong">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit" : "New"} Semester Theme
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year & Semester *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Text *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Banner Image {editingId ? "(Optional)" : "*"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
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
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                  />
                  <span>Set as Active Theme</span>
                </label>
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
                  disabled={!formData.text || !formData.year}
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

      {/* Delete Confirmation Modal - Unchanged */}
      {isDeleteModalOpen && themeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full ">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Archived Theme?
                </h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete the theme for{" "}
                  <strong>{themeToDelete.year}</strong>? This action cannot be
                  undone.
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
