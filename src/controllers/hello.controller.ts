import type { Request, Response } from 'express';
import { http } from '../libs/http/http';

export const getHello = (_req: Request, res: Response) => {
  res.json({ message: 'Hello Backend' });
};

export const postEcho = (req: Request, res: Response) => {
  res.json({ youSent: req.body });
};

export const testCallExternalHttp = async (_req: Request, res: Response) => {
  const httpResponse = await http.get('https://api.genderize.io/?name=luc');
  res.json(httpResponse);
};
