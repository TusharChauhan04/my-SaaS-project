-- ============================================
-- FIXED: Add Role Column and Seed Demo Users
-- ============================================
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- Step 1: Add the role column to users table (if it doesn't exist)
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Step 2: Update existing users to have default role
UPDATE users SET role = 'user' WHERE role IS NULL;

-- Step 3: Get the user IDs and update them with proper data
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
    
    RAISE NOTICE '✅ Demo user created/updated successfully';
  ELSE
    RAISE NOTICE '❌ Demo user (user@demo.com) not found in auth.users. Please create it first in Authentication > Users';
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
    
    RAISE NOTICE '✅ Super admin created/updated successfully';
  ELSE
    RAISE NOTICE '❌ Admin user (admin@demo.com) not found in auth.users. Please create it first in Authentication > Users';
  END IF;
END $$;

-- Step 4: Verify the users were created
SELECT id, email, company_name, role, created_at 
FROM users 
WHERE email IN ('user@demo.com', 'admin@demo.com')
ORDER BY role;
