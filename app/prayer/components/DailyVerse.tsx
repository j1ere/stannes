"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

type VerseAPIResponse = {
  text: string;
  ref: string;
  date: string;
  url: string;
};

export default function DailyVerse() {
  const [verse, setVerse] = useState<VerseAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.stanneschaplaincy.com/api/calendar/daily-verse/",
        );
        const data = await res.json();
        setVerse(data);
      } catch (err) {
        console.error(err);
        setVerse(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Verse</h2>

          {loading ? (
            <p className="text-gray-500">Loading date...</p>
          ) : (
            <p className="text-gray-600">{verse?.date}</p>
          )}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          {loading ? (
            <p className="text-gray-500">Loading daily verse...</p>
          ) : verse ? (
            <>
              <h3 className="text-xl font-bold text-purple-600 mb-4">
                {verse.ref}
              </h3>

              <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                "{verse.text}"
              </p>
            </>
          ) : (
            <p className="text-red-500">Unable to load verse.</p>
          )}

          {/* Optional Reflection (Static for now) */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mt-6">
            <p className="text-gray-600 text-sm">
              Take a moment today to reflect and trust fully in God's plan for
              you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
