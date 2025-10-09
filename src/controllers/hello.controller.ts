import type { Request, Response } from "express";

export const getHello = (_req: Request, res: Response) => {
	res.json({ message: "Hello Backend" });
};

export const postEcho = (req: Request, res: Response) => {
	res.json({ youSent: req.body });
};
