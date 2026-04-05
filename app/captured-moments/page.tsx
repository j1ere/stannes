"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 60); 

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft(distance);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "Launching soon";

    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Captured Moments
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Something beautiful is coming soon
        </p>

        <div className="text-2xl font-mono mb-8">
          {formatTime(timeLeft)}
        </div>

      </div>
    </div>
  );
}
