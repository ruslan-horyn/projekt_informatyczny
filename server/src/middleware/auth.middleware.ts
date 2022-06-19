import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  NotAuthorisationTokenException,
  HttpException,
} from '../exceptions';

import { RequestWithUserI } from '../types';
import { UserService } from '../services';
import { decode } from '../utils';

export const authMiddleware = asyncHandler(async (
  req: RequestWithUserI,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const isBearerToken = authorization?.startsWith('Bearer');
  const token = authorization?.split(' ')[1];

  if (!isBearerToken || !token) {
    throw new NotAuthorisationTokenException();
  }
  
  try {
    const { id } = decode(token);
    const user = await new UserService()
      .getUserById(id);
    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    const error = err as Error;
    throw new HttpException(401, error.message);
  }
});
