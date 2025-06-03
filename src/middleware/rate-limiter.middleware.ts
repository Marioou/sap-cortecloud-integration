import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import logger from '../utils/logger.util';

const REDIS_CONFIG = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times: number) => {
        if (times > 3) {
            logger.error('Redis connection failed multiple times');
            return null;
        }
        return Math.min(times * 100, 3000);
    }
};

let redis: Redis;

try {
    redis = new Redis(REDIS_CONFIG);
    
    redis.on('error', (error) => {
        logger.error('Redis error:', error);
    });

    redis.on('connect', () => {
        logger.info('Redis connected successfully');
    });
} catch (error) {
    logger.error('Failed to initialize Redis:', error);
    throw error;
}

export const apiLimiter = rateLimit({
    store: new RedisStore({
        // @ts-ignore - Known issue with types
        sendCommand: async (...args: unknown[]): Promise<unknown> => {
            try {
                const [command, ...params] = args as string[];
                return await redis.call(command, ...params);
            } catch (error) {
                logger.error('Redis command error:', error);
                throw error;
            }
        },
        prefix: 'rate-limit:'
    }) as any,
    windowMs: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
    message: {
        error: 'Too many requests, please try again later.',
        retryAfter: 'Rate limit will reset in ${retryAfter} seconds'
    },
    standardHeaders: true,
    legacyHeaders: false
});
