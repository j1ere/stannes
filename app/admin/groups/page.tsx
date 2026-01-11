// app/admin/groups/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2, Users, Clock, MapPin, Image as ImgIcon, User, Upload } from "lucide-react";
import Image from "next/image";

// Enhanced Group interface
interface Group {
  id: number;
  name: string;
  type: string; // e.g., "Prayer House", "Movement", "Year Group"
  slug: string;
  members: string; // e.g., "80+"
  meetingTime: string; // e.g., "Saturdays at 7 PM"
  meetingLocation: string; // e.g., "Augustine Hall"
  communities: string[]; // Array of community names
  leadership: {
    chair: string;
    treasurer: string;
    secretary: string;
  };
  about: string; // Description
  gallery: string[]; // Array of up to 6 image URLs (for demo, use placeholders or uploaded)
}

// Mock initial data expanded from provided code
const initialGroups: Group[] = [
  {
    id: 1,
    name: "St. Augustine",
    type: "Prayer House",
    slug: "st-augustine",
    members: "80+",
    meetingTime: "Saturdays at 7 PM",
    meetingLocation: "Augustine Hall",
    communities: ["St. Francis", "St. Charity", "St. Rita"],
    leadership: { chair: "Maria Gonzalez", treasurer: "Johnathan Lee", secretary: "Anna Patel" },
    about: "Inspired by the life and writings of St. Augustine of Hippo, this prayer house focuses on intellectual and spiritual growth through contemplative prayer, scripture study, and community dialogue.",
    gallery: ["/images/img1.jpeg", "/images/img2.jpeg", "/images/img3.jpeg", "/images/img4.jpeg", "/images/img1.jpeg", "/images/img2.jpeg"],
  },
  {
    id: 2,
    name: "St. Rose",
    type: "Prayer House",
    slug: "st-rose",
    members: "75+",
    meetingTime: "Saturdays at 7 PM",
    meetingLocation: "Rose Chapel",
    communities: ["St. Christopher", "St. George", "St. Josephine Bhakita"],
    leadership: { chair: "Sofia Ramirez", treasurer: "David Kim", secretary: "Elena Torres" },
    about: "Named after St. Rose of Lima, this house emphasizes service, humility, and devotion, gathering for intercessory prayer and acts of charity within the community.",
    gallery: ["/images/img1.jpeg", "/images/img2.jpeg", "/images/img3.jpeg", "/images/img4.jpeg", "/images/img1.jpeg", "/images/img3.jpeg"],
  },
  // Add more as needed
];

export default function ManageGroups() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Group>({
    id: 0,
    name: "",
    type: "",
    slug: "",
    members: "",
    meetingTime: "",
    meetingLocation: "",
    communities: [],
    leadership: { chair: "", treasurer: "", secretary: "" },
    about: "",
    gallery: [],
  });

  const openModal = (group?: Group) => {
    if (group) {
      setFormData(group);
      setEditingId(group.id);
    } else {
      setFormData({
        id: Date.now(),
        name: "",
        type: "",
        slug: "",
        members: "",
        meetingTime: "",
        meetingLocation: "",
        communities: [],
        leadership: { chair: "", treasurer: "", secretary: "" },
        about: "",
        gallery: [],
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
      name: "",
      type: "",
      slug: "",
      members: "",
      meetingTime: "",
      meetingLocation: "",
      communities: [],
      leadership: { chair: "", treasurer: "", secretary: "" },
      about: "",
      gallery: [],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("leadership.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        leadership: { ...prev.leadership, [key]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCommunitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const communities = e.target.value.split(",").map(c => c.trim()).filter(c => c);
    setFormData(prev => ({ ...prev, communities }));
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 6 - formData.gallery.length).map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => {
      const newGallery = [...prev.gallery];
      newGallery.splice(index, 1);
      return { ...prev, gallery: newGallery };
    });
  };

  const saveGroup = () => {
    if (editingId) {
      setGroups(groups.map(g => g.id === editingId ? formData : g));
    } else {
      setGroups([...groups, formData]);
    }
    closeModal();
  };

  const openDeleteModal = (group: Group) => {
    setGroupToDelete(group);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setGroupToDelete(null);
    setDeleteConfirmText("");
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === "DELETE") {
      if (groupToDelete) {
        setGroups(groups.filter(g => g.id !== groupToDelete.id));
      }
      closeDeleteModal();
    } else {
      alert("You must type 'DELETE' exactly to proceed.");
    }
  };

  const deleteGroup = (id: number) => {
    const group = groups.find(g => g.id === id);
    if (group) {
      openDeleteModal(group);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              Manage Groups
            </h1>
            <p className="text-gray-600 mt-2">Create, edit, and manage prayer houses, movements, and year groups</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Group</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200 glass-effect"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(group)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-2">Type:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{group.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span>{group.members} Members</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    <span>{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                    <span>{group.meetingLocation}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{group.about}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {group.gallery.slice(0, 3).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`${group.name} gallery ${idx + 1}`}
                      width={80}
                      height={60}
                      className="rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ))}
                  {group.gallery.length > 3 && (
                    <div className="bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">+{group.gallery.length - 3}</div>
                  )}
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Communities: {group.communities.join(", ")}</div>
                  <div>Chair: {group.leadership.chair}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit" : "Add"} Group
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="name"
                  placeholder="Group Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <input
                  name="type"
                  placeholder="Type (e.g., Prayer House)"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  name="slug"
                  placeholder="Slug (URL-friendly)"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  name="members"
                  placeholder="Members (e.g., 80+)"
                  value={formData.members}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  name="meetingTime"
                  placeholder="Meeting Time (e.g., Saturdays at 7 PM)"
                  value={formData.meetingTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  name="meetingLocation"
                  placeholder="Meeting Location"
                  value={formData.meetingLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Communities (comma-separated)</label>
                <textarea
                  placeholder="e.g., St. Francis, St. Charity, St. Rita"
                  value={formData.communities.join(", ")}
                  onChange={handleCommunitiesChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chair</label>
                  <input
                    name="leadership.chair"
                    placeholder="Chair Name"
                    value={formData.leadership.chair}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Treasurer</label>
                  <input
                    name="leadership.treasurer"
                    placeholder="Treasurer Name"
                    value={formData.leadership.treasurer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secretary</label>
                  <input
                    name="leadership.secretary"
                    placeholder="Secretary Name"
                    value={formData.leadership.secretary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About the Group</label>
                <textarea
                  name="about"
                  placeholder="Description of the group..."
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery (Up to 6 Photos)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
                  {formData.gallery.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        width={100}
                        height={80}
                        className="rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <button
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {formData.gallery.length >= 6 && <p className="text-sm text-orange-600 mt-2">Maximum 6 photos reached.</p>}
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveGroup}
                  disabled={!formData.name || formData.gallery.length > 6}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{editingId ? "Update" : "Create"} Group</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && groupToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full glass-effect-strong">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Group?</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <strong>&quot;{groupToDelete.name}&quot;</strong>? This action cannot be undone.
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
                  <span>Delete Group</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}