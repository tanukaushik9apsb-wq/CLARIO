const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key && !key.startsWith('#')) {
      env[key] = val;
    }
  }
});

console.log('--- Clario Supabase Diagnostic ---');
console.log('URL:', env.VITE_SUPABASE_URL);
console.log('Anon Key Present:', Boolean(env.VITE_SUPABASE_ANON_KEY));
console.log('Anon Key Length:', env.VITE_SUPABASE_ANON_KEY ? env.VITE_SUPABASE_ANON_KEY.length : 0);

const client = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function runTest() {
  try {
    const { data: authData, error: authErr } = await client.auth.getSession();
    if (authErr) {
      console.log('❌ Auth API: Failed ->', authErr.message);
    } else {
      console.log('✅ Auth API: Connected & Healthy');
    }

    const { data: colData, error: colErr } = await client.from('colleges').select('id, short_name').limit(2);
    if (colErr) {
      console.log('⚠️ Database Tables: Tables not found in schema cache yet');
      console.log('   Reason:', colErr.message);
      console.log('   Action: Paste and run supabase/setup_and_seed.sql in the Supabase SQL Editor.');
    } else {
      console.log('✅ Database Tables: Connected! Colleges count:', colData ? colData.length : 0);
    }
  } catch (err) {
    console.error('Test error:', err.message);
  }
}

runTest();

