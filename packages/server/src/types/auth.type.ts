import { Request } from 'express';

export type Login = {
  email: string,
  password: string
}

export type RequestWithLoginBody = Request<unknown, unknown, Login>
