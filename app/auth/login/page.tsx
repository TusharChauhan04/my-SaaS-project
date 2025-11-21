"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      console.log('🔐 Starting login process...')

      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('📡 Supabase auth response:', { authData, authError })

      if (authError) {
        console.error('❌ Auth error:', authError)
        setError(authError.message || "Invalid email or password")
        setLoading(false)
        return
      }

      if (!authData.user) {
        console.error('❌ No user in auth data')
        setError("Authentication failed")
        setLoading(false)
        return
      }

      console.log('✅ User authenticated:', authData.user.email)

      // Set auth token cookie for middleware
      if (authData.session?.access_token) {
        document.cookie = `auth-token=${authData.session.access_token}; path=/; max-age=3600; SameSite=Lax`
        console.log('🍪 Auth cookie set')
      }

      // Get user role from API (uses service role key to bypass RLS)
      console.log('🔍 Fetching user role...')
      const response = await fetch("/api/auth/user-role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authData.session?.access_token}`
        }
      })

      console.log('📡 User role API response status:', response.status)

      if (!response.ok) {
        console.error('❌ Failed to fetch user role, status:', response.status)
        // Default to dashboard if role fetch fails
        console.log('🔄 Redirecting to /dashboard (fallback)...')
        window.location.href = "/dashboard"
        return
      }

      const { role } = await response.json()
      console.log('✅ User role:', role)

      // Redirect based on role
      const redirectPath = role === "admin" ? "/admin" : "/dashboard"
      console.log(`🔄 Redirecting to ${redirectPath}...`)
      window.location.href = redirectPath
      console.log('✅ window.location.href set')
    } catch (err) {
      console.error('❌ Login error:', err)
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BZ</span>
              </div>
            </div>
            <CardTitle className="text-2xl">BusinessZen</CardTitle>
            <p className="text-sm text-gray-500 mt-2">AI-Powered Business Insights</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-medium text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-800">User: user@demo.com / admin@demo.com</p>
              <p className="text-xs text-blue-800">Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
