"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Heart } from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface GroupDetail {
  id: number;
  name: string;
  slug: string;
  members: string;
  meeting_day?: string;
  meeting_time?: string;
  meeting_location?: string;
  community_list: string[];
  about: string;
  leadership: string[];
  images: Array<{ image: string }>;
}

export default function MovementDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.stanneschaplaincy.com/api/groups/groups/slug/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setGroup(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        Loading movement...
      </div>
    );
  if (error || !group) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Movement Not Found
          </h1>
          <Link href="/groups" className="text-green-600 hover:underline">
            ← Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-16 bg-white">
        <section className="bg-gradient-to-r from-green-600 to-orange-600 py-8 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <Link
              href="/groups"
              className="flex items-center text-white hover:text-green-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Groups
            </Link>
            <h1 className="text-3xl font-bold text-white ml-auto">
              {group.name}
            </h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Gallery */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.images.length > 0 ? (
                group.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl shadow-md"
                  >
                    <img
                      src={img.image}
                      alt={`${group.name} event ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-gray-500">
                  No gallery images available yet.
                </p>
              )}
            </div>
          </section>

          {/* Details */}
          <section className="bg-gray-50 rounded-xl p-8">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-t-xl mb-6"></div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {group.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">{group.about}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Communities
                  </h3>
                  {group.community_list.length > 0 ? (
                    <ul className="space-y-2">
                      {group.community_list.map((c, i) => (
                        <li
                          key={i}
                          className="bg-white rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No communities listed.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                    Meeting Information
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {group.meeting_day} {group.meeting_time}{" "}
                    {group.meeting_location}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium mr-2">
                      {group.members}
                    </span>
                    Active Members
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                  Leadership
                </h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {group.leadership.length > 0 ? (
                    group.leadership.map((leader, idx) => (
                      <li
                        key={idx}
                        className="bg-white rounded px-3 py-1 shadow-sm"
                      >
                        {leader}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Leadership details coming soon.
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
