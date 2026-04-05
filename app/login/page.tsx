// login/page.tsx
import type { Metadata } from "next";
import LoginForm from "./loginForm";

export const metadata: Metadata = {
  title: "Login | St. Anne's Chaplaincy",
  description: "Sign in to your St. Anne's Catholic Chaplaincy account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const params = await searchParams; // ✅ unwrap
  const resetSuccess = params.reset === "success";

  return <LoginForm reset={resetSuccess} />;
}