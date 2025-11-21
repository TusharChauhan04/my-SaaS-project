import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })
    
    if (authError) {
      console.error('❌ Login error:', authError.message)
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email or password' 
      }, { status: 401 })
    }

    if (!authData.user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Authentication failed' 
      }, { status: 401 })
    }

    // Fetch user role from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role, company_name, industry')
      .eq('id', authData.user.id)
      .single()

    if (userError) {
      console.error('❌ Error fetching user data:', userError.message)
      // User authenticated but not in users table - default to 'user' role
      return NextResponse.json({ 
        success: true, 
        user: authData.user,
        role: 'user'
      })
    }

    const role = userData?.role || 'user'
    
    console.log('✅ Login successful:', email, 'Role:', role)
    
    return NextResponse.json({ 
      success: true, 
      user: authData.user,
      role: role,
      profile: userData
    })
  } catch (error: any) {
    console.error('❌ Login exception:', error.message)
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during login' 
    }, { status: 500 })
  }
}
