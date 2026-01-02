"use server"

import { setSession, clearSession, type User } from "./auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string

  // Simulate authentication - in production, validate against database
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Create user session
  const user: User = {
    id: Date.now().toString(),
    fullName: fullName || email.split("@")[0],
    email,
  }

  await setSession(user)
  redirect("/about")
}

export async function signupAction(formData: FormData) {
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const prayerHouse = formData.get("prayerHouse") as string
  const yearGroup = formData.get("yearGroup") as string

  // Validate inputs
  if (!fullName || !email || !password) {
    return { error: "All fields are required" }
  }

  // Create user session
  const user: User = {
    id: Date.now().toString(),
    fullName,
    email,
    prayerHouse: prayerHouse || undefined,
    yearGroup: yearGroup || undefined,
  }

  await setSession(user)
  redirect("/about")
}

export async function logoutAction() {
  await clearSession()
  redirect("/")
}
