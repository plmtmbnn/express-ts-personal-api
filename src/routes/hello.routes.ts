import { Router } from 'express';
import {
  getHello,
  postEcho,
  testCallExternalHttp,
} from '../controllers/hello.controller';
import { rateLimit } from '../middlewares/rate-limit.middleware';
import { RouteMiddleware } from '../middlewares/route.middleware';

export const helloRouter = Router();

helloRouter.get('/', getHello);
helloRouter.get('/testing', testCallExternalHttp);
helloRouter.get(
  '/echo',
  rateLimit({
    keyPrefix: '/hello/echo',
    limit: 5,
    windowSec: 60,
  }),
  RouteMiddleware.jwtAuthMiddleware,
  getHello
);
helloRouter.post('/echo', RouteMiddleware.jwtAuthMiddleware, postEcho);
