import { Request } from 'express';
import { UserI } from './user.type';

export interface RequestWithUser extends Request {
  user?: UserI;
}

export interface RequestWithLoginBody extends Request {
  body: {
    email: string,
    password: string
  };
}
