import express, { Request, Response } from 'express';

export const helloRoute = express.Router();

helloRoute.get('/', (req: Request, res: Response) => {
  res.send('Hello - Khanh test route ^_^');
});
