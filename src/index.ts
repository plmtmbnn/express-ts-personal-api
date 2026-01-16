import app from './app';
import { ENV_GLOBAL } from './config';
import { checkSupabaseConnection } from './libs/supabase/supabase-health';

const PORT = ENV_GLOBAL.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  checkSupabaseConnection();
});
