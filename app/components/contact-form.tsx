"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
    newsletter: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(
        "https://api.stanneschaplaincy.com/api/contact/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(
        "Thank you! Your message has been sent successfully ✅. We will get back to you shortly.",
      );

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        category: "",
        message: "",
        newsletter: false,
      });
    } catch (err) {
      setError("Something went wrong. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First & Last Name */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name *
          </label>
          <input
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name *
          </label>
          <input
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        >
          <option value="">Select a category</option>
          <option value="general">General Inquiry</option>
          <option value="student">Student Services</option>
          <option value="events">Events & Activities</option>
          <option value="groups">Groups & Movements</option>
          <option value="spiritual">Spiritual Guidance</option>
          <option value="donations">Donations & Support</option>
          <option value="partnerships">Partnerships</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us how we can help you..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
        />
      </div>

      {/* Newsletter Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label
          htmlFor="newsletter"
          className="ml-2 block text-sm text-gray-700 cursor-pointer"
        >
          Subscribe to our newsletter for updates and events
        </label>
      </div>

      {/* Status Messages */}
      {success && (
        <p className="text-green-600 bg-green-50 p-3 rounded-lg text-center font-medium">
          {success}
        </p>
      )}
      {error && (
        <p className="text-red-600 bg-red-50 p-3 rounded-lg text-center font-medium">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5 mr-2" />
        {loading ? "Sending your message..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
