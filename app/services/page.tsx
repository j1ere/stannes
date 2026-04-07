// app/services/page.tsx
import type { Metadata } from "next";
import ChaplaincyServicesClient from "@/app/services/chaplaincy-services-client";
import type { Service, BlogPost, Testimonial } from "@/app/services/types";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Chaplaincy Services | St. Anne's Chaplaincy - Archdiocese of Kisumu",
  description:
    "Explore our printing services, semester theme t-shirts, and Catholic merchandise at St. Anne's Chaplaincy - Archdiocese of Kisumu.",
  keywords: [
    "chaplaincy services",
    "printing",
    "t-shirts",
    "Catholic merchandise",
    "Maseno University",
  ],
  openGraph: {
    title: "Chaplaincy Services - St. Anne's Chaplaincy",
    description: "Quality services supporting our Catholic community.",
    type: "website",
  },
};

export const revalidate = 3600;

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://api.stanneschaplaincy.com/api/blogs/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return []; // return empty rather than stale dummy data
  }
}

async function getServices(): Promise<Service[]> {
  try {
    return getStaticServices();
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return getStaticServices();
  }
}

function getStaticServices(): Service[] {
  return [
    {
      id: "tshirts",
      name: "Semester Theme T-Shirts",
      icon: "Shirt",
      description:
        "Custom designed t-shirts featuring our beautiful semester themes",
      price: "KSh 800",
      features: [
        "High-quality cotton",
        "Custom designs",
        "All sizes available",
        "Pay via M-Pesa: +254 7xx xxx xxx",
      ],
      image: "/images/tshirts.jpeg",
    },
    {
      id: "printing",
      name: "Printing Services",
      icon: "Printer",
      description:
        "Professional printing services for all your academic and personal needs",
      price: "(Coming Soon)",
      features: [
        "Black & white printing",
        "Color printing",
        "Binding services",
        "Lamination",
      ],
      image: "/images/Digital-Printing-Services.jpg",
    },
    {
      id: "merchandise",
      name: "Catholic Merchandise",
      icon: "ShoppingBag",
      description: "Religious items, books, and Catholic accessories",
      price: "From KSh 50",
      features: [
        "Prayer books",
        "Rosaries",
        "Religious art",
        "Catholic literature",
      ],
      image: "/images/books.webp",
    },
  ];
}


export default async function ChaplaincyServicesPage() {
  const [blogPosts, services, ] = await Promise.all([
    getBlogPosts(),
    getServices(),
    
  ]);

  return (
    <>
      <Navbar />
      <ChaplaincyServicesClient
        initialBlogPosts={blogPosts}
        initialServices={services}
        
      />
      <Footer />
    </>
  );
}
