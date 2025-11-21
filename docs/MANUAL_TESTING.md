# Manual Testing Instructions

## Current Status

✅ **All authentication code is complete and ready to test**

The dev server is running successfully at http://localhost:3000 (confirmed by server logs), but browser automation tools are experiencing connection timeouts. Manual testing is required.

## Quick Test Steps

### Test 1: Demo User Login

1. Open your browser (Chrome, Firefox, etc.)
2. Go to: **http://localhost:3000/auth/login**
3. Enter credentials:
   - **Email**: `user@demo.com`
   - **Password**: `demo123`
4. Click **"Sign In"**
5. **Expected Result**: Redirect to `/dashboard`

**If it works**: ✅ Demo user authentication successful!

**If you see an error**:
- Take a screenshot of the error message
- Open browser console (F12) and check for errors
- Share the error details

### Test 2: Admin Login

1. Go to: **http://localhost:3000/auth/login**
2. Enter credentials:
   - **Email**: `admin@demo.com`
   - **Password**: `admin123`
3. Click **"Sign In"**
4. **Expected Result**: Redirect to `/admin`

**If it works**: ✅ Admin authentication successful!

**If you see an error**:
- Take a screenshot of the error message
- Open browser console (F12) and check for errors
- Share the error details

## Common Issues & Solutions

### Issue: "Invalid API key"
**Cause**: Anon key in `.env.local` is incorrect  
**Solution**: Already fixed - anon key has been updated

### Issue: "Failed to fetch"
**Cause**: API route not found or service role key missing  
**Solution**: Already fixed - `/api/auth/user-role` route created

### Issue: Login button stuck on "Signing in..."
**Possible causes**:
1. Network error - check browser console
2. API route error - check server terminal logs
3. Supabase connection issue - verify `.env.local` values

**To debug**:
1. Open browser console (F12)
2. Look for red error messages
3. Check the Network tab for failed requests
4. Share the error details

## What to Report

If testing fails, please provide:

1. **Screenshot** of the error message on the page
2. **Console errors** (F12 → Console tab)
3. **Network errors** (F12 → Network tab, look for red/failed requests)
4. **Server logs** from the terminal running `npm run dev`

## Files to Check if Issues Occur

### Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://dadoixwtqjhglapoxgvg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (should be the full key you copied)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (from Supabase dashboard)
```

### Server Logs
Look for errors in the terminal running `npm run dev`:
- Compilation errors
- API route errors
- Supabase connection errors

## Next Steps After Successful Login

Once login works:

1. ✅ Verify dashboard loads correctly
2. ✅ Verify admin panel loads correctly
3. ✅ Test logout functionality
4. ✅ Test signup flow
5. ✅ Verify role-based access control

## Technical Details

### Authentication Flow
1. User enters credentials on `/auth/login`
2. Supabase client authenticates with `signInWithPassword()`
3. Session token is generated and stored in cookies
4. Frontend calls `/api/auth/user-role` with session token
5. Backend uses service role key to fetch user role from database
6. User is redirected based on role (user → dashboard, admin → admin panel)

### Why This Approach?
- **Client-side auth**: Supabase handles authentication and session management
- **Server-side role fetch**: Bypasses Row Level Security (RLS) policies using service role key
- **Secure**: Session tokens are validated on the server before fetching user data
