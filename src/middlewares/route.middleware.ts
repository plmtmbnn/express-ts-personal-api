import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV_GLOBAL } from '../config';

const JWT_SECRET = ENV_GLOBAL.JWT_SECRET as string;

function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header missing',
      traceId: req.traceId,
    });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Invalid authorization format',
      traceId: req.traceId,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Invalid or expired token',
      traceId: req.traceId,
    });
  }
}

function optionalJwtMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next();
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    // ignore invalid token
  }

  next();
}

export const RouteMiddleware = {
  jwtAuthMiddleware,
  optionalJwtMiddleware,
};
