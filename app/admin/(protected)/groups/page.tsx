"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Users,
  Clock,
  MapPin,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { getCSRFToken } from "@/app/lib/csrf";

interface Group {
  id: number;
  name: string;
  type: string;
  slug: string;
  members: string;
  meeting_time: string;
  meeting_location: string;
  communities: string[];
  chair: string;
  treasurer: string;
  secretary: string;
  about: string;
  images: string[];
}

const API_BASE = "https://api.stanneschaplaincy.com/api/groups/admin/groups/";

const TYPE_CHOICES = ["Prayer House", "Movement", "Year Group", "Other"];

export default function ManageGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Prayer House", // Default to first choice
    members: "",
    meeting_time: "",
    meeting_location: "",
    communities: "",
    chair: "",
    treasurer: "",
    secretary: "",
    about: "",
    images: [] as File[],
  });

  // Fetch groups
  const fetchGroups = async () => {
    try {
      const res = await fetch(API_BASE, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 403) {
          alert(
            "Access forbidden. Please make sure you are logged in as admin.",
          );
        }
        throw new Error("Failed to fetch");
      }
      const data = await res.json();

      const IMAGE_URL = "https://api.stanneschaplaincy.com";

      const normalized = data.map((group: any) => ({
        ...group,
        communities: Array.isArray(group.communities)
          ? group.communities
          : typeof group.communities === "string"
            ? group.communities
                .split(",")
                .map((c: string) => c.trim())
                .filter(Boolean)
            : [],

        images: group.images?.map((img: any) => img.image) || [],
      }));

      setGroups(normalized);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCSRFToken().catch(console.error);
    fetchGroups();
  }, []);

  const openModal = (group?: Group) => {
    if (group) {
      setFormData({
        name: group.name,
        type: group.type || "Prayer House",
        members: group.members,
        meeting_time: group.meeting_time,
        meeting_location: group.meeting_location,
        communities: "",
        chair: group.chair || "",
        treasurer: group.treasurer || "",
        secretary: group.secretary || "",
        about: group.about || "",
        images: [],
      });
      setEditingId(group.id);
    } else {
      setFormData({
        name: "",
        type: "Prayer House",
        members: "",
        meeting_time: "",
        meeting_location: "",
        communities: "",
        chair: "",
        treasurer: "",
        secretary: "",
        about: "",
        images: [],
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeNewImage = (index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const saveGroup = async () => {
    setSubmitting(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("type", formData.type);
    form.append("members", formData.members);
    form.append("meeting_time", formData.meeting_time);
    form.append("meeting_location", formData.meeting_location);
    form.append(
      "communities",
      formData.communities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .join(","),
    );
    form.append("chair", formData.chair);
    form.append("treasurer", formData.treasurer);
    form.append("secretary", formData.secretary);
    form.append("about", formData.about);

    formData.images.forEach((file) => form.append("images", file));

    try {
      const csrfToken = await getCSRFToken();

      const url = editingId ? `${API_BASE}${editingId}/` : API_BASE;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: form,
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      if (res.ok) {
        alert(
          editingId
            ? "Group updated successfully!"
            : "Group created successfully!",
        );
        closeModal();
        fetchGroups();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(
          `Error: ${errorData.detail || errorData.error || "Failed to save group"}`,
        );
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteGroup = async (id: number) => {
    if (!confirm("Delete this group permanently?")) return;

    const csrfToken = await getCSRFToken();

    try {
      const res = await fetch(`${API_BASE}${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-CSRFToken": csrfToken },
      });

      if (res.ok) {
        alert("Group deleted successfully");
        fetchGroups();
      } else {
        alert("Failed to delete group");
      }
    } catch (error) {
      alert("Error deleting group");
    }
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

  const confirmDelete = async () => {
    if (deleteConfirmText.toUpperCase() !== "DELETE") {
      alert("You must type 'DELETE' exactly to proceed.");
      return;
    }

    if (!groupToDelete) return;

    try {
      const csrfToken = await getCSRFToken();

      const res = await fetch(`${API_BASE}${groupToDelete.id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-CSRFToken": csrfToken },
      });

      if (res.ok) {
        alert("Group deleted successfully");
        // remove from local state
        setGroups(groups.filter((g) => g.id !== groupToDelete.id));
        closeDeleteModal();
      } else {
        alert("Failed to delete group");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting group");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading groups...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-amber-50 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              Manage Groups
            </h1>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage prayer houses, movements, and year groups
            </p>
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
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {group.name}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(group)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(group)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-2">
                      Type:
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {group.type}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span>{group.members} Members</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    <span>{group.meeting_time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                    <span>{group.meeting_location}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {group.about}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {group.images?.slice(0, 3).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt="gallery"
                      width={80}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  ))}
                  {group.images?.length > 3 && (
                    <div className="bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                      +{group.images.length - 3}
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    Communities:{" "}
                    {Array.isArray(group.communities)
                      ? group.communities.join(", ")
                      : group.communities}
                  </div>
                  <div>Chair: {group.chair}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== ADD / EDIT MODAL ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit" : "Add"} Group
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="name"
                  placeholder="Group Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />

                {/* Type as Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {TYPE_CHOICES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  name="members"
                  placeholder="Members (e.g., 80+)"
                  value={formData.members}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  name="meeting_time"
                  placeholder="Meeting Time"
                  value={formData.meeting_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  name="meeting_location"
                  placeholder="Meeting Location"
                  value={formData.meeting_location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Improved Communities Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communities (comma-separated)
                </label>
                <textarea
                  name="communities"
                  value={formData.communities}
                  onChange={handleInputChange}
                  placeholder="St. Francis, St. Charity, St. Rita, St. Dominic"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono"
                  rows={3}
                  spellCheck={false}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Type normally and use comma to separate
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chair
                  </label>
                  <input
                    name="chair"
                    value={formData.chair}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treasurer
                  </label>
                  <input
                    name="treasurer"
                    value={formData.treasurer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secretary
                  </label>
                  <input
                    name="secretary"
                    value={formData.secretary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About the Group
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery (Up to 6 Photos)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />

                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
                  {formData.images.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width={100}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <button
                        onClick={() => removeNewImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveGroup}
                  disabled={submitting || !formData.name}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  {submitting
                    ? "Saving..."
                    : editingId
                      ? "Update Group"
                      : "Create Group"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - unchanged */}
      {isDeleteModalOpen && groupToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full ">
            <div className="p-6 space-y-4">
              <div className="text-center">
                <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Group?
                </h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete{" "}
                  <strong>&quot;{groupToDelete.name}&quot;</strong>? This action
                  cannot be undone.
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
