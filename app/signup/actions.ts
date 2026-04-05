// signup/actions.ts
"use server";

import { redirect } from "next/navigation";

type State = {
  error?: string;
  success?: boolean;
  email?: string; // optional: to show on check-email page
} | null;

export async function registerAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const userType = formData.get("userType");
  const prayerHouse = formData.get("prayerHouse");
  const yearGroup = formData.get("yearGroup");
  const smallChristianCommunity = formData.get("smallChristianCommunity");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const res = await fetch("https://chaplaincyb.onrender.com/auth/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      email,
      full_name: fullName,
      password,
      password_confirm: confirmPassword,
      is_student: userType === "student",
      prayer_house: prayerHouse,
      year_group: yearGroup,
      small_christian_community: smallChristianCommunity,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      error: data?.detail || data?.message || "Registration failed.",
    };
  }

  // ✅ NO cookie forwarding here anymore (user is not logged in yet)
  // Redirect to a "Check your email" page and pass the email
  redirect(`/check-email?email=${encodeURIComponent(email as string)}`);
}
