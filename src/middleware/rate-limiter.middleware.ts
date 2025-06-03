import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
});

export const apiLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args: string[]) => redis.call(...args)
    }),
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite por IP
});
