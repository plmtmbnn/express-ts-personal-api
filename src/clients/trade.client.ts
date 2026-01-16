import { ENV_GLOBAL } from '../config';
import { http } from '../libs/http/http';

export const fetchDataFromHeaven = async (
  baseUrl: string,
  endpoint: string,
  query: any,
  maxRetries: number = 3,
  retryCount: number = 0
): Promise<any> => {
  try {
    const OrderTradeResponse: any = await http.get(`${baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${ENV_GLOBAL.TRADE_API_TOKEN}`,
      },
      query: query as any,
    });

    return OrderTradeResponse;
  } catch (error: any) {
    const is502 =
      error?.response?.status === 502 ||
      error?.statusCode === 502 ||
      error?.message?.includes('502');

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
