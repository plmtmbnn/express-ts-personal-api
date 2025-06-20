import { Request, Response } from 'express';

export const getHello = (_req: Request, res: Response) => {
  res.json({ message: 'Hello API' });
};

export const postEcho = (req: Request, res: Response) => {
  res.json({ youSent: req.body });
};
