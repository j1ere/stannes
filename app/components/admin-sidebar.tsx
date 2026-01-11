// components/admin-sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, Home, Users, BookOpen, Image, Calendar, FileText, MessageSquare, Menu, X } from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMobile = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    if (isMobile) {
      toggleMobile();
    }
  };

  const handleLogout = () => {
    onLogout();
    if (isMobile) {
      toggleMobile();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobile
            ? isOpen
              ? "translate-x-0 w-full"
              : "-translate-x-full w-full"
            : "translate-x-0 w-64"}
        `}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto">
          <Link 
            href="/admin" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <Home className="w-5 h-5 mr-3 flex-shrink-0" /> Dashboard
          </Link>
          <Link 
            href="/admin/groups" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <Users className="w-5 h-5 mr-3 flex-shrink-0" /> Groups
          </Link>
          <Link 
            href="/admin/theme" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <BookOpen className="w-5 h-5 mr-3 flex-shrink-0" /> Theme
          </Link>
          <Link 
            href="/admin/photos" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <Image className="w-5 h-5 mr-3 flex-shrink-0" /> Photos
          </Link>
          <Link 
            href="/admin/events" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <Calendar className="w-5 h-5 mr-3 flex-shrink-0" /> Events
          </Link>
          <Link 
            href="/admin/calendar" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <BookOpen className="w-5 h-5 mr-3 flex-shrink-0" /> Calendar
          </Link>
          <Link 
            href="/admin/messages" 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" 
            onClick={handleLinkClick}
          >
            <MessageSquare className="w-5 h-5 mr-3 flex-shrink-0" /> Messages
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-red-600 hover:text-red-800 py-2 px-4 rounded hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" /> Logout
          </button>
          {isMobile && (
            <button
              onClick={toggleMobile}
              className="w-full mt-2 py-2 px-4 text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            >
              Close Menu
            </button>
          )}
        </div>
      </div>
    </>
  );
}