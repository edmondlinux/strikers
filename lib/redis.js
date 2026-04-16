import Redis from 'ioredis';

let redis = null;

const getRedis = () => {
  if (redis) return redis;

  try {
    redis = new Redis(process.env.UPSTASH_REDIS_URL || '');
    redis.on('error', (err) => {
      console.log('Redis error:', err.message);
    });
  } catch (e) {
    console.log('Redis initialization error:', e.message);
  }

  return redis;
};

export { getRedis as redis };
