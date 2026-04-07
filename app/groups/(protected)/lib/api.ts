// app/groups/lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.stanneschaplaincy.com";

export interface GroupImage {
  id: number;
  image: string;
  uploaded_at: string;
}

export interface Group {
  id: number;
  name: string;
  type: "Prayer House" | "Movement" | "Year Group" | "Other";
  slug: string;
  members: string;
  meeting_time: string;
  meeting_location: string;
  communities: string; // raw comma-separated string
  community_list: string[]; // pre-split by backend
  chair: string;
  treasurer: string;
  secretary: string;
  about: string;
  images: GroupImage[];
  created_at: string;
  updated_at: string;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 3600 },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function getAllGroups(): Promise<Group[]> {
  return apiFetch<Group[]>("/api/groups/");
}

export async function getGroupBySlug(slug: string): Promise<Group | null> {
  // The router gives us a list — filter client-side, or hit the detail endpoint
  try {
    return await apiFetch<Group>(`/api/groups/${slug}/`);
  } catch {
    return null;
  }
}

export function groupsByType(groups: Group[], type: Group["type"]) {
  return groups.filter((g) => g.type === type);
}

/** Tailwind gradient class based on index — keeps visual variety without hardcoding per item */
const GRADIENTS = [
  "from-green-500 to-emerald-600",
  "from-orange-500 to-amber-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
  "from-green-600 to-emerald-700",
  "from-orange-600 to-amber-700",
];
export function gradientFor(index: number) {
  return GRADIENTS[index % GRADIENTS.length];
}
