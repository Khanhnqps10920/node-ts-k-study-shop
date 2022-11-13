import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import { verifyToken } from '../helpers/auth.helper';
import { formatJSONResponse } from '../utils';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res
        .status(403)
        .json(
          formatJSONResponse(403, 'You dont have permission to access', {})
        );
    }

    const verified = await verifyToken(accessToken, config.ACCESS_TOKEN_SECRET);

    if (!verified) {
      return res
        .status(403)
        .json(
          formatJSONResponse(403, 'You dont have permission to access', {})
        );
    }

    next();
  } catch (e) {
    console.log('authMiddleware::: ', e);
  }
};
