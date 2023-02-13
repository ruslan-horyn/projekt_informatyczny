import { Request } from 'express';
import { User } from './user.type';

export type IdType = {
  id: string;
}

export type UserRequest<
  TParams = unknown,
  TReqBody = unknown
> = Request<TParams, unknown, TReqBody> & {
  user?: User;
}
