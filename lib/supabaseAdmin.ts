import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

console.log("🔑 Service Role Key loaded:", !!serviceRoleKey)

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
