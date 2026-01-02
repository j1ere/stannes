import type { Metadata } from "next"
import LoginClient from "./login-client"

export const metadata: Metadata = {
  title: "Login | St. Anne's Chaplaincy",
  description: "Sign in to your St. Anne's Catholic Chaplaincy account.",
}

export default function LoginPage() {
  return <LoginClient />
}
