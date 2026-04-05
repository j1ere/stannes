// // app/admin/(protected)/layout.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export default async function AdminBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  // Forward cookies to Django
  const res = await fetch("https://chaplaincyb.onrender.com/auth/profile/", {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  // ❌ Not logged in
  // if (res.status === 401 || res.status === 403) {
  //   redirect("/admin/login");
  // }
  if (!res.ok) {
    redirect("/admin/login");
  }

  const user = await res.json();

  // ❌ Not admin
  if (!user.is_staff && !user.is_superuser) {
    redirect("/"); // or show 403 page
  }

  // ✅ Allowed
  // return <>{children}</>;
  // 🔥 Wrap UI here
  return <AdminShell>{children}</AdminShell>;
}
