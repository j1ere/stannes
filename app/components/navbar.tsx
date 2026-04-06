import { cookies } from "next/headers";
import NavbarClient from "./navbarClient";

async function getUser() {
  const cookieStore = await cookies();

  const res = await fetch("https://api.stanneschaplaincy.com/auth/profile", {
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function Navbar() {
  const user = await getUser();

  return <NavbarClient initialUser={user} />;
}
