'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Home, Search, DollarSign, FileText, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase
          .from('users')
          .select('company_name, email')
          .eq('id', session.user.id)
          .single()
        setUserData(data)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Clear auth cookie
    document.cookie = 'auth-token=; path=/; max-age=0'
    router.push('/auth/login')
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'SEO Tracker', href: '/dashboard/seo', icon: Search },
    { name: 'Finance Manager', href: '/dashboard/finance', icon: DollarSign },
    { name: 'Content Planner', href: '/dashboard/content', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Company Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BZ</span>
              </div>
              {userData && (
                <div>
                  <h2 className="font-semibold text-gray-900">{userData.company_name || 'TechStartup Inc'}</h2>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-6 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-t-lg transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="bg-gray-50">{children}</main>
    </div>
  )
}
