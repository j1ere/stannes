"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react"
import { useAuth } from "@/app/lib/auth-provider"
import { logoutAction } from "@/app/lib/actions"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)

  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const { user } = useAuth()
  const isAuthenticated = !!user

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Community",
      href: "#",
      dropdown: [
        { name: "CSA", href: "/groups" },
        { name: "None-Students", href: "/leadership" },
      ],
    },
    { name: "Events", href: "/events" },
    { name: "Prayer & Spirituality", href: "/prayer" },
    { name: "Captured Moments", href: "/captured-moments" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => pathname === href

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setMobileDropdownOpen(false)
    setUserDropdownOpen(false)

    setTimeout(() => {
      scrollToTop()
    }, 100)
  }

  const handleLogout = async () => {
    setUserDropdownOpen(false)
    setIsOpen(false)
    await logoutAction()
  }

  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroHeight = window.innerHeight * 0.8

      if (scrollPosition > heroHeight) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
    setMobileDropdownOpen(false)
    setUserDropdownOpen(false)
    scrollToTop()
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isHomePage
          ? isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
            : "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between transition-all duration-500 ${
            isHomePage ? (isScrolled ? "h-16" : "h-20") : "h-16"
          }`}
        >
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group" onClick={() => handleNavClick("/")}>
              <div
                className={`transition-all duration-700 ease-out ${
                  isHomePage
                    ? isScrolled
                      ? "w-10 h-10 opacity-100 scale-100 translate-x-0"
                      : "w-0 h-0 opacity-0 scale-75 -translate-x-4 overflow-hidden"
                    : "w-10 h-10 opacity-100 scale-100 translate-x-0"
                }`}
              >
                {(isScrolled || !isHomePage) && (
                  <img
                    src="/images/chaplaincylogo-removebg-preview.png"
                    alt="St. Anne's Catholic Chaplaincy Logo"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <div>
                <h1
                  className={`font-bold transition-all duration-500 ${
                    isHomePage
                      ? isScrolled
                        ? "text-sm sm:text-lg md:text-xl text-gray-900"
                        : "text-base sm:text-xl md:text-2xl text-white drop-shadow-lg"
                      : "text-sm sm:text-lg md:text-xl text-gray-900"
                  }`}
                >
                  St. Anne&apos;s
                </h1>
                <p
                  className={`text-xs sm:text-xs transition-all duration-500 ${
                    isHomePage ? (isScrolled ? "text-gray-600" : "text-white/90 drop-shadow-md") : "text-gray-600"
                  }`}
                >
                  Maseno University
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        isHomePage
                          ? isScrolled
                            ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                            : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 backdrop-blur-md">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => handleNavClick(subItem.href)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? isHomePage
                          ? (isScrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/20 backdrop-blur-sm")
                          : "text-blue-600 bg-blue-50"
                        : isHomePage
                          ? (
                              isScrolled
                                ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                            )
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isScrolled || !isHomePage
                      ? "bg-gradient-to-r from-green-600 to-orange-500 text-white hover:shadow-lg"
                      : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">{user.fullName.split(" ")[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 backdrop-blur-md">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isScrolled || !isHomePage
                    ? "bg-gradient-to-r from-green-600 to-orange-500 text-white hover:shadow-lg"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                }`}
                onClick={() => handleNavClick("/login")}
              >
                Login
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isHomePage
                  ? isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white hover:text-white hover:bg-white/10 backdrop-blur-sm"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div
          className={`backdrop-blur-md border-t transition-colors duration-300 ${
            isScrolled ? "bg-white/95 border-gray-200" : "bg-black/20 border-white/20"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium transition-colors duration-300 ${
                        isHomePage
                          ? isScrolled
                            ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileDropdownOpen && (
                      <div className="pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block pl-6 pr-3 py-2 text-sm transition-colors duration-300 ${
                              isHomePage
                                ? isScrolled
                                  ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                  : "text-white/80 hover:text-white hover:bg-white/10"
                                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                            onClick={() => handleNavClick(subItem.href)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                      isActive(item.href)
                        ? isScrolled
                          ? "text-blue-600 bg-blue-50"
                          : "text-white bg-white/20"
                        : isScrolled
                          ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {isAuthenticated && user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-3 py-2">
                  <p className={`text-sm font-medium ${isScrolled ? "text-gray-900" : "text-white"}`}>
                    {user.fullName}
                  </p>
                  <p className={`text-xs ${isScrolled ? "text-gray-500" : "text-white/70"}`}>{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center space-x-2 ${
                    isScrolled ? "text-red-600 hover:bg-red-50" : "text-red-300 hover:bg-white/10"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`block w-full mt-4 px-6 py-2 rounded-full text-sm font-medium text-center transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-green-600 to-orange-500 text-white"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                }`}
                onClick={() => handleNavClick("/login")}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
