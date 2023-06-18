import { Request, Response } from 'express';
import {
  UserPassIsInvalidException,
} from '../exceptions';
import { UserService } from '../services/user.service';
import {
  RequestWithLoginBody, TokenData,
} from '../types';
import { generateRefreshToken, generateToken, verifyRefreshToken } from '../utils/jwt';
import { doPasswordsMatch } from '../utils/password';

export class AuthController {
  constructor(
    private readonly userService: UserService,
  ) {}

  login = async (req: RequestWithLoginBody, res: Response<{ token: TokenData['token'] }>): Promise<void> => {
    const { email, password } = req.body;
    const user = await this.userService.getUserByEmail(email);
    const isValid = await doPasswordsMatch(password, user.password);

    if (!isValid) {
      throw new UserPassIsInvalidException();
    }

    const tokenData = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie('Authorization', refreshToken.token, {
      httpOnly: true, path: '/', sameSite: 'strict', maxAge: refreshToken.expiresIn,
    });
    res.send({ token: tokenData.token });
  };

  refresh = (req: Request, res: Response<{ token: TokenData['token'] }>): void => {
    const cookies = req.cookies as Record<string, unknown>;
    const tokenData = verifyRefreshToken(cookies?.Authorization);
    const newTokenData = generateRefreshToken(tokenData.id);

    res.cookie('Authorization', newTokenData.token, {
      httpOnly: true, path: '/', sameSite: 'strict', maxAge: newTokenData.expiresIn,
    });
    res.send({ token: newTokenData.token });
  };

  logout = (_req: Request, res: Response): void => {
    res.clearCookie('Authorization');
    res.sendStatus(200);
  };
}
