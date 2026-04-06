// app/api/proxy/daily-verse/route.ts
// Proxies the Django daily-verse endpoint and caches for 60 s on the edge.
// Change NEXT_PUBLIC_API_BASE (or hardcode) to your production Django URL.

import { NextResponse } from "next/server";

const DJANGO_BASE =
  process.env.DJANGO_API_URL ?? "https://api.stanneschaplaincy.com";

export const revalidate = 60; // ISR-style: re-fetch at most once per minute

export async function GET() {
  try {
    const res = await fetch(`${DJANGO_BASE}/api/calendar/daily-verse/`, {
      next: { revalidate: 60 }, // Next.js fetch cache
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// app/api/proxy/active-theme/route.ts  (create this as a separate file)
// ─────────────────────────────────────────────────────────────────────────────
// import { NextResponse } from "next/server"
// const DJANGO_BASE = process.env.DJANGO_API_URL ?? "https://api.stanneschaplaincy.com"
// export const revalidate = 300
// export async function GET() {
//   try {
//     const res = await fetch(`${DJANGO_BASE}/api/theme/public/active-theme/`, {
//       next: { revalidate: 300 },
//     })
//     if (!res.ok) throw new Error(`upstream ${res.status}`)
//     const data = await res.json()
//     return NextResponse.json(data, {
//       headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
//     })
//   } catch {
//     return NextResponse.json({ error: "unavailable" }, { status: 502 })
//   }
// }
