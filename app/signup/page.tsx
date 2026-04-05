// signup/page.tsx
import type { Metadata } from "next"
import SignupForm from "./signupForm"
import { registerAction } from "./actions"

export const metadata: Metadata = {
  title: "Sign Up | St. Anne's Chaplaincy",
  description: "Create your account and join the St. Anne's Catholic Chaplaincy community at Maseno University.",
}

export default function SignupPage() {
  return < SignupForm action={registerAction}/>
}
    