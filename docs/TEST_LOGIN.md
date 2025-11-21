# Login Test Instructions

## Quick Test Method

I've created a standalone test page that you can use to test the login functionality directly.

### Option 1: Use the Test Page (Easiest)

1. Open your browser
2. Go to: **http://localhost:3000/test-login.html**
3. Click "Quick Fill" for Demo User or Admin
4. Click "Sign In"
5. Watch the results appear on the page

The test page will:
- ✅ Show you each step of the authentication process
- ✅ Display any errors clearly
- ✅ Automatically redirect you if login succeeds

### Option 2: Use the Main Login Page

1. Go to: **http://localhost:3000/auth/login**
2. Enter credentials:
   - Demo: `user@demo.com` / `demo123`
   - Admin: `admin@demo.com` / `admin123`
3. Click "Sign In"

## What to Look For

### Success ✅
- You'll see "Signing in..." briefly
- Then redirect to `/dashboard` (demo user) or `/admin` (admin)

### Errors ❌
If you see an error:
1. Take a screenshot
2. Open browser console (F12)
3. Look for red error messages
4. Share the error details

## Common Issues

**"Invalid credentials"**
- Double-check email and password
- Make sure there are no extra spaces

**"Failed to fetch"**
- Check that dev server is running (`npm run dev`)
- Verify you're using http://localhost:3000

**Button stuck on "Signing in..."**
- Open console (F12) to see the actual error
- Check Network tab for failed requests

## Test Results

Please report back:
- ✅ Login worked - redirected to dashboard/admin
- ❌ Login failed - error message: [paste error here]
