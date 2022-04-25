import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  NotAuthorisationTokenException,
  NotAuthorizedException,
} from '../exceptions/Auth.exceptions';
import HttpException from '../exceptions/HttpException';
import { RequestWithUser } from '../types/auth.type';
import UserService from '../services/user.service';
import { decode } from '../utils/jwt';

const authMiddleware = asyncHandler(async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const isBearerToken = authorization?.startsWith('Bearer');
  if (!isBearerToken) {
    throw new NotAuthorizedException();
  }
  
  let token;
  try {
    token = authorization?.split(' ')[1];
    const { id } = decode(token);
    const user = await new UserService().getUserById(id);
    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    const error = err as Error;
    throw new HttpException(401, error.message);
  }
  
  if (!token) {
    throw new NotAuthorisationTokenException();
  }
});

export default authMiddleware;
