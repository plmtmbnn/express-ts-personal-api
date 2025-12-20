import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';

export function traceIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const traceId = (req.headers['x-trace-id'] as string) || randomUUID();

  req.traceId = traceId;
  res.setHeader('x-trace-id', traceId);

  next();
}
