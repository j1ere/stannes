// app/prayer/components/ReadFullReadingsButton.tsx
"use client";

import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReadFullReadingsButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/prayer/readings")}
      className="inline-flex items-center bg-gradient-to-r from-green-600 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <BookOpen className="w-5 h-5 mr-2" />
      Read Full Readings
    </button>
  );
}