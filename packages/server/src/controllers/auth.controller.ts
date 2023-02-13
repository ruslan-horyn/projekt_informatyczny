import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { LoginDto } from '../dto';
import {
  UserPassIsInvalidException,
} from '../exceptions';
import { validationMiddleware } from '../middleware';
import { UserService } from '../services';
import {
  Controller, RequestWithLoginBody, TokenData,
} from '../types';
import { doPasswordsMatch, generateToken } from '../utils';

export class AuthController implements Controller {
  readonly path = '/auth';

  readonly router = Router();

  private userService: UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .post(
        `${this.path}/login`,
        validationMiddleware(LoginDto),
        asyncHandler(this.login),
      )
      .post(`${this.path}/logout`, asyncHandler(this.logout));
  };

  private login = async (
    req: RequestWithLoginBody,
    res: Response<{ token: TokenData['token'] }>,
  ) => {
    const { email, password } = req.body;

    const user = await this.userService.getUserByEmail(email);
    const isValid = await doPasswordsMatch(password, user.password);

    if (!isValid) {
      throw new UserPassIsInvalidException();
    }

    const tokenData = generateToken(user.id);

    res.cookie('Authorization', tokenData.token, {
      httpOnly: true, path: '/', sameSite: 'strict', maxAge: tokenData.expiresIn,
    });
    res.send({ token: tokenData.token });
  };

  private logout = (_req: Request, res: Response) => {
    res.clearCookie('Authorization');
    res.sendStatus(200);
  };
}
