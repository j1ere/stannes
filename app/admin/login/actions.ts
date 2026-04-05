// admin/(protected)/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import setCookieParser from "set-cookie-parser";
import { ParsedCookie } from "@/types/cookies"; // adjust path if needed

type State = { error?: string } | null;

export async function adminLoginAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");
  const redirectPath = formData.get("redirect") || "/admin";

  const res = await fetch("https://chaplaincyb.onrender.com/auth/adminlogin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 403) {
    return { error: "Admin privileges required." };
  }

  if (!res.ok) {
    return { error: "Invalid credentials." };
  }

  // Safely forward ALL cookies
  const setCookieHeaders =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : res.headers.get("set-cookie");

  if (setCookieHeaders) {
  const parsedCookies = setCookieParser.parse(setCookieHeaders);

  parsedCookies.forEach((cookie: ParsedCookie) => {
    cookieStore.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly ?? true,
      secure: process.env.NODE_ENV === "production",
      sameSite: (cookie.sameSite?.toLowerCase() as "strict" | "lax" | "none") ?? "lax",
      path: cookie.path || "/",
    });
  });
}

  redirect(redirectPath as string);
}
