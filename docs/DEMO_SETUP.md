# Demo User Setup Instructions

## Quick Start

Follow these steps to create demo users in your Supabase database:

### Step 1: Access Supabase Dashboard

1. Go to [supabase.com](https://supabase.com) and login to your project
2. Navigate to **Authentication** → **Users** in the left sidebar

### Step 2: Create Demo User

Click **"Add User"** and enter:
- **Email**: `user@demo.com`
- **Password**: `demo123`
- **Auto Confirm User**: ✅ **YES** (important!)

Click **"Create User"**

### Step 3: Create Super Admin

Click **"Add User"** again and enter:
- **Email**: `admin@demo.com`
- **Password**: `admin123`
- **Auto Confirm User**: ✅ **YES** (important!)

Click **"Create User"**

### Step 4: Run SQL Script

1. In Supabase Dashboard, go to **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Copy the entire contents of `seed-demo-users.sql`
4. Paste into the SQL editor
5. Click **"Run"** or press `Ctrl+Enter`

### Step 5: Verify

You should see a success message showing:
```
Demo user created/updated successfully
Super admin created/updated successfully
```

And a table showing both users with their roles.

## Demo Credentials

After setup, you can login with:

### Regular User
- **Email**: `user@demo.com`
- **Password**: `demo123`
- **Access**: Dashboard at `/dashboard`

### Super Admin
- **Email**: `admin@demo.com`
- **Password**: `admin123`
- **Access**: Admin panel at `/admin` (can view all users/companies)

## Troubleshooting

**Issue**: "Demo user not found in auth.users"
- **Solution**: Make sure you created the users in Step 2 & 3 with "Auto Confirm User" enabled

**Issue**: "Role column doesn't exist"
- **Solution**: The SQL script will automatically add the role column if it doesn't exist

**Issue**: Login shows "Invalid credentials"
- **Solution**: 
  1. Verify users were created in Authentication > Users
  2. Verify the SQL script ran successfully
  3. Check that "Auto Confirm User" was enabled
  4. Try resetting the password in the Supabase dashboard

## What Changed

The authentication system has been fixed to:
1. ✅ Login API now returns user role for proper routing
2. ✅ Signup flow now redirects to login page after registration
3. ✅ Better error handling and logging
4. ✅ Support for admin and user roles
