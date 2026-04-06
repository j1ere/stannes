"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();

  await fetch("https://api.stanneschaplaincy.com/auth/logout/", {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  cookieStore.delete("sessionid");

  redirect("/");
}
