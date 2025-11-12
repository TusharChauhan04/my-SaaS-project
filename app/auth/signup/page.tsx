'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    companyName: '',
    industry: '',
    companyLocation: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      console.log('🔍 Signup response:', data)
      if (data.success) router.push('/dashboard')
      else alert(data.message)
    } catch (err: any) {
      alert('Something went wrong: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-8 shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create your account</h2>

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full border rounded p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full border rounded p-2" />
        <input name="companyName" placeholder="Company Name" onChange={handleChange} className="w-full border rounded p-2" />
        <input name="industry" placeholder="Industry" onChange={handleChange} className="w-full border rounded p-2" />
        <input name="companyLocation" placeholder="Company Location" onChange={handleChange} className="w-full border rounded p-2" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
