"use client";

import { useEffect, useState } from "react";
import { FileText, File, Search, X } from "lucide-react";

interface PrayerItem {
  id: number;
  name: string;
  content: string;
}

export default function TraditionalPrayersSection() {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<PrayerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerItem | null>(null);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const res = await fetch(
          "https://chaplaincyb.onrender.com/api/calendar/prayers/",
        );
        if (!res.ok) throw new Error("Failed to fetch prayers");
        const data = await res.json();
        setPrayers(data);
        setFilteredPrayers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrayers();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = prayers.filter((prayer) =>
      prayer.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredPrayers(filtered);
  }, [searchTerm, prayers]);

  const openPrayer = (prayer: PrayerItem) => {
    setSelectedPrayer(prayer);
  };

  const closeModal = () => {
    setSelectedPrayer(null);
  };

  const handleDownload = async (prayerName: string, type: "txt" | "pdf") => {
    const downloadParam = type === "pdf" ? "pdf" : "true";
    const fileExtension = type === "pdf" ? ".pdf" : ".txt";

    try {
      const res = await fetch(
        `https://chaplaincyb.onrender.com/api/calendar/prayers/${encodeURIComponent(prayerName)}?download=${downloadParam}`,
      );

      if (!res.ok) {
        alert("Prayer not found");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${prayerName.replace(/ /g, "_").toLowerCase()}${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error downloading prayer");
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Traditional Catholic Prayers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            🙏 Spiritual Resources
          </div>
          <h3 className="text-5xl font-bold text-gray-900 tracking-tight">
            Traditional Catholic Prayers
          </h3>
          {/* <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Timeless prayers for personal devotion, family prayer, and communal worship
          </p> */}
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prayers... (e.g. Hail Mary, Our Father)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Prayer Grid */}
        {filteredPrayers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No prayers found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrayers.map((prayer) => (
              <div
                key={prayer.id}
                onClick={() => openPrayer(prayer)}
                className="group bg-white border border-gray-100 rounded-3xl p-8 hover:border-amber-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                      {prayer.name}
                    </h3>
                    <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                      🙏
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-4 text-[15px] leading-relaxed">
                    {prayer.content.substring(0, 180)}...
                  </p>
                </div>

                <div className="pt-8 mt-auto flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(prayer.name, "txt");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-medium transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    TXT
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(prayer.name, "pdf");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-2xl text-sm font-medium transition-colors"
                  >
                    <File className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ====================== IMPROVED PRAYER MODAL ====================== */}
      {selectedPrayer && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-0 md:p-4">
          <div className="bg-white w-full md:max-w-2xl md:rounded-none h-screen md:h-auto md:max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header - More compact */}
            <div className="px-6 py-5 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 pr-4 line-clamp-2">
                {selectedPrayer.name}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Prayer Content - Takes maximum space */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-[17px] md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {selectedPrayer.content}
            </div>

            {/* Download Buttons - Compact & Mobile Optimized */}
            <div className="p-5 md:p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleDownload(selectedPrayer.name, "txt")}
                className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 py-3.5 rounded-xl font-medium text-gray-700 transition-all text-base"
              >
                <FileText className="w-5 h-5" />
                Download TXT
              </button>
              <button
                onClick={() => handleDownload(selectedPrayer.name, "pdf")}
                className="flex-1 flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white py-3.5 rounded-xl font-medium transition-all text-base"
              >
                <File className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
