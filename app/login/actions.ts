// login/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import setCookieParser from "set-cookie-parser";
import { ParsedCookie } from "@/types/cookies";

type State = {
  error?: string;
} | null;

export async function loginAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");

  let res: Response;

  try {
    res = await fetch("https://api.stanneschaplaincy.com/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    // Network error (API unreachable, timeout, etc.)
    return { error: "Unable to reach the server. Please try again later." };
  }

  if (!res.ok) {
    // ✅ Return error state instead of throwing — lets the form display it
    if (res.status === 401) {
      return { error: "Invalid email or password. Please try again." };
    }
    if (res.status === 403) {
      return { error: "Your account has been deactivated. Please contact support." };
    }
    return { error: "Something went wrong. Please try again." };
  }

  // ✅ Get all Set-Cookie headers safely
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
        sameSite:
          (cookie.sameSite?.toLowerCase() as "strict" | "lax" | "none") ??
          "lax",
        path: cookie.path || "/",
      });
    });
  }

  redirect("/");
}