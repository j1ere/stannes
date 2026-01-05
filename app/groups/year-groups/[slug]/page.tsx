// pages/groups/prayer-house/[slug].tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Heart } from "lucide-react";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

const yeargroups = [
  {
    slug: "springs-of-life",
    name: "Springs of Life",
    //communities: ["St. Francis", "St. Charity", "St. Rita"],
    gradient: "from-green-500 to-emerald-600",
    members: "80+",
    description:
      "Inspired by the life and writings of St. Augustine of Hippo, this prayer house focuses on intellectual and spiritual growth through contemplative prayer, scripture study, and community dialogue. Members engage in weekly discussions on theology and personal conversion, fostering a deep sense of belonging and purpose.",
    meetingInfo:
      "Saturdays at 7 PM in the Augustine Hall. All are welcome to join for prayer and fellowship.",
    leaders: [
      "Chair: Maria Gonzalez",
      "Vice-Chair: Johnathan Lee",
      "Secretary: Anna Patel",
    ],
    images: [
      "/images/img1.jpeg",
      "/images/img2.jpeg",
      "/images/img3.jpeg",
      "/images/img4.jpeg",
      "/images/img1.jpeg",
    ],
  },
  {
    slug: "blessed-souls",
    name: "Blessed Souls",
    //communities: ["St. Christopher", "St. George", "St. Josephine Bhakita"],
    gradient: "from-orange-500 to-amber-600",
    members: "75+",
    description:
      "Named after St. Rose of Lima, this house emphasizes service, humility, and devotion, gathering for intercessory prayer and acts of charity within the community. Activities include outreach programs and reflection on living a life of simplicity and love.",
    meetingInfo:
      "Saturdays at 7 PM in the Rose Chapel. Bring your heart for service!",
    leaders: [
      "Chair: Sofia Ramirez",
      "Vice-Chair: David Kim",
      "Secretary: Elena Torres",
    ],
    images: [
      "/images/img1.jpeg",
      "/images/img2.jpeg",
      "/images/img3.jpeg",
      "/images/img4.jpeg",
      "/images/img1.jpeg",
    ],
  },
  {
    slug: "Mary-seat-of-wisdom",
    name: "Mary seat of wisdom",
    //communities: ["St. John Bosco", "St. Joseph", "St. Cecilia", "St. Maria Goreti", "St. Michael", "St. Monica"],
    gradient: "from-emerald-500 to-green-600",
    members: "120+",
    description:
      "Devoted to St. Faustina Kowalska and Divine Mercy, this largest prayer house leads in merciful outreach, adoration, and fostering a culture of forgiveness and compassion. Join us for the Chaplet of Divine Mercy and healing prayer sessions.",
    meetingInfo:
      "Saturdays at 7 PM in the Faustina Adoration Room. Experience God's mercy anew.",
    leaders: [
      "Chair: Father Michael O'Brien",
      "Vice-Chair: Theresa Wong",
      "Secretary: Carlos Mendoza",
    ],
    images: [
      "/images/img1.jpeg",
      "/images/img2.jpeg",
      "/images/img3.jpeg",
      "/images/img4.jpeg",
      "/images/img1.jpeg",
    ],
  },
  {
    slug: "Mary-mirror-of-justice",
    name: "Mary mirror of justice",
    //communities: ["St. Theresa of Avilla", "St. Stephen", "St. Scholastica", "St. Charles Lwanga"],
    gradient: "from-amber-500 to-orange-600",
    members: "90+",
    description:
      "Honoring St. Peter the Apostle, this house builds leadership and unity, with prayers centered on the Church's mission, evangelization, and steadfast faith. Leadership workshops and mission trips are highlights.",
    meetingInfo:
      "Saturdays at 7 PM in the Peter Leadership Center. Step into your calling.",
    leaders: [
      "Chair: Peter Novak",
      "Vice-Chair: Grace Thompson",
      "Secretary: Liam O'Reilly",
    ],
    images: [
      "/images/img1.jpeg",
      "/images/img2.jpeg",
      "/images/img3.jpeg",
      "/images/img4.jpeg",
      "/images/img1.jpeg",
    ],
  },
];

const yeargroupDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const yeargroup = yeargroups.find((y) => y.slug === slug);

  if (!yeargroup) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Group/yeargroup Not Found
          </h1>
          <Link href="/groups" className="text-green-600 hover:underline">
            Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-white">
        {/* Header with Back Button */}
        <section className="bg-gradient-to-r from-green-600 to-orange-600 py-8 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <Link
              href="/groups"
              className="flex items-center text-white hover:text-green-100 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Groups
            </Link>
            <h1 className="text-3xl font-bold text-white ml-auto">
              {yeargroup.name}
            </h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Photo Gallery */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {yeargroup.images.map((imageSrc, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-md"
                >
                  <img
                    src={imageSrc}
                    alt={`${yeargroup.name} community event ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Details */}
          <section className="bg-gray-50 rounded-xl p-8">
            <div
              className={`h-2 bg-gradient-to-r ${yeargroup.gradient} rounded-t-xl mb-6`}
            ></div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {yeargroup.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {yeargroup.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Communities
                  </h3>
                  {/* <ul className="space-y-2">
                  {house.communities.map((community, idx) => (
                    <li key={idx} className="bg-white rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm">
                      {community}
                    </li>
                  ))}
                </ul> */}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                    Meeting Information
                  </h3>
                  <p className="text-gray-600 mb-3">{yeargroup.meetingInfo}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium mr-2">
                      {yeargroup.members}
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
                  {yeargroup.leaders.map((leader, idx) => (
                    <li
                      key={idx}
                      className="bg-white rounded px-3 py-1 shadow-sm"
                    >
                      {leader}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default yeargroupDetail;
