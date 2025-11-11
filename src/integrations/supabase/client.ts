import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL) throw new Error('Missing VITE_SUPABASE_URL environment variable');
if (!SUPABASE_PUBLISHABLE_KEY) throw new Error('Missing VITE_SUPABASE_PUBLISHABLE_KEY environment variable');

// Ensure Supabase URL uses HTTPS (Supabase URLs should always be HTTPS)
if (SUPABASE_URL.startsWith('http://')) {
  console.warn('Supabase URL uses HTTP, this may cause issues. Supabase URLs should use HTTPS.');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true
  }
});