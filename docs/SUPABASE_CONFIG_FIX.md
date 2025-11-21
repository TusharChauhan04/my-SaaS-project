# Supabase Configuration Fix

## Issue Identified

The login is failing because your `.env.local` file has `NEXT_PUBLIC_SUPABASE_URL` pointing to a **local Supabase instance** (`http://localhost:54321`) instead of your **cloud Supabase project**.

## How to Fix

1. Open your `.env.local` file
2. Find the line with `NEXT_PUBLIC_SUPABASE_URL`
3. It currently looks like: `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321`
4. Change it to your actual Supabase project URL from the dashboard

### Getting Your Supabase Project URL

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (business-analyzer)
3. Go to **Settings** → **API**
4. Copy the **Project URL** (it should look like: `https://xxxxx.supabase.co`)
5. Copy the **anon/public key**

### Update .env.local

Replace the values in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### After Updating

1. Save the `.env.local` file
2. **Restart the dev server**:
   - Stop the current server (Ctrl+C in the terminal)
   - Run `npm run dev` again
3. Try logging in again

## Why This Happened

The `.env.local` file was configured for local Supabase development instead of the cloud instance. The Supabase client was trying to connect to `localhost:54321` which doesn't exist, causing the CORS error.
