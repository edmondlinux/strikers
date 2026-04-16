import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
	maxRetriesPerRequest: 3,
	retryDelayOnFailover: 100,
	enableReadyCheck: false,
	lazyConnect: true,
	reconnectOnError: (err) => {
		console.log("Redis reconnecting due to error:", err.message);
		return true;
	},
});

redis.on('error', (err) => {
	console.log('Redis connection error:', err.message);
});

redis.on('connect', () => {
	console.log('Redis connected successfully');
});

redis.on('ready', () => {
	console.log('Redis is ready');
});
