import { sign, verify } from 'jsonwebtoken';
import { DataStoredInToken, TokenData } from '../types/jwt.type';

export const generateToken = (user): TokenData => {
  // @ts-ignore
  const secret: string = process.env.JWT_SECRET;
  const expiresIn = 60 * 60;
  const token = sign({ id: user._id }, secret, { expiresIn: '1d' });
  return { token, expiresIn };
};

export const decode = (token: string): DataStoredInToken => {
  // @ts-ignore
  const secret: string = process.env.JWT_SECRET;
  return verify(token, secret) as DataStoredInToken;
};
