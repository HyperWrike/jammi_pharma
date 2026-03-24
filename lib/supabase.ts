import { createClient, SupabaseClient } from '@supabase/supabase-js'

// These are required for the client to initialize.
// If missing during build, we use placeholders to avoid crashing 'npm run build'.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Public client — used in browser components (anon key, respects RLS)
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  { auth: { persistSession: true, autoRefreshToken: true } }
)

// Admin client — used in API routes only (service role key, bypasses RLS)
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceKey,
  { auth: { persistSession: false, autoRefreshToken: false } }
)
