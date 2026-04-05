// app/groups/components/GroupDetailLayout.tsx
// Shared layout for prayer house, movement, and year group detail pages.
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, Calendar, MapPin, Heart } from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import type { Group } from "../lib/api";

interface Props {
  group: Group;
  backHref: string;
  backLabel: string;
  accentGradient?: string;
}

export default function GroupDetailLayout({
  group,
  backHref,
  backLabel,
  accentGradient = "from-green-500 to-emerald-600",
}: Props) {
  const leaders = [
    group.chair     && { label: "Chair",     name: group.chair },
    group.treasurer && { label: "Treasurer", name: group.treasurer },
    group.secretary && { label: "Secretary", name: group.secretary },
  ].filter(Boolean) as { label: string; name: string }[];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-white">

        {/* ── Header ── */}
        <section className="bg-gradient-to-r from-green-600 to-orange-600 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={backHref} className="inline-flex items-center text-white/80 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Link>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-green-200 text-xs uppercase tracking-widest mb-1">{group.type}</p>
                <h1 className="text-3xl font-bold text-white">{group.name}</h1>
              </div>
              {group.members && (
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {group.members} members
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* ── Gallery ── */}
          {group.images.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.images.map((img, index) => (
                  <div key={img.id} className="relative overflow-hidden rounded-xl shadow-md aspect-video">
                    <Image
                      src={img.image}
                      alt={`${group.name} — photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Details card ── */}
          <section className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className={`h-1.5 bg-gradient-to-r ${accentGradient}`} />
            <div className="p-8 space-y-8">

              {/* About */}
              {group.about && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-600 leading-relaxed">{group.about}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">

                {/* Communities */}
                {group.community_list.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Communities
                    </h3>
                    <ul className="space-y-2">
                      {group.community_list.map((community, idx) => (
                        <li key={idx} className="bg-white rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm border border-gray-100">
                          {community}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meeting info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    Meeting Information
                  </h3>
                  <div className="space-y-3">
                    {group.meeting_time && (
                      <div className="bg-white rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm border border-gray-100 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        {group.meeting_time}
                      </div>
                    )}
                    {group.meeting_location && (
                      <div className="bg-white rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm border border-gray-100 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                        {group.meeting_location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Leadership */}
              {leaders.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    Leadership
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {leaders.map(({ label, name }) => (
                      <div key={label} className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                        <p className="text-sm font-medium text-gray-800">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}