"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, Home, Search, DollarSign, FileText, Settings } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  company: string
  role: string
}

export default function DashboardNav({ user }: { user: User }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "SEO Tracker", href: "/dashboard/seo", icon: Search },
    { label: "Finance Manager", href: "/dashboard/finance", icon: DollarSign },
    { label: "Content Planner", href: "/dashboard/content", icon: FileText },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/auth/login")
  }

  return (
    <div className="flex flex-col w-full">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <h1 className="font-bold text-lg">AI Analyzer</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-700 text-white p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-purple-600 font-semibold" : "text-purple-100 hover:bg-purple-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
          <Button onClick={handleLogout} className="w-full mt-4 justify-start gap-2 bg-purple-600 hover:bg-purple-800">
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full">
        <nav className="bg-white border-b border-gray-200">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BZ</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">{user.company}</h1>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="hidden md:flex px-8 py-4 gap-2 border-t border-gray-100">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
