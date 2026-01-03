// app/events/types.ts (shared types)
import type { LucideIcon } from "lucide-react"

export interface EventDetails {
  duration?: string
  dresscode?: string
  languages?: string
  contact?: string
  preparation?: string
  childcare?: string
  agenda?: string
  attendees?: string
  requirements?: string
  refreshments?: string
  activities?: string
  donations?: string
  transport?: string
  cost?: string
  registration?: string
  facilitator?: string
  highlight?: string
  participation?: string
  prizes?: string
}

export interface UpcomingEvent {
  title: string
  date: string
  time: string
  location: string
  type: string
  icon: string
  color: string
  description: string
  details: EventDetails
}

export interface RegularActivity {
  activity: string
  schedule: string
  location: string
  description: string
}

export interface AnnualEvent {
  title: string
  description: string
  frequency: string
  impact: string
}

export interface CatholicEvent {
  date: number
  event: string
  type: "solemnity" | "feast" | "memorial" | "commemoration" | "All Souls" | "optional memorial"
  verse: string
  reading: string
}