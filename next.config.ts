import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chaplaincyb.onrender.com",
        pathname: "/media/**", // match Django MEDIA_URL
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "www.vaticannews.va",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.catholicnewsagency.com",
      },
      { protocol: "https", 
        hostname: "**.vatican.va" 
      },
      { protocol: "https", 
        hostname: "**.ewtnnews.com" 
      },
      { protocol: "https", 
        hostname: "images.unsplash.com" 
      },
      { protocol: "https", 
        hostname: "cdn.pixabay.com" 
      },
      { protocol: "https", 
        hostname: "images.pexels.com" 
      },
    ],
  },
};

export default nextConfig;