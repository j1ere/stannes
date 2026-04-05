// app/services/types.ts

export interface BlogPost {
  id: string           // API uses URLs as IDs
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  readTime: string
  link: string         // external article URL
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