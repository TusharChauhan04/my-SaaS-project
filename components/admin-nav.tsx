"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, BarChart3, Users, Settings, DollarSign } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  company: string
  role: string
}

export default function AdminNav({ user }: { user: User }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: BarChart3 },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Billing", href: "/admin/billing", icon: DollarSign },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/auth/login")
  }

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚙️</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-xs text-blue-200">{user.email}</p>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-white border-white hover:bg-white/10 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-700 p-4 space-y-2 bg-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </div>
      )}

      <div className="hidden md:flex px-8 py-3 gap-2 border-t border-slate-700">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
