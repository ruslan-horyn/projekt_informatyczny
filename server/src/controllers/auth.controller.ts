import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { AuthDto } from '../dto';
import {
  EnterRequiredFieldException,
  UserPassIsInvalidException,
} from '../exceptions';
import { validationMiddleware } from '../middleware';
import { UserService } from '../services';
import { Controller, RequestWithLoginBody } from '../types';
import { doPasswordsMatch, generateToken } from '../utils';

export class AuthController implements Controller {
  public readonly path = '/auth';

  public readonly router = Router();

  private userService: UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router
      .post(
        `${this.path}/login`,
        validationMiddleware(AuthDto),
        asyncHandler(this.login),
      )
      .get(`${this.path}/logout`, asyncHandler(this.loggingOut));
  };

  private login = async (req: RequestWithLoginBody, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new EnterRequiredFieldException();
    }

    const user = await this.userService.getUserByEmail(email);
    const isValid = await doPasswordsMatch(password, user.password);

    if (!isValid) {
      throw new UserPassIsInvalidException();
    }

    await user.populate('roles');
    const tokenData = generateToken(user);

    user.password = undefined;
    res.send({ token: tokenData.token, user });
  };

  private loggingOut = (_req: Request, res: Response) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.send(200);
  };
}
