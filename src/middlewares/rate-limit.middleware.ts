import type { NextFunction, Request, Response } from 'express';
import redis from '../config/redis';

export function rateLimit({
  keyPrefix,
  limit,
  windowSec,
}: {
  keyPrefix: string;
  limit: number;
  windowSec: number;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `${keyPrefix}:${req.ip}`;

    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, windowSec);
    }

    if (count > limit) {
      return res.status(429).json({
        message: 'Too many requests',
        traceId: req.traceId,
      });
    }

    next();
  };
}
