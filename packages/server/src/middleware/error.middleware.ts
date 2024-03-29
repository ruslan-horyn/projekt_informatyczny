import { NextFunction, Request, Response } from 'express';
import { config } from '../config/configEnv';

import { HttpException } from '../exceptions';
import { loggerMiddleware } from './logger.middleware';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nodeEnv } = config;
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const stack = nodeEnv !== 'production' ? error.stack : null;
  res.status(status)
    .send({
      status,
      message,
      stack,
    });
  loggerMiddleware(req, res, next);
  next(stack);
};
