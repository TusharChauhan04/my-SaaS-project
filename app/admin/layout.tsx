import type React from "react"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminNav from "@/components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={session.user} />
      <div className="p-4 md:p-8">
        <main>{children}</main>
      </div>
    </div>
  )
}
