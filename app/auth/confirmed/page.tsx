'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmedPage() {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard')
  }, [])
  return <div className="flex h-screen items-center justify-center">Redirecting to dashboard...</div>
}
