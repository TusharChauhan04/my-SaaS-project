// Test script to verify Supabase authentication
// Run with: node test-auth.js

const SUPABASE_URL = 'https://dadoixwtqjhglapoxgvg.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZG9peHd0cWpoZ2xhcG94Z3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDgwMDAsImV4cCI6MjA3NzkyNDAwMH0.CfTvyMuBvIEqUZjW07wnum389tPQMFrsnaBW3xMtzxk';

async function testLogin() {
    console.log('Testing Supabase authentication...\n');

    // Test 1: Verify Supabase URL is accessible
    console.log('1. Testing Supabase URL connection...');
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/health`);
        console.log(`   ✅ Supabase is accessible: ${response.status}`);
    } catch (error) {
        console.log(`   ❌ Cannot connect to Supabase: ${error.message}`);
        return;
    }

    // Test 2: Try to authenticate with demo user
    console.log('\n2. Testing demo user authentication...');
    try {
        const authResponse = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': ANON_KEY
            },
            body: JSON.stringify({
                email: 'user@demo.com',
                password: 'demo123'
            })
        });

        const authData = await authResponse.json();

        if (authResponse.ok && authData.access_token) {
            console.log('   ✅ Demo user authentication successful!');
            console.log(`   User ID: ${authData.user.id}`);
            console.log(`   Email: ${authData.user.email}`);

            // Test 3: Fetch user role
            console.log('\n3. Testing user role fetch...');
            const roleResponse = await fetch('http://localhost:3000/api/auth/user-role', {
                headers: {
                    'Authorization': `Bearer ${authData.access_token}`
                }
            });

            if (roleResponse.ok) {
                const roleData = await roleResponse.json();
                console.log(`   ✅ User role fetched: ${roleData.role}`);
                console.log(`\n🎉 All tests passed! Login should work.`);
            } else {
                const error = await roleResponse.json();
                console.log(`   ❌ Failed to fetch role: ${JSON.stringify(error)}`);
            }
        } else {
            console.log(`   ❌ Authentication failed: ${JSON.stringify(authData)}`);
        }
    } catch (error) {
        console.log(`   ❌ Error during authentication: ${error.message}`);
    }

    // Test 4: Try admin user
    console.log('\n4. Testing admin user authentication...');
    try {
        const authResponse = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': ANON_KEY
            },
            body: JSON.stringify({
                email: 'admin@demo.com',
                password: 'admin123'
            })
        });

        const authData = await authResponse.json();

        if (authResponse.ok && authData.access_token) {
            console.log('   ✅ Admin authentication successful!');
            console.log(`   User ID: ${authData.user.id}`);

            const roleResponse = await fetch('http://localhost:3000/api/auth/user-role', {
                headers: {
                    'Authorization': `Bearer ${authData.access_token}`
                }
            });

            if (roleResponse.ok) {
                const roleData = await roleResponse.json();
                console.log(`   ✅ Admin role fetched: ${roleData.role}`);
            }
        } else {
            console.log(`   ❌ Admin authentication failed: ${JSON.stringify(authData)}`);
        }
    } catch (error) {
        console.log(`   ❌ Error during admin authentication: ${error.message}`);
    }
}

testLogin();
