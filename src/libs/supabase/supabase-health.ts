import { supabaseAdmin } from './supabase';

export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('app_tokens')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Supabase connected but query failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connected successfully');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection error:', err);
    return false;
  }
}
