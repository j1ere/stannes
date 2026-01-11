// app/admin/layout.tsx
"use client"; // Client-side for auth check

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/app/components/admin-sidebar"; // Adjust path as needed

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") return;

    // Client-side auth check for protected pages
    if (!localStorage.getItem("adminToken")) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  // Render only children for login page (no sidebar)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar onLogout={handleLogout} />
      <main className="md:ml-64 ml-0 flex-1 p-8 overflow-auto transition-all duration-300">
        {children}
      </main>
    </div>
  );
}