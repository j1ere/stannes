// ============================================
// FILE 1: app/services/types.ts
// ============================================

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  readTime: string
}

export interface Testimonial {
  name: string
  year: string
  text: string
  rating: number
}

export interface Service {
  id: string
  name: string
  icon: string
  description: string
  price: string
  features: string[]
  image: string
}