import { Request, Response } from 'express';

export function health(req: Request, res: Response): void {
  res.json({ status: 'Node API is running ok' });
}
