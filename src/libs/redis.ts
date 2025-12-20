import Redis from 'ioredis';
import { ENV_GLOBAL } from '../config';

const redis = new Redis(ENV_GLOBAL.REDIS_ENDPOINT);

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error', err);
});

export default redis;
