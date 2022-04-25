import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import loggerMiddleware from './logger.middleware';

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const stack = process.env.NODE_ENV !== 'production' ? error.stack : null;
  res.status(status)
    .send({
      status,
      message,
      stack,
    });
  loggerMiddleware(req, res, next);
  next(stack);
};

export default errorMiddleware;
