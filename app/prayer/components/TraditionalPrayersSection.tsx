"use client";

import { useEffect, useState } from "react";
import { FileText, File, Search, X, Download } from "lucide-react";

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
  const [downloading, setDownloading] = useState<string | null>(null);

  // Fetch all prayers
  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const res = await fetch(
          "https://api.stanneschaplaincy.com/api/calendar/prayers/",
          { cache: "force-cache" } // optional: good for static prayers
        );

        if (!res.ok) throw new Error("Failed to fetch prayers");
        
        const data = await res.json();
        // DRF ViewSet list returns array directly
        setPrayers(Array.isArray(data) ? data : []);
        setFilteredPrayers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching prayers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  // Search
  useEffect(() => {
    const filtered = prayers.filter((prayer) =>
      prayer.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    const isPdf = type === "pdf";
    const downloadParam = isPdf ? "pdf" : "true";
    const fileExtension = isPdf ? ".pdf" : ".txt";

    setDownloading(prayerName);

    try {
      const url = `https://api.stanneschaplaincy.com/api/calendar/prayers/download/${encodeURIComponent(
        prayerName
      )}/?download=${downloadParam}`;

      const res = await fetch(url);

      if (!res.ok) {
        alert("Prayer not found or download failed.");
        return;
      }

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${prayerName.replace(/ /g, "_").toLowerCase()}${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error(err);
      alert("Error downloading the prayer. Please try again.");
    } finally {
      setDownloading(null);
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
              <div key={i} className="bg-white rounded-3xl p-8 animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-4/5 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </div>
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
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-5 py-2 rounded-full text-sm font-medium mb-4">
            🙏 Timeless Devotion
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Traditional Catholic Prayers
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Beautiful prayers for personal prayer, family, and liturgy
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prayers... (Hail Mary, Our Father, etc.)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-amber-500 text-lg shadow-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Grid */}
        {filteredPrayers.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-xl">No prayers found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrayers.map((prayer) => (
              <div
                key={prayer.id}
                onClick={() => openPrayer(prayer)}
                className="group bg-white border border-gray-100 rounded-3xl p-8 hover:border-amber-300 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {prayer.name}
                    </h3>
                    <div className="text-5xl opacity-10 group-hover:opacity-30 transition-opacity">🙏</div>
                  </div>

                  <p className="text-gray-600 line-clamp-5 text-[15.5px] leading-relaxed">
                    {prayer.content.substring(0, 220)}...
                  </p>
                </div>

                <div className="pt-8 mt-auto flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(prayer.name, "txt");
                    }}
                    disabled={downloading === prayer.name}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 py-3.5 rounded-2xl text-sm font-medium transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    TXT
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(prayer.name, "pdf");
                    }}
                    disabled={downloading === prayer.name}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3.5 rounded-2xl text-sm font-medium transition-colors"
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

      {/* Prayer Modal */}
      {selectedPrayer && (
        <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-0 md:p-6">
          <div className="bg-white w-full md:max-w-2xl md:rounded-3xl h-screen md:h-auto md:max-h-[94vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="px-6 py-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 pr-8 line-clamp-2">
                {selectedPrayer.name}
              </h2>
              <button
                onClick={closeModal}
                className="p-3 text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-100"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-7 md:p-10 text-[17px] leading-relaxed text-gray-800 whitespace-pre-line font-serif">
              {selectedPrayer.content}
            </div>

            {/* Download Bar */}
            <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleDownload(selectedPrayer.name, "txt")}
                disabled={downloading === selectedPrayer.name}
                className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-medium text-gray-700 transition-all disabled:opacity-70"
              >
                <FileText className="w-5 h-5" />
                Download as TXT
              </button>
              <button
                onClick={() => handleDownload(selectedPrayer.name, "pdf")}
                disabled={downloading === selectedPrayer.name}
                className="flex-1 flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-2xl font-medium transition-all disabled:opacity-70"
              >
                <Download className="w-5 h-5" />
                Download as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}