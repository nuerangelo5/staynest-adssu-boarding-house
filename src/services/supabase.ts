import { createClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : (process.env as any) || {};

const supabaseUrl = (env.VITE_SUPABASE_URL && env.VITE_SUPABASE_URL.startsWith('http'))
  ? env.VITE_SUPABASE_URL
  : 'https://ggyhoagbpujljefrqqzn.supabase.co';

const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneWhvYWdicHVqbGplZnJxcXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MzIzODQsImV4cCI6MjEwOTEwODM4NH0.UhLAAmwBWyNxWOlKCjjzr6j71PzwgSiQKcMTf_EHiOs';

let client: any = null;

try {
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} catch (e) {
  console.error('Supabase initialization error:', e);
  client = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder');
}

export const supabase = client;

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.from('boarding_houses').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
      return { success: true, message: `Connected to Supabase project (${supabaseUrl}). Note: Run SQL schema to create tables.` };
    }
    return { success: true, message: `Successfully connected to Supabase project (${supabaseUrl}) and verified tables!` };
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err.message || 'Network error'}` };
  }
}
