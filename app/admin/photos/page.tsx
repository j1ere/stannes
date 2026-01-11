// app/admin/photos/page.tsx
"use client";

import { useState } from "react";
import { Upload, Trash2, Image as ImgIcon, Plus } from "lucide-react";
import Image from "next/image";

// Enhanced Photo interface
interface Photo {
  id: number;
  title: string;
  category: string; // e.g., "mass", "events", "community", "charity", "recreation"
  src: string; // Image URL or blob
  date?: string; // Optional date added for completeness
  location?: string; // Optional location
}

// Mock initial data expanded from provided code
const initialPhotos: Photo[] = [
  {
    id: 1,
    title: "Sunday Mass Celebration",
    category: "mass",
    src: "/images/img1.jpeg",
    date: "2026-01-15",
    location: "Main Chapel",
  },
  {
    id: 2,
    title: "Charity Visit - Children's Home",
    category: "charity",
    src: "/images/img2.jpeg",
    date: "2026-01-10",
    location: "Local Children's Home",
  },
  {
    id: 3,
    title: "CSA Hike Adventure",
    category: "recreation",
    src: "/images/img3.jpeg",
    date: "2026-01-08",
    location: "Kakamega Hills",
  },
  {
    id: 4,
    title: "Cultural Week Celebration",
    category: "events",
    src: "/images/img4.jpeg",
    date: "2026-01-05",
    location: "University Campus",
  },
  {
    id: 5,
    title: "Prayer House Fellowship",
    category: "community",
    src: "/images/img1.jpeg",
    date: "2026-01-03",
    location: "St. Joseph Prayer House",
  },
  // Add more as needed
];

export default function ManagePhotos() {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "", file: null as File | null, date: "", location: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);

  const addPhoto = () => {
    if (newPhoto.file && newPhoto.title && newPhoto.category) {
      const src = URL.createObjectURL(newPhoto.file);
      setPhotos([
        ...photos,
        {
          id: Date.now(),
          title: newPhoto.title,
          category: newPhoto.category,
          src,
          date: newPhoto.date,
          location: newPhoto.location,
        },
      ]);
      setNewPhoto({ title: "", category: "", file: null, date: "", location: "" });
    }
  };

  const openDeleteModal = (photo: Photo) => {
    setPhotoToDelete(photo);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPhotoToDelete(null);
    setDeleteConfirmText("");
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === "DELETE") {
      if (photoToDelete) {
        setPhotos(photos.filter(p => p.id !== photoToDelete.id));
      }
      closeDeleteModal();
    } else {
      // Optional: show error message or shake animation
      const input = document.querySelector("input[placeholder='DELETE']") as HTMLInputElement;
      if (input) {
        input.style.borderColor = "#ef4444";
        setTimeout(() => {
          input.style.borderColor = "#d1d5db";
        }, 500);
      }
    }
  };

  const deletePhoto = (id: number) => {
    const photo = photos.find(p => p.id === id);
    if (photo) {
      openDeleteModal(photo);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ImgIcon className="w-8 h-8 text-blue-600 mr-3" />
              Manage Captured Moments
            </h1>
            <p className="text-gray-600 mt-2">Upload, organize, and manage photos from our community events</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 glass-effect-strong">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Plus className="w-5 h-5 text-green-600 mr-2" />
            Upload New Photo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                placeholder="Enter photo title"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={newPhoto.category}
                onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select Category</option>
                <option value="mass">Mass & Liturgy</option>
                <option value="events">Events</option>
                <option value="community">Community Life</option>
                <option value="charity">Charity Work</option>
                <option value="recreation">Recreation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date (Optional)</label>
              <input
                type="date"
                value={newPhoto.date}
                onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
              <input
                placeholder="e.g., Main Chapel"
                value={newPhoto.location}
                onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo File *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhoto({ ...newPhoto, file: e.target.files?.[0] || null })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={addPhoto}
              disabled={!newPhoto.title || !newPhoto.category || !newPhoto.file}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Photo</span>
            </button>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 glass-effect"
            >
              <div className="relative group">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{photo.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{photo.category.toUpperCase()}</p>
                {photo.date && photo.location && (
                  <div className="text-xs text-gray-500 space-y-1 mb-3">
                    <div>{photo.date}</div>
                    <div>{photo.location}</div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{photo.category}</span>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && photoToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full glass-effect-strong">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Photo?</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <strong>&quot;{photoToDelete.title}&quot;</strong>? This action cannot be undone.
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
                  <span>Delete Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}