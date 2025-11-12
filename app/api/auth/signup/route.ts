import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { createClient } from '@supabase/supabase-js'

// ✅ Confirm env vars
console.log('🔑 Service Role Key loaded:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,                    // ✅ private var
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, password, companyName, industry, companyLocation } = await req.json()
    console.log('📩 Signup request:', email)

    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    })
    if (signupError) throw signupError

    const user = signupData.user
    if (!user) throw new Error('User not created')

    // ✅ Force confirm
    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { email_confirmed: true } as any
    )
    if (confirmError) throw confirmError
    console.log('✅ Email confirmed for', email)

    // ✅ Upsert (allows duplicate emails during testing)
    const { error: insertError } = await supabase.from('users').upsert([
      {
        id: user.id,
        email,
        company_name: companyName,
        industry,
        location: companyLocation,
        created_at: new Date(),
      },
    ])
    if (insertError) throw insertError
    console.log('✅ User inserted/updated in users table')

    return NextResponse.json({
      success: true,
      message: 'Signup successful & verified instantly!',
      user,
    })
  } catch (error: any) {
    console.error('❌ Signup Error:', error.message)
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}
