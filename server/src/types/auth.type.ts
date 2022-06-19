import { Request } from 'express';
import { UserI } from './user.type';

export interface RequestWithUserI extends Request {
  user?: UserI;
}

export interface RequestWithLoginBodyI extends Request {
  body: {
    email: string,
    password: string
  };
}
