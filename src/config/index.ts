import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3000'),
  JWT_SECRET: z.string().min(32).max(100),
  REDIS_ENDPOINT: z.string(),
  TRADE_API_BASE_URL: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsedEnv.error.format());
  process.exit(1);
} else {
  console.error('✅ Valid environment variables');
}

export const ENV_GLOBAL = {
  ...parsedEnv.data,
};
