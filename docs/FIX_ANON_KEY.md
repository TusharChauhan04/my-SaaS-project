# Quick Fix: Update Supabase Anon Key

## What Happened

The `.env.local` file was updated with the correct Supabase URL, but the anon key was truncated from the screenshot, causing an "Invalid API key" error during login.

## How to Fix (2 minutes)

### Step 1: Copy the Correct Anon Key

1. You have the Supabase dashboard open at: https://supabase.com/dashboard/project/dadoixwtqjhglapoxgvg/settings/api
2. Scroll down to the **"Project API keys"** section
3. Find the **"anon public"** key (it's a long JWT token)
4. Click the **"Copy"** button next to it

### Step 2: Update .env.local

1. The `.env.local` file is already open in your VS Code editor
2. Find the line that starts with: `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
3. Replace the entire value after the `=` with the key you just copied
4. The line should look like:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZG9peHd0cWpoZ2xhcG94Z3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5OTQ4MjMsImV4cCI6MjA0NzU3MDgyM30.CORRECT_SIGNATURE_HERE
   ```
5. **Save the file** (Ctrl+S)

### Step 3: Let Me Know

Once you've updated and saved the file, let me know and I'll:
1. Restart the dev server
2. Test the login with both demo user and admin
3. Verify everything works

## Why This Is Needed

The anon key is a JWT token that authenticates requests to your Supabase project. The key I copied from the screenshot was incomplete, so Supabase rejected it as invalid.
