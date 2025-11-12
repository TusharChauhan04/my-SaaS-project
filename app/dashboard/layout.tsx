'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div>
      <nav className="flex justify-between p-4 bg-gray-100">
        <h1 className="font-bold">Dashboard</h1>
        {userData && (
          <div className="text-sm text-gray-700">
            <b>{userData.company_name}</b> ({userData.email})
          </div>
        )}
      </nav>
      <main>{children}</main>
    </div>
  )
}
