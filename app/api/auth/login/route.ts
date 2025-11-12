import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return NextResponse.json({ success: true, user: data.user })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}
