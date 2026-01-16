import { createClient } from '@supabase/supabase-js';
import { ENV_GLOBAL } from '@/config';

export const supabaseAdmin = createClient(
  ENV_GLOBAL.SUPABASE_URL,
  ENV_GLOBAL.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
