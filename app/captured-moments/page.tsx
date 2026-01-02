"use client"

import { useState } from "react"
import { Download, Heart, Share2, Eye, Calendar, MapPin, X } from "lucide-react"
import ScrollToTop from "@/app/components/scroll-to-top"  // Adjust path as needed
import Image from "next/image"  // For optimized images
import Navbar from "../components/navbar"
import Footer from "../components/footer"

interface Photo {
  id: number
  src: string
  title: string
  category: string
  date: string
  location: string
  likes: number
  description: string
}

interface Category {
  id: string
  name: string
}

const CapturedMoments = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set())

  const categories: Category[] = [
    { id: "all", name: "All Photos" },
    { id: "mass", name: "Mass & Liturgy" },
    { id: "events", name: "Events" },
    { id: "community", name: "Community Life" },
    { id: "charity", name: "Charity Work" },
    { id: "recreation", name: "Recreation" },
  ]

  const photos: Photo[] = [
    {
      id: 1,
      src: "/images/img1.jpeg",
      title: "Sunday Mass Celebration",
      category: "mass",
      date: "2026-01-15",
      location: "Main Chapel",
      likes: 45,
      description: "Beautiful Sunday mass with our vibrant community",
    },
    {
      id: 2,
      src: "/images/img2.jpeg",
      title: "Charity Visit - Children's Home",
      category: "charity",
      date: "2026-01-10",
      location: "Local Children's Home",
      likes: 67,
      description: "CSA members spreading love and joy to children",
    },
    {
      id: 3,
      src: "/images/img3.jpeg",
      title: "CSA Hike Adventure",
      category: "recreation",
      date: "2026-01-08",
      location: "Kakamega Hills",
      likes: 89,
      description: "Amazing hiking experience with fellow CSA members",
    },
    {
      id: 4,
      src: "/images/img4.jpeg",
      title: "Cultural Week Celebration",
      category: "events",
      date: "2026-01-05",
      location: "University Campus",
      likes: 123,
      description: "Celebrating our rich cultural heritage",
    },
    {
      id: 5,
      src: "/images/img5.jpeg",
      title: "Prayer House Fellowship",
      category: "community",
      date: "2026-01-03",
      location: "St. Joseph Prayer House",
      likes: 34,
      description: "Weekly prayer house gathering and fellowship",
    },
    {
      id: 6,
      src: "/images/img3.jpeg",
      title: "Confirmation Ceremony",
      category: "mass",
      date: "2026-01-01",
      location: "Main Chapel",
      likes: 78,
      description: "Special confirmation ceremony for new members",
    },
    {
      id: 7,
      src: "/images/img1.jpeg",
      title: "Elderly Home Visit",
      category: "charity",
      date: "2025-12-28",
      location: "St. Monica Elderly Home",
      likes: 56,
      description: "Bringing joy to our elderly community members",
    },
    {
      id: 8,
      src: "/images/img4.jpeg",
      title: "Sports Day Fun",
      category: "recreation",
      date: "2025-12-25",
      location: "University Grounds",
      likes: 92,
      description: "Friendly football match during sports day",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=600&text=Christmas+Celebration",
      title: "Christmas Celebration",
      category: "events",
      date: "2025-12-25",
      location: "Main Chapel",
      likes: 156,
      description: "Joyful Christmas celebration with carols and prayers",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=400&width=600&text=Youth+Retreat",
      title: "Youth Retreat Weekend",
      category: "community",
      date: "2025-12-20",
      location: "Retreat Center",
      likes: 98,
      description: "Spiritual retreat for young Catholics",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=400&width=600&text=Adoration+Night",
      title: "Eucharistic Adoration Night",
      category: "mass",
      date: "2025-12-15",
      location: "Main Chapel",
      likes: 67,
      description: "Peaceful night of prayer and adoration",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=400&width=600&text=Community+Service",
      title: "Community Service Day",
      category: "charity",
      date: "2025-12-10",
      location: "Local Community",
      likes: 84,
      description: "Serving our local community with love",
    },
  ]

  const filteredPhotos: Photo[] =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const toggleLike = (photoId: number) => {
    const newLikedPhotos = new Set(likedPhotos)
    if (newLikedPhotos.has(photoId)) {
      newLikedPhotos.delete(photoId)
    } else {
      newLikedPhotos.add(photoId)
    }
    setLikedPhotos(newLikedPhotos)
  }

  const downloadImage = (photo: Photo) => {
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = photo.src
    link.download = `${photo.title.replace(/\s+/g, "-")}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log(`Downloaded: ${photo.title}`)
  }

  const openModal = (photo: Photo) => {
    setSelectedImage(photo)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <> 
    <Navbar/>
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-12 left-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-24 right-20 w-24 h-24 bg-white/5 rotate-45 blur-sm"></div>
          <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-amber-300/20 rounded-full blur-lg"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Captured Moments</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Relive the beautiful memories of our Catholic community through these precious moments
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C200,20 400,100 600,40 C800,0 1000,80 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                  {/* Heart Icon for Liking */}
                  <button
                    onClick={() => toggleLike(photo.id)}
                    className="absolute top-4 left-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-300 ${
                        likedPhotos.has(photo.id) ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"
                      }`}
                    />
                  </button>

                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openModal(photo)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => downloadImage(photo)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Quick Download Button */}
                  <button
                    onClick={() => downloadImage(photo)}
                    className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{photo.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{photo.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(photo.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {photo.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleLike(photo.id)}
                        className={`flex items-center transition-colors duration-300 ${
                          likedPhotos.has(photo.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 mr-1 transition-all duration-300 ${
                            likedPhotos.has(photo.id) ? "fill-red-500" : ""
                          }`}
                        />
                        <span className="text-sm">{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4 mr-1" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    <button
                      onClick={() => downloadImage(photo)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div
            className="relative max-w-4xl max-h-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
              priority={false}
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600 mb-4">{selectedImage.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedImage.location}
                  </div>
                </div>
                <div className="flex items-center">
                  <Heart
                    className={`w-4 h-4 mr-1 ${
                      likedPhotos.has(selectedImage.id) ? "text-red-500 fill-red-500" : "text-red-500"
                    }`}
                  />
                  <span className="text-sm text-gray-600">
                    {selectedImage.likes + (likedPhotos.has(selectedImage.id) ? 1 : 0)} likes
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => toggleLike(selectedImage.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                    likedPhotos.has(selectedImage.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "border border-red-300 text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${likedPhotos.has(selectedImage.id) ? "fill-white" : ""}`} />
                  {likedPhotos.has(selectedImage.id) ? "Liked" : "Like"}
                </button>
                <button
                  onClick={() => downloadImage(selectedImage)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Photo
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ScrollToTop />
    </div>
    <Footer/>   
    </>
  )
}

export default CapturedMoments