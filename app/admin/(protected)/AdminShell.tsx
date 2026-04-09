// app/admin/(protected)/AdminShell.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Users, Calendar, Image, MessageSquare, 
  BookOpen, LayoutDashboard, Settings, ChevronLeft 
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/groups", label: "Groups", icon: Users },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/calendar", label: "Calendar", icon: Calendar },
  { href: "/admin/manage-prayers", label: "Prayers", icon: Calendar },

  { href: "/admin/photos", label: "Photos", icon: Image },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/theme", label: "Theme", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-2xl z-50
          transition-all duration-300 ease-in-out border-r border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isCollapsed ? "md:w-20" : "md:w-72"}
          w-72
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b flex items-center px-6 justify-between bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl tracking-tight">Admin Portal</span>
            )}
          </div>

          {/* Collapse Button (Desktop only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft 
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} 
            />
          </button>

          {/* Close Button (Mobile only) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-6 px-3">
          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Close on mobile when clicking a link
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700
                    hover:bg-green-50 hover:text-green-700 transition-all duration-200
                    group
                  `}
                >
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" />
                  {!isCollapsed && (
                    <span className="font-medium text-[15px]">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className={`text-xs text-gray-400 ${isCollapsed ? "text-center" : ""}`}>
            {!isCollapsed && "St. Admin Portal • 2026"}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div 
        className={`
          flex-1 transition-all duration-300
          ${isCollapsed ? "md:ml-20" : "md:ml-72"}
        `}
      >
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b flex items-center px-6 justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="font-semibold text-xl text-gray-800">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* You can add user profile, notifications here later */}
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-medium text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}