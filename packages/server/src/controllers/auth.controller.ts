import { Request, Response } from 'express';
import { DEFAULT_REFRESH_EXPIRES_IN } from '../config/const';
import {
  UserPassIsInvalidException,
} from '../exceptions';
import { UserService } from '../services/user.service';
import {
  RequestWithLoginBody, TokenData,
} from '../types';
import { generateToken, verifyToken } from '../utils/jwt';
import { doPasswordsMatch } from '../utils/password';

export class AuthController {
  constructor(
    private readonly userService: UserService,
  ) { }

  login = async (req: RequestWithLoginBody, res: Response<{ token: TokenData['token'] }>): Promise<void> => {
    const { email, password } = req.body;
    const { id, password: userPass } = await this.userService.getUserByEmail(email);
    const isValid = await doPasswordsMatch(password, userPass);

    if (!isValid) {
      throw new UserPassIsInvalidException();
    }

    const tokenData = generateToken(id);
    const refreshToken = generateToken(id, DEFAULT_REFRESH_EXPIRES_IN);

    res.cookie('Authorization', refreshToken.token, {
      httpOnly: true, path: '/', sameSite: 'strict', maxAge: refreshToken.expiresIn,
    });
    res.send({ token: tokenData.token });
  };

  refresh = (req: Request, res: Response<{ token: TokenData['token'] }>): void => {
    const cookies = req.cookies as Record<string, unknown>;
    const { id } = verifyToken(cookies?.Authorization);
    const { token, expiresIn } = generateToken(id, DEFAULT_REFRESH_EXPIRES_IN);

    res.cookie('Authorization', token, {
      httpOnly: true, path: '/', sameSite: 'strict', maxAge: expiresIn,
    });
    res.send({ token });
  };

  logout = (_req: Request, res: Response): void => {
    res.clearCookie('Authorization');
    res.sendStatus(200);
  };
}
