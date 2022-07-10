import { Request } from 'express';

import { User } from './user.type';

export interface RequestWithUser extends Request {
  user?: User;
}

export interface RequestWithLoginBody extends Request {
  body: {
    email: string,
    password: string
  };
}
