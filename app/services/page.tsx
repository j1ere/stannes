// ============================================
// FILE 2: app/services/page.tsx
// ============================================
import type { Metadata } from "next"
import ChaplaincyServicesClient from "@/app/services/chaplaincy-services-client"
import type { Service, BlogPost, Testimonial } from "@/app/services/types"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

export const metadata: Metadata = {
  title: "Chaplaincy Services | St. Anne's Chaplaincy - Archdiocese of Kisumu",
  description:
    "Explore our printing services, semester theme t-shirts, and Catholic merchandise at St. Anne's Chaplaincy - Archdiocese of Kisumu.",
  keywords: ["chaplaincy services", "printing", "t-shirts", "Catholic merchandise", "Maseno University"],
  openGraph: {
    title: "Chaplaincy Services - St. Anne's Chaplaincy",
    description: "Quality services supporting our Catholic community.",
    type: "website",
  },
}

// Enable ISR: This page will be statically generated at build time
// and revalidated every hour
export const revalidate = 3600 // Revalidate every 1 hour (ISR)

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // TODO: BACKEND INTEGRATION
    // Replace with your actual API endpoint when backend is ready:
    // const res = await fetch("https://your-api.com/api/blog-posts?limit=5", {
    //   next: { 
    //     revalidate: 3600, // ISR: Cache for 1 hour
    //     tags: ['blog-posts'] // Optional: for on-demand revalidation
    //   },
    // })
    
    // For now, using dummy data
    return getDummyBlogPosts()
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return getDummyBlogPosts()
  }
}

// Dummy data for development - will be replaced with API call
function getDummyBlogPosts(): BlogPost[] {
  return [
    {
      id: 1,
      title: "Pope Francis Calls for Global Peace in New Year Message",
      excerpt:
        "The Holy Father emphasizes the importance of dialogue and understanding among nations...",
      date: "2026-01-15",
      category: "Vatican News",
      image: "/placeholder.svg?height=200&width=300&text=Pope+Francis+Message",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "World Youth Day 2024: A Celebration of Faith",
      excerpt:
        "Young Catholics from around the world gather to celebrate their faith and commitment...",
      date: "2026-01-12",
      category: "Youth",
      image: "/placeholder.svg?height=200&width=300&text=World+Youth+Day",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "The Importance of Daily Prayer in Modern Life",
      excerpt:
        "How incorporating prayer into our daily routine can transform our spiritual journey...",
      date: "2026-01-10",
      category: "Spirituality",
      image: "/placeholder.svg?height=200&width=300&text=Daily+Prayer",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Catholic Social Teaching in Action",
      excerpt:
        "Exploring how Catholic principles guide us in serving our communities...",
      date: "2026-01-08",
      category: "Social Justice",
      image: "/placeholder.svg?height=200&width=300&text=Social+Teaching",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Saints for Students: Finding Inspiration in Academia",
      excerpt:
        "Discovering patron saints who can guide and inspire students in their academic journey...",
      date: "2026-01-05",
      category: "Saints",
      image: "/placeholder.svg?height=200&width=300&text=Saints+Students",
      readTime: "4 min read",
    },
  ]
}

async function getServices(): Promise<Service[]> {
  try {
    // TODO: BACKEND INTEGRATION
    // Replace with your actual API endpoint when backend is ready:
    // const res = await fetch("https://your-api.com/api/services", {
    //   next: { revalidate: 86400 } // Cache for 24 hours (services change less frequently)
    // })
    // const servicesData = await res.json()
    // 
    // Map the API response to include icon components:
    // return servicesData.map((service: any) => ({
    //   ...service,
    //   icon: getIconComponent(service.iconName) // Map icon name to component
    // }))
    
    // For now, using static data with icon components
    return getStaticServices()
  } catch (error) {
    console.error("Failed to fetch services:", error)
    return getStaticServices()
  }
}

// Static services data - icons are passed as strings
function getStaticServices(): Service[] {
  return [
    {
      id: "tshirts",
      name: "Semester Theme T-Shirts",
      icon: "Shirt",
      description:
        "Custom designed t-shirts featuring our beautiful semester themes",
      price: "KSh 800 - 1,200",
      features: [
        "High-quality cotton",
        "Custom designs",
        "All sizes available",
        "Fast delivery",
      ],
      image:
        "/placeholder.svg?height=300&width=400&text=Semester+Theme+T-Shirts",
    },
    {
      id: "printing",
      name: "Printing Services",
      icon: "Printer",
      description:
        "Professional printing services for all your academic and personal needs",
      price: "KSh 5 per page",
      features: [
        "Black & white printing",
        "Color printing",
        "Binding services",
        "Lamination",
      ],
      image: "/placeholder.svg?height=300&width=400&text=Printing+Services",
    },
    {
      id: "merchandise",
      name: "Catholic Merchandise",
      icon: "ShoppingBag",
      description: "Religious items, books, and Catholic accessories",
      price: "KSh 200 - 2,000",
      features: [
        "Prayer books",
        "Rosaries",
        "Religious art",
        "Catholic literature",
      ],
      image: "/placeholder.svg?height=300&width=400&text=Catholic+Merchandise",
    },
  ]
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    // TODO: BACKEND INTEGRATION
    // Replace with your actual API endpoint when backend is ready:
    // const res = await fetch("https://your-api.com/api/testimonials?limit=3", {
    //   next: { revalidate: 86400 } // Cache for 24 hours
    // })
    // return await res.json()
    
    // For now, using static data
    return getStaticTestimonials()
  } catch (error) {
    console.error("Failed to fetch testimonials:", error)
    return getStaticTestimonials()
  }
}

// Static testimonials data
function getStaticTestimonials(): Testimonial[] {
  return [
    {
      name: "Mary Wanjiku",
      year: "4th Year",
      text: "The semester theme t-shirts are amazing! Great quality and beautiful designs.",
      rating: 5,
    },
    {
      name: "John Ochieng",
      year: "2nd Year",
      text: "Fast and reliable printing services. Always there when I need them for assignments.",
      rating: 5,
    },
    {
      name: "Grace Akinyi",
      year: "3rd Year",
      text: "Love the Catholic merchandise selection. Found the perfect rosary here.",
      rating: 4,
    },
  ]
}

// This is an async Server Component
export default async function ChaplaincyServicesPage() {
  // Fetch all data in parallel for better performance
  const [blogPosts, services, testimonials] = await Promise.all([
    getBlogPosts(),
    getServices(),
    getTestimonials(),
  ])

  return (
    <>
    <Navbar/>
    <ChaplaincyServicesClient
      initialBlogPosts={blogPosts}
      initialServices={services}
      initialTestimonials={testimonials}
    />
    <Footer/>
    </>
  )
}