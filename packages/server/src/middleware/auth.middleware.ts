import { NextFunction, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import {
  HttpException,
  NotAuthorizationTokenException,
} from '../exceptions';
import { UserService } from '../services/user.service';
import { UserRequest } from '../types';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = expressAsyncHandler(async (
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
    const { id } = verifyToken(token);
    const { password, ...user } = await new UserService()
      .getById(id);

    req.user = user;
    next();
  } catch (err) {
    const error = err as Error;
    throw new HttpException(error.message, 401);
  }
});
