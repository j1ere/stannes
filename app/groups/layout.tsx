// app/groups/(protected)/layout.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const res = await fetch("https://api.stanneschaplaincy.com/auth/profile/", {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  // ❌ Not authenticated
  if (!res.ok) {
    redirect("/login");
  }

  // ✅ Authenticated
  return <>{children}</>;
}