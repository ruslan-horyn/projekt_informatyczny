import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';

import {
  HttpException,
  NotAuthorizationTokenException,
} from '../exceptions';
import { UserService } from '../services';
import { UserRequest } from '../types';
import { decode } from '../utils';

export const authMiddleware = asyncHandler(async (
  req: UserRequest,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const isBearerToken = authorization?.startsWith('Bearer');
  const token = authorization?.split(' ')[1];

  if (!isBearerToken || !token) {
    throw new NotAuthorizationTokenException();
  }

  try {
    const { id } = decode(token);
    const user = await new UserService()
      .getById(id);
    user.password = '';
    req.user = user;
    next();
  } catch (err) {
    const error = err as Error;
    throw new HttpException(401, error.message);
  }
});
