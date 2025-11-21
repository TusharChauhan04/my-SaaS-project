-- ============================================
-- Seed Demo Users for BusinessZen SaaS
-- ============================================
-- Run this script in your Supabase SQL Editor
-- This will create:
-- 1. Demo User (user@demo.com / demo123)
-- 2. Super Admin (admin@demo.com / admin123)
-- ============================================

-- First, ensure the users table has a role column
-- If it doesn't exist, this will add it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'role'
  ) THEN
    ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
  END IF;
END $$;

-- Create demo user in auth.users
-- Note: You'll need to replace 'YOUR_ENCRYPTED_PASSWORD' with actual encrypted passwords
-- Supabase uses bcrypt for password hashing

-- Method 1: Using Supabase Dashboard (RECOMMENDED)
-- Instead of running SQL for auth.users, go to:
-- Authentication > Users > Add User
-- And manually create:
-- 1. user@demo.com with password: demo123
-- 2. admin@demo.com with password: admin123
-- Then come back and run the rest of this script

-- After creating users in the dashboard, get their UUIDs and insert into users table
-- You can find the UUIDs in Authentication > Users

-- ============================================
-- INSTRUCTIONS:
-- ============================================
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" and create:
--    - Email: user@demo.com
--    - Password: demo123
--    - Auto Confirm User: YES
-- 3. Click "Add User" again and create:
--    - Email: admin@demo.com  
--    - Password: admin123
--    - Auto Confirm User: YES
-- 4. Copy the UUID of user@demo.com (it will look like: 12345678-1234-1234-1234-123456789abc)
-- 5. Copy the UUID of admin@demo.com
-- 6. Replace the UUIDs below and run the rest of this script
-- ============================================

-- REPLACE THESE UUIDs WITH THE ACTUAL UUIDs FROM YOUR SUPABASE DASHBOARD
-- After creating users in the dashboard, update these variables:

DO $$
DECLARE
  demo_user_id UUID;
  admin_user_id UUID;
BEGIN
  -- Get the user IDs from auth.users table
  SELECT id INTO demo_user_id FROM auth.users WHERE email = 'user@demo.com' LIMIT 1;
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@demo.com' LIMIT 1;

  -- Only proceed if users exist in auth.users
  IF demo_user_id IS NOT NULL THEN
    -- Insert/Update demo user in users table
    INSERT INTO users (id, email, company_name, industry, location, role, created_at)
    VALUES (
      demo_user_id,
      'user@demo.com',
      'Demo Company',
      'Technology',
      'San Francisco, CA',
      'user',
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET
      email = EXCLUDED.email,
      company_name = EXCLUDED.company_name,
      industry = EXCLUDED.industry,
      location = EXCLUDED.location,
      role = EXCLUDED.role;
    
    RAISE NOTICE 'Demo user created/updated successfully';
  ELSE
    RAISE NOTICE 'Demo user not found in auth.users. Please create user@demo.com in Authentication > Users first';
  END IF;

  IF admin_user_id IS NOT NULL THEN
    -- Insert/Update super admin in users table
    INSERT INTO users (id, email, company_name, industry, location, role, created_at)
    VALUES (
      admin_user_id,
      'admin@demo.com',
      'BusinessZen Admin',
      'SaaS Platform',
      'Global',
      'admin',
      NOW()
    )
    ON CONFLICT (id)
    DO UPDATE SET
      email = EXCLUDED.email,
      company_name = EXCLUDED.company_name,
      industry = EXCLUDED.industry,
      location = EXCLUDED.location,
      role = EXCLUDED.role;
    
    RAISE NOTICE 'Super admin created/updated successfully';
  ELSE
    RAISE NOTICE 'Admin user not found in auth.users. Please create admin@demo.com in Authentication > Users first';
  END IF;
END $$;

-- Verify the users were created
SELECT id, email, company_name, role, created_at 
FROM users 
WHERE email IN ('user@demo.com', 'admin@demo.com')
ORDER BY role;

-- ============================================
-- SUMMARY
-- ============================================
-- After running this script, you should have:
-- 
-- Demo User:
--   Email: user@demo.com
--   Password: demo123
--   Role: user
--   Access: /dashboard
--
-- Super Admin:
--   Email: admin@demo.com
--   Password: admin123
--   Role: admin
--   Access: /admin (can view all users/companies)
-- ============================================
