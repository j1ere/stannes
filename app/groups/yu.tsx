// pages/groups/index.tsx   (or wherever your main Groups page lives)
// Fully updated – now fetches REAL data from your Django backend

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Music,
  Heart,
  BookOpen,
  Sparkles,
  Cross,
  Star,
  Crown,
  Calendar,
  Clock,
} from "lucide-react";
import ScrollToTop from "@/app/components/scroll-to-top";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface Group {
  id: number;
  name: string;
  slug: string;
  type: string;
  members: string;
  meeting_time?: string;
  meeting_day?: string;
  meeting_location?: string;
  community_list: string[];
  about: string;
  leadership: string[];
  images: { image: string }[];
  is_alumni: boolean;
}

export default function Groups() {
  const [prayerHouses, setPrayerHouses] = useState<Group[]>([]);
  const [movements, setMovements] = useState<Group[]>([]);
  const [yearGroups, setYearGroups] = useState<Group[]>([]);
  const [alumniGroups, setAlumniGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "https://chaplaincyb.onrender.com/api/groups/groups";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [phRes, movRes, ygRes, alumRes] = await Promise.all([
          fetch(`${API_BASE}/?type=Prayer%20House`),
          fetch(`${API_BASE}/?type=Movement`),
          fetch(`${API_BASE}/?type=Year%20Group&is_alumni=false`),
          fetch(`${API_BASE}/?is_alumni=true`),
        ]);

        if (!phRes.ok || !movRes.ok || !ygRes.ok || !alumRes.ok) {
          throw new Error("Failed to load groups");
        }

        setPrayerHouses(await phRes.json());
        setMovements(await movRes.json());
        setYearGroups(await ygRes.json());
        setAlumniGroups(await alumRes.json());
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Small UI-only gradient mapping (keeps your beautiful design)
  const getGradient = (slug: string) => {
    const map: { [key: string]: string } = {
      "st-augustine": "from-green-500 to-emerald-600",
      "st-rose": "from-orange-500 to-amber-600",
      "st-faustina": "from-emerald-500 to-green-600",
      "st-peter": "from-amber-500 to-orange-600",
      "st-agnes": "from-green-600 to-emerald-700",
      "st-thomas": "from-orange-600 to-amber-700",
      default: "from-green-500 to-emerald-600",
    };
    return map[slug] || map.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading vibrant CSA groups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-12 w-28 h-28 bg-white/10 rounded-full"></div>
          <div className="absolute top-16 right-16 w-20 h-20 bg-white/5 rotate-45 blur-sm"></div>
          <div className="absolute bottom-12 left-1/4 w-24 h-24 bg-emerald-300/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-8 right-1/3 w-32 h-32 bg-orange-300/15 rotate-12 blur-xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Catholic Students' Association
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Discover the diverse community groups that make up our vibrant CSA
            family
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {prayerHouses.length}
              </div>
              <div className="text-green-200 text-sm">Prayer Houses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {movements.length}+
              </div>
              <div className="text-green-200 text-sm">Movements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {yearGroups.length}
              </div>
              <div className="text-green-200 text-sm">Year Groups</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Houses */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prayer Houses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Six prayer houses, each with multiple Christian communities,
              meeting regularly for prayer and fellowship
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerHouses.map((house) => (
              <Link
                key={house.id}
                href={`/groups/prayer-house/${house.slug}`}
                className="block"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer">
                  <div
                    className={`h-2 bg-gradient-to-r ${getGradient(house.slug)} rounded-t-xl`}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {house.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {house.members || "—"}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-700">
                        Communities:
                      </p>
                      {house.community_list.length > 0 ? (
                        house.community_list.map((community, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700"
                          >
                            {community}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No communities listed
                        </p>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {house.meeting_day || "Saturdays"} at designated halls
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Movements */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Groups & Movements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized groups focusing on different aspects of Catholic life,
              worship, and service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movements.map((movement) => (
              <Link
                key={movement.id}
                href={`/groups/movements/${movement.slug}`}
                className="block"
              >
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${getGradient(movement.slug)} rounded-lg flex items-center justify-center mb-4`}
                  >
                    {/* Simple icon based on name (you can expand this) */}
                    <span className="text-3xl">🙏</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {movement.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{movement.about}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{movement.members} Members</span>
                    </div>
                    {movement.meeting_day && (
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Meets {movement.meeting_day}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Year Groups & Alumni */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Year Groups
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students organized by academic year, fostering peer support and
              spiritual mentorship
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yearGroups.map((group, index) => (
              <Link
                key={group.id}
                href={`/groups/year-groups/${group.slug}`}
                className="block"
              >
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${getGradient(group.slug)} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {group.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{group.about}</p>
                    <div className="text-sm text-green-600 font-medium mb-3">
                      {group.members} Members
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Alumni Year Groups
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Graduates continuing the mission through mentorship, networking,
              and ongoing support
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumniGroups.map((group, index) => (
              <div
                key={group.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${getGradient(group.slug)} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {group.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{group.about}</p>
                  <div className="text-sm text-emerald-600 font-medium mb-3">
                    {group.members} Members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Committees (static – kept as-is) */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50 relative overflow-hidden">
        {/* Layered VGA Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-green-200/25 to-emerald-200/20 rounded-full blur-2xl"></div>
          <div className="absolute top-32 left-0 w-36 h-36 bg-orange-200/30 rotate-45 blur-xl"></div>
          <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-amber-200/25 rounded-full blur-lg transform -translate-x-1/2"></div>
          <div className="absolute bottom-24 right-24 w-28 h-28 bg-green-300/20 rotate-12 blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Special Committees
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized committees handling specific aspects of chaplaincy
              operations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Development Committee
              </h3>
              <p className="text-gray-600 mb-3">
                Responsible for all infrastructure developments within the
                chaplaincy
              </p>
              <p className="text-sm text-gray-500">
                <strong>Leadership:</strong> Chair, Assistant, Treasurer,
                Secretary
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Welfare Committee
              </h3>
              <p className="text-gray-600 mb-3">
                In charge of all welfare matters for students within the
                chaplaincy
              </p>
              <p className="text-sm text-gray-500">
                <strong>Focus:</strong> Student support and well-being
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                ICT Committee
              </h3>
              <p className="text-gray-600 mb-3">
                In charge of all technology within the chaplaincy
              </p>
              <p className="text-sm text-gray-500">
                <strong>Leadership:</strong> Organizing Secretary & Deputy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Find Your Place
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join one of our many groups and movements to deepen your faith and
            build lasting friendships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors">
              Join a Group
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
