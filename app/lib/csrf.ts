// lib/csrf.ts
export const getCSRFToken = async (): Promise<string> => {
  const res = await fetch("https://api.stanneschaplaincy.com/auth/csrf/", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CSRF token");
  }

  const data = await res.json();
  return data.csrfToken;
};
