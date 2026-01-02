"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  fullName: string
  email: string
  prayerHouse?: string
  yearGroup?: string
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

export async function setSession(user: User) {
  const cookieStore = await cookies()
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
}

export async function requireAuth() {
  const user = await getSession()
  if (!user) {
    redirect("/login")
  }
  return user
}
