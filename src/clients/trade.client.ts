import redis from '@/libs/redis';
import { supabaseAdmin } from '@/libs/supabase/supabase';
import { http } from '../libs/http/http';

const REDIS_TTL_SECONDS = 60 * 5; // 5 minutes
const REDIS_KEY = 'app_token:esbe';

export const fetchDataFromHeaven = async (
  baseUrl: string,
  endpoint: string,
  query: any,
  maxRetries: number = 3,
  retryCount: number = 0
): Promise<any> => {
  try {
    const esbeTokenBearer: string = await retrieveToken();
    const OrderTradeResponse: any = await http.get(`${baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${esbeTokenBearer}`,
      },
      query: query as any,
    });

    return OrderTradeResponse;
  } catch (error: any) {
    const is502: boolean =
      error?.response?.status === 502 ||
      error?.statusCode === 502 ||
      error?.message?.includes('502');

    const is401: boolean = String(error?.message).includes('Unauthorized');

    if (is401) {
      await redis.del(REDIS_KEY);
    }

    if (is502 && retryCount < maxRetries) {
      const delay = 1000 * (retryCount + 1); // Exponential backoff

      console.warn(
        `502 Error - Retrying (${retryCount + 1}/${maxRetries}) after ${delay}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchDataFromHeaven(
        baseUrl,
        endpoint,
        query,
        maxRetries,
        retryCount + 1
      );
    }

    if (is502 && retryCount >= maxRetries) {
      throw new Error(`Failed after ${maxRetries} retries: Bad Gateway (502)`);
    }

    console.error('API Error:', error);
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        'Unknown error occurred'
    );
  }
};

export const retrieveToken = async (): Promise<string> => {
  // 1️⃣ Try Redis first
  try {
    const cachedToken = await redis.get(REDIS_KEY);

    if (cachedToken) {
      return cachedToken;
    }
  } catch (err) {
    console.warn('[TOKEN] Redis read failed, fallback to Supabase', err);
  }

  // 2️⃣ Fetch from Supabase (source of truth)
  const { data, error } = await supabaseAdmin
    .from('app_tokens')
    .select('token')
    .eq('is_active', true)
    .eq('name', 'esbe')
    .single();

  if (error) {
    console.error('[TOKEN] Supabase query failed', error);
    throw new Error('Failed to retrieve token from Supabase');
  }

  if (!data?.token) {
    console.error('[TOKEN] Token not found or inactive');
    throw new Error('Token not available');
  }

  const token = data.token;

  // 3️⃣ Cache in Redis (best-effort)
  try {
    await redis.set(REDIS_KEY, token, 'EX', REDIS_TTL_SECONDS);
  } catch (err) {
    console.warn('[TOKEN] Redis write failed', err);
  }

  return token;
};
